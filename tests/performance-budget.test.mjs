import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

import {
  assertRouteBudget,
  measureRouteBudget,
} from "../scripts/check-performance-budget.mjs";

const budget = {
  javascriptBrotli: 85 * 1024,
  cssBrotli: 15 * 1024,
};

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("performance-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function builtAssetNames() {
  const assets = await readdir(new URL("../dist/client/assets/", import.meta.url));
  return {
    css: assets.find(asset => asset.endsWith(".css")),
    javascript: assets.find(asset => asset.endsWith(".js")),
  };
}

for (const route of ["/", "/blog"]) {
  test(`keeps ${route} within the Brotli asset budget`, async () => {
    const metrics = await measureRouteBudget(await loadWorker(), route);

    assert.equal(metrics.route, route);
    assert.ok(metrics.assets.some(asset => asset.type === "javascript"));
    assert.ok(metrics.assets.some(asset => asset.type === "css"));
    assert.ok(metrics.javascriptBrotli > 0);
    assert.ok(metrics.cssBrotli > 0);
    assertRouteBudget(metrics, budget);
  });
}

test("measures unquoted same-origin asset attributes", async () => {
  const { css, javascript } = await builtAssetNames();
  assert.ok(css);
  assert.ok(javascript);

  const worker = {
    fetch: async () => new Response(
      `<link rel=stylesheet href=/assets/${css}><script src=/assets/${javascript}></script>`,
    ),
  };
  const metrics = await measureRouteBudget(worker, "/unquoted-assets");

  assert.equal(metrics.assets.length, 2);
  assert.ok(metrics.javascriptBrotli > 0);
  assert.ok(metrics.cssBrotli > 0);
});

test("rejects a route that does not discover both asset types", async () => {
  const { javascript } = await builtAssetNames();
  assert.ok(javascript);

  await assert.rejects(
    measureRouteBudget(
      { fetch: async () => new Response(`<script src=/assets/${javascript}></script>`) },
      "/missing-css",
    ),
    /did not discover CSS assets/,
  );
});

test("does not retain Tailwind imports or dependencies", async () => {
  const [css, packageJson] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(css, /@import\s+["']tailwindcss["']/);
  assert.doesNotMatch(packageJson, /["'](?:@tailwindcss\/postcss|tailwindcss)["']\s*:/);
});

test("keeps the minimal browser reset that the design depends on", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /\*,\s*::before,\s*::after\s*\{[^}]*box-sizing:\s*border-box/s);
  assert.match(css, /body,\s*h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6,\s*p,\s*figure,\s*blockquote,\s*dl,\s*dd\s*\{[^}]*margin:\s*0/s);
  assert.match(css, /ul,\s*ol,\s*menu\s*\{[^}]*list-style:\s*none[^}]*margin:\s*0[^}]*padding:\s*0/s);
  assert.match(css, /img,\s*svg,\s*video,\s*canvas,\s*audio,\s*iframe,\s*embed,\s*object\s*\{[^}]*display:\s*block[^}]*vertical-align:\s*middle/s);
  assert.match(css, /img,\s*video\s*\{[^}]*height:\s*auto[^}]*max-width:\s*100%/s);
  assert.match(css, /button,\s*input,\s*optgroup,\s*select,\s*textarea\s*\{[^}]*background-color:\s*transparent[^}]*border:\s*0 solid[^}]*color:\s*inherit[^}]*font:\s*inherit[^}]*letter-spacing:\s*inherit/s);
});
