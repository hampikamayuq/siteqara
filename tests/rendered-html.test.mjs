import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("ships an accessible mobile menu without disabling browser zoom", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("mobile-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();
  assert.match(html, /aria-label="Abrir menu de navegação"/);
  assert.match(html, /aria-label="Navegação móvel"/);
  assert.doesNotMatch(html, /user-scalable\s*=\s*no|maximum-scale\s*=\s*1/i);

  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /@media \(pointer: coarse\)/);
});

test("ships progressive, accessible motion enhancement", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("motion-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const controller = await readFile(new URL("../app/motion-controller.tsx", import.meta.url), "utf8");

  assert.match(html, /data-motion-root/);
  assert.match(css, /\.motion-ready/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /--hero-shift:\s*0px/);
  assert.match(controller, /IntersectionObserver/);
  assert.match(controller, /requestAnimationFrame/);
});
