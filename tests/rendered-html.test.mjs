import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";
import { createConversionEvent } from "../app/conversion-events.mjs";

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

test("sets the complete security policy on rendered Worker responses", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("security-headers-test", `${process.pid}-${Date.now()}`);
  const { default: worker, withSecurityHeaders } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };

  const response = await worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), env, ctx);

  assert.equal(response.status, 200);
  assert.equal(response.statusText, "");
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("strict-transport-security"), "max-age=63072000; includeSubDomains");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("permissions-policy"), "camera=(), microphone=(), geolocation=(), payment=()");
  assert.equal(response.headers.get("content-security-policy"), null);
  assert.match(await response.text(), /<html lang="pt-BR">/);

  const noContent = withSecurityHeaders(new Response(null, {
    status: 204,
    statusText: "No Content",
    headers: { "x-existing": "preserved" },
  }));
  assert.equal(noContent.status, 204);
  assert.equal(noContent.statusText, "No Content");
  assert.equal(noContent.headers.get("x-existing"), "preserved");
  assert.equal(noContent.headers.get("x-content-type-options"), "nosniff");
  assert.equal(noContent.body, null);
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

test("keeps international main content labelled in its rendered language", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("document-language-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };

  for (const [route, language] of [["/en", "en"], ["/es", "es"]]) {
    const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), env, ctx);
    const html = await response.text();
    assert.match(html, /<html lang="pt-BR">/, `${route}: Portuguese remains the SSR document fallback`);
    assert.match(html, new RegExp(`<main[^>]+lang="${language}"`), `${route}: international content must retain its rendered language`);
  }
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

test("renders the complete editorial library without duplicating the featured story", async () => {
  const source = await readFile(new URL("../app/blog/articles.ts", import.meta.url), "utf8");
  const slugs = [...source.matchAll(/\{slug:"([^"]+)"/g)].map(match => match[1]);
  assert.equal(slugs.length, 28);
  assert.equal(new Set(slugs).size, 28);

  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("blog-index-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  const response = await worker.fetch(new Request("http://localhost/blog", { headers: { accept: "text/html" } }), env, ctx);
  assert.equal(response.status, 200);
  const html = await response.text();
  const groupedSections = html.split('<section class="blog-section"')[1] ?? "";
  assert.doesNotMatch(groupedSections, /\/blog\/cancer-da-pele-sinais-de-alerta/, "featured story must not reappear in a topic section");
  assert.match(html, /Continue a leitura|Não sabe por onde começar/);

  for (const slug of slugs) {
    const articleResponse = await worker.fetch(new Request(`http://localhost/blog/${slug}`, { headers: { accept: "text/html" } }), env, ctx);
    assert.equal(articleResponse.status, 200, slug);
    const articleHtml = await articleResponse.text();
    assert.match(articleHtml, new RegExp(`<link rel="canonical" href="https://clinicaqara\\.com\\.br/blog/${slug}"`));
    assert.match(articleHtml, /"MedicalWebPage"/);
    assert.match(articleHtml, /Continue a leitura/);
  }
});

test("ships responsive variants for every blog cover", async () => {
  const source = await readFile(new URL("../app/blog/articles.ts", import.meta.url), "utf8");
  const images = [...source.matchAll(/image:"(\/images\/blog\/[^\"]+\.webp)"/g)].map(match => match[1]);
  assert.equal(images.length, 28);
  for (const image of images) {
    const base = image.replace(/\.webp$/, "");
    const full = new URL(`../public${base}.webp`, import.meta.url);
    await access(full);
    assert.ok((await stat(full)).size > 15_000, `${image} should be a photographic cover, not a lightweight title-card placeholder`);
    await access(new URL(`../public${base}-640.webp`, import.meta.url));
    await access(new URL(`../public${base}-1024.webp`, import.meta.url));
  }
});

test("does not present a medical specialty as Dr. Fabrício's RQE", async () => {
  const source = await readFile(new URL("../app/blog/article-evidence.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /rqe:"Dermatologista e pediatra"/);
  assert.match(source, /qualification:"Dermatologista e pediatra"/);
});

test("renders only the approved conversion contract across public conversion routes", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("conversion-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  const source = await readFile(new URL("../app/blog/articles.ts", import.meta.url), "utf8");
  const articleSlugs = [...source.matchAll(/\{slug:"([^"]+)"/g)].map(match => match[1]);
  const specialties = ["dermatologia-clinica", "cirurgia-dermatologica", "cabelo", "unhas", "doencas-inflamatorias", "dermatopediatria", "dermatologia-estetica"];
  const doctors = ["dr-miguel-ceccarelli", "dr-diego-galvez", "dra-diana-stohmann", "dra-manuela-pedretti", "dr-fabricio-de-andrade"];
  const routes = ["/", ...specialties.map(slug => `/${slug}`), ...doctors.map(slug => `/equipe/${slug}`), "/en", "/es", "/blog", ...articleSlugs.map(slug => `/blog/${slug}`)];
  const approvedAttributes = new Set(["event", "placement", "variant", "context", "doctor", "specialty", "article", "category", "locale", "to-locale"]);

  for (const route of routes) {
    const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), env, ctx);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const instrumentedTags = html.match(/<[^>]+\bdata-conversion-event="[^"]+"[^>]*>/g) ?? [];
    assert.ok(instrumentedTags.length > 0, `${route} should render conversion metadata`);

    for (const tag of instrumentedTags) {
      const attributes = Object.fromEntries([...tag.matchAll(/\bdata-conversion-([a-z-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
      for (const key of Object.keys(attributes)) assert.ok(approvedAttributes.has(key), `${route}: ${key}`);
      const input = Object.fromEntries(Object.entries(attributes).map(([key, value]) => [key.replaceAll("-", "_"), value]));
      assert.doesNotThrow(() => createConversionEvent({ event_name: input.event, ...input, event: undefined }, new URL(`http://localhost${route}`)), `${route}: ${tag}`);
    }
    assert.doesNotMatch(html, /data-conversion-(?:href|text|message|symptom|diagnosis|search|hash|referrer|cookie|ip|user-agent|email|phone)=/i, route);
  }

  for (const slug of specialties) {
    const response = await worker.fetch(new Request(`http://localhost/${slug}`, { headers: { accept: "text/html" } }), env, ctx);
    const html = await response.text();
    assert.match(html, new RegExp(`data-conversion-event="specialty_view"[^>]+data-conversion-specialty="${slug}"`), slug);
  }
  for (const slug of doctors) {
    const response = await worker.fetch(new Request(`http://localhost/equipe/${slug}`, { headers: { accept: "text/html" } }), env, ctx);
    const html = await response.text();
    assert.match(html, new RegExp(`data-conversion-event="doctor_profile_view"[^>]+data-conversion-doctor="${slug}"`), slug);
  }
  for (const slug of articleSlugs) {
    const response = await worker.fetch(new Request(`http://localhost/blog/${slug}`, { headers: { accept: "text/html" } }), env, ctx);
    const html = await response.text();
    assert.match(html, new RegExp(`data-conversion-event="article_to_specialty_click"[^>]+data-conversion-article="${slug}"`), slug);
  }
});

test("renders PT, EN, and ES switchers with only other locales instrumented", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("locale-conversion-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };

  for (const [route, locale] of [["/", "pt-BR"], ["/en", "en"], ["/es", "es"]]) {
    const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), env, ctx);
    const html = await response.text();
    for (const [href, label] of [["/", "PT"], ["/en", "EN"], ["/es", "ES"]]) assert.match(html, new RegExp(`<a[^>]+href="${href}"[^>]*>${label}</a>`), `${route}: ${label}`);
    const currentHref = locale === "pt-BR" ? "/" : `/${locale}`;
    assert.match(html, new RegExp(`<a[^>]+href="${currentHref}"[^>]+aria-current="page"[^>]*>`), route);
    assert.doesNotMatch(html, new RegExp(`<a[^>]+href="${currentHref}"[^>]+data-conversion-event="language_change"[^>]*>`), route);
    for (const target of ["pt-BR", "en", "es"].filter(target => target !== locale)) {
      assert.match(html, new RegExp(`data-conversion-event="language_change"[^>]+data-conversion-locale="${locale}"[^>]+data-conversion-to-locale="${target}"`), `${route}: ${target}`);
    }
  }
});

test("labels Portuguese language changes with the rendered route context", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("language-context-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  const routes = [
    ["/blog/cancer-da-pele-sinais-de-alerta", "article"],
    ["/equipe/dr-diego-galvez", "profile"],
    ["/dermatologia-clinica", "specialty"],
  ];

  for (const [route, context] of routes) {
    const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), env, ctx);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const changes = html.match(/<a[^>]+data-conversion-event="language_change"[^>]*>/g) ?? [];
    assert.equal(changes.length, 4, `${route}: desktop and mobile links to EN and ES`);
    for (const tag of changes) {
      assert.match(tag, new RegExp(`data-conversion-context="${context}"`), `${route}: ${tag}`);
    }
  }
});

test("centralizes clinic contact destinations", async () => {
  const central = await readFile(new URL("../app/clinic-links.ts", import.meta.url), "utf8");
  assert.match(central, /5521992189718/);
  assert.match(central, /contato@clinicaqara\.com\.br/);
  assert.match(central, /google\.com\/maps/);
  assert.match(central, /doctoralia\.com\.br\/clinicas\/clinica-qara-2/);

  const files = ["ui.tsx", "page.tsx", "specialty-template.tsx", "cabelo/page.tsx", "cirurgia-dermatologica/page.tsx", "equipe/[slug]/page.tsx", "blog/page.tsx", "international.tsx", "not-found.tsx"];
  for (const file of files) {
    const source = await readFile(new URL(`../app/${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /5521992189718|contato@clinicaqara\.com\.br|google\.com\/maps\/place\/|doctoralia\.com\.br\/clinicas\/clinica-qara-2/, file);
  }
});

test("does not treat the Google review evidence link as a location conversion", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const reviewAnchor = source.match(/<a href=\{clinicMapsUrl\}[^>]+aria-label="Nota 5,0 no Google[^>]+>/)?.[0];
  assert.ok(reviewAnchor, "Google review evidence link should remain present");
  assert.doesNotMatch(reviewAnchor, /data-conversion-event=/);
  assert.match(source, /Abrir no Google Maps[\s\S]+data-conversion-event="maps_click"|data-conversion-event="maps_click"[^>]+>Abrir no Google Maps/);
});

test("credits aesthetic publications to Dr. Diego and ships the complete contact footer", async () => {
  const evidenceSource = await readFile(new URL("../app/blog/article-evidence.ts", import.meta.url), "utf8");
  for (const slug of ["melasma-por-que-as-manchas-voltam", "toxina-botulinica-antes-de-aplicar", "preenchimento-facial-planejamento", "cicatrizes-de-acne-tratamento", "blefaroplastia-o-que-avaliar"]) {
    const entry = evidenceSource.match(new RegExp(`"${slug}":\\{author:\\{([^}]+)\\}`));
    assert.ok(entry, `missing evidence entry for ${slug}`);
    assert.match(entry[1], /name:"Dr\. Diego Gálvez"/);
    assert.match(entry[1], /rqe:"RQE 57517"/);
  }

  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("footer-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();
  assert.match(html, /Horário de atendimento/);
  assert.match(html, /CRM 1285041-RJ/);
  assert.match(html, /RQE 34414 · Dermatologia/);
  assert.match(html, /@qaraclinica/);
  assert.match(html, /whatsapp-float/);
  assert.match(html, /aria-label="Agendar uma consulta pelo WhatsApp \(abre em nova aba\)"/);
  assert.match(html, /<img[^>]+src="\/images\/whatsapp-icon\.png"[^>]+alt=""[^>]*>/);
  assert.doesNotMatch(html, /Agendar no WhatsApp/);
  assert.match(html, /conheci\+o\+trabalho\+da\+Clinica/);
});

test("uses the approved WhatsApp booking links by page and specialty", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("booking-links-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  const cases = [
    ["/", "https://wa.me/5521992189718?text=Ol%C3%A1+conheci+o+trabalho+da+Clinica+pela+p%C3%A1gina+e+gostaria+de+agendar+uma+consulta."],
    ["/equipe/dr-diego-galvez", "https://api.whatsapp.com/send?phone=5521992189718&amp;text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20agendar%20uma%20consulta%20com%20o%20Dr.%20Diego%20Galvez"],
    ["/cirurgia-dermatologica", "https://api.whatsapp.com/send?phone=5521992189718&amp;text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20agendar%20uma%20consulta%20com%20o%20Dr.%20Diego%20Galvez"],
    ["/cabelo", "https://api.whatsapp.com/send?phone=5521992189718&amp;text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20agendar%20uma%20consulta%20de%20cabelo%20com%20a%20Dra.%20Diana%20Stohmann"],
    ["/equipe/dr-miguel-ceccarelli", "https://api.whatsapp.com/send?phone=5521992189718&amp;text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20agendar%20uma%20consulta%20com%20o%20Dr.%20Miguel%20Ceccarelli"],
    ["/dermatopediatria", "https://api.whatsapp.com/send?phone=5521992189718&amp;text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20agendar%20uma%20consulta%20de%20dermatopediatria"],
    ["/blog/dermatite-atopica", "https://api.whatsapp.com/send?phone=5521992189718&amp;text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20agendar%20uma%20consulta%20de%20dermatite%20at%C3%B3pica%20com%20a%20Dra.%20Manuela%20Pedretti%20Cabral"],
    ["/blog/psoriase-guia-para-pacientes", "https://api.whatsapp.com/send?phone=5521992189718&amp;text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20agendar%20uma%20consulta%20de%20psor%C3%ADase%20com%20a%20Dra.%20Manuela%20Pedretti%20Cabral"],
    ["/blog/hidradenite-supurativa", "https://api.whatsapp.com/send?phone=5521992189718&amp;text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20agendar%20uma%20consulta%20de%20hidrosadenite%20com%20a%20Dra.%20Manuela%20Pedretti%20Cabral"],
  ];

  for (const [route, expected] of cases) {
    const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), env, ctx);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), route);
  }
});
