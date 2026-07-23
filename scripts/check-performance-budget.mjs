import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { brotliCompress } from "node:zlib";
import { promisify } from "node:util";

const compressBrotli = promisify(brotliCompress);
const clientDirectory = new URL("../dist/client/", import.meta.url);

function findAssetPaths(html, route) {
  const assetPaths = new Set();
  const baseUrl = new URL(route, "http://localhost");
  const attributePattern = /\b(?:src|href)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s"'=<>`]+))/gi;

  for (const match of html.matchAll(attributePattern)) {
    const url = new URL(match[1] ?? match[2] ?? match[3], baseUrl);
    if (
      url.origin === baseUrl.origin &&
      /^\/assets\/.+\.(?:css|js)$/.test(url.pathname)
    ) {
      assetPaths.add(url.pathname);
    }
  }

  return assetPaths;
}

export async function measureRouteBudget(worker, route) {
  const response = await worker.fetch(
    new Request(new URL(route, "http://localhost"), {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!response.ok) {
    throw new Error(`Unable to measure ${route}: received HTTP ${response.status}`);
  }

  const html = await response.text();
  const assets = [];
  let javascriptBrotli = 0;
  let cssBrotli = 0;

  for (const assetPath of findAssetPaths(html, route)) {
    const contents = await readFile(new URL(`.${assetPath}`, clientDirectory));
    const brotli = (await compressBrotli(contents)).byteLength;
    const type = assetPath.endsWith(".js") ? "javascript" : "css";

    assets.push({ path: assetPath, type, brotli });
    if (type === "javascript") javascriptBrotli += brotli;
    else cssBrotli += brotli;
  }

  if (!assets.some(asset => asset.type === "javascript")) {
    throw new Error(`${route} did not discover JavaScript assets`);
  }
  if (!assets.some(asset => asset.type === "css")) {
    throw new Error(`${route} did not discover CSS assets`);
  }

  return {
    route,
    javascriptBrotli,
    cssBrotli,
    htmlBrotli: (await compressBrotli(Buffer.from(html))).byteLength,
    assets,
  };
}

function kibibytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

export function assertRouteBudget(metrics, { javascriptBrotli, cssBrotli }) {
  for (const [name, observed, limit] of [
    ["JavaScript", metrics.javascriptBrotli, javascriptBrotli],
    ["CSS", metrics.cssBrotli, cssBrotli],
  ]) {
    if (observed > limit) {
      throw new Error(
        `${metrics.route} exceeds ${name} Brotli budget: observed ${kibibytes(observed)}; limit ${kibibytes(limit)}`,
      );
    }
  }
}

async function main() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("performance-budget", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const budget = { javascriptBrotli: 85 * 1024, cssBrotli: 15 * 1024 };

  for (const route of ["/", "/blog"]) {
    const metrics = await measureRouteBudget(worker, route);
    assertRouteBudget(metrics, budget);
    console.log(
      `${route}: JavaScript ${kibibytes(metrics.javascriptBrotli)}, CSS ${kibibytes(metrics.cssBrotli)}`,
    );
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
