import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("renders local SEO schema and social cards on the homepage", async () => {
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
  const html = await response.text();
  assert.doesNotMatch(html, /codex-preview/);
  assert.match(html, /"aggregateRating":\{"@type":"AggregateRating","ratingValue":"5.0","reviewCount":141\}/);
  assert.match(html, /"geo":\{"@type":"GeoCoordinates"/);
  assert.match(html, /"postalCode":"22041-012"/);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"\/>/);
  assert.match(html, /roboto-400-latin\.woff2/);
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

test("ships the responsive premium consultation hero", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("hero-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();

  assert.match(html, /qara-hero-consulta\.webp/);
  assert.match(html, /qara-hero-consulta-640\.webp 640w/);
  assert.match(html, /qara-hero-consulta-1024\.webp 1024w/);
  assert.match(html, /fetchpriority="high"/i);
  assert.match(html, /sizes="100vw"/);
  assert.match(html, /class="hero-image" aria-hidden="true"/);
  assert.match(html, /alt=""/);
});

test("lists all five available clinic languages", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("language-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();

  assert.match(html, /Português, inglês e espanhol/);
  assert.match(html, /Alemão e francês conforme o especialista/);
  assert.match(html, /"availableLanguage":\["pt-BR","en","es","de","fr"\]/);
});

test("renders the balanced premium desktop header", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("header-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(html, /class="language-switcher" aria-label="Idiomas"/);
  assert.match(css, /\.desktop-nav\s*\{[^}]*font-size:\s*\.96rem/s);
  assert.match(css, /\.header-cta\s*\{[^}]*background:\s*var\(--qara-graphite\)/s);
  assert.match(css, /\.language-switcher\s*\{[^}]*display:\s*inline-flex/s);
});

test("lists Dr. Fabrício as the pediatric dermatology specialist", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("fabricio-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/dermatopediatria", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();

  assert.match(html, /Dr\. Fabrício de Andrade/);
  assert.match(html, /CRM-RJ 92\.788-0/);
  assert.match(html, /terças-feiras, das 14h às 20h/i);
  assert.match(html, /dr-fabricio-de-andrade\.webp/);
});
