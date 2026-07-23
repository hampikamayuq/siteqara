import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { articles } from "../app/blog/articles.ts";
import { articleContent } from "../app/blog/article-content.ts";
import { evidence } from "../app/blog/article-evidence.ts";

const fabricioProfile = "/equipe/dr-fabricio-de-andrade";
const fabricioName = "Dr. Fabrício de Andrade";

test("keeps each medical article backed by complete, attributable evidence", () => {
  const articleSlugs = articles.map(article => article.slug).sort();
  assert.deepEqual(Object.keys(evidence).sort(), articleSlugs, "every article needs exactly one evidence record");

  for (const article of articles) {
    const record = evidence[article.slug];
    assert.equal(record.sectionCitations.length, articleContent[article.slug].length, `${article.slug}: each rendered section needs a citation group`);
    assert.match(record.author.crm, /^CRM-[A-Z]{2}\s+\S+$/, `${article.slug}: author needs a CRM`);

    const isFabricioException = record.author.name === fabricioName && record.author.url === fabricioProfile;
    if (isFabricioException) {
      assert.ok(record.author.qualification, `${article.slug}: Dr. Fabrício needs a stated qualification`);
      assert.equal(record.author.rqe, undefined, `${article.slug}: do not fabricate an RQE for Dr. Fabrício`);
    } else {
      assert.match(record.author.rqe ?? "", /^RQE\s+\S+$/, `${article.slug}: author needs an RQE`);
    }

    assert.ok(record.references.length > 0, `${article.slug}: evidence needs at least one reference`);
    for (const [, url] of record.references) {
      assert.match(url, /^https?:\/\//, `${article.slug}: references must use HTTP(S)`);
    }
    for (const citations of record.sectionCitations) {
      assert.ok(citations.length > 0, `${article.slug}: each rendered section needs at least one citation`);
      for (const index of citations) {
        assert.ok(index >= 1 && index <= record.references.length, `${article.slug}: citation ${index} must resolve to a reference`);
      }
    }
  }
});

test("sets safe static security headers without an untested CSP", async () => {
  const headers = await readFile(new URL("../public/_headers", import.meta.url), "utf8");
  const staticRule = headers.match(/^\/\*\n((?:  [^\n]*\n)*)/m);
  assert.ok(staticRule, "a /* header rule is required");
  const staticHeaders = staticRule[1].replace(/^  /gm, "");

  assert.match(staticHeaders, /^Strict-Transport-Security:\s*max-age=/m);
  assert.match(staticHeaders, /^X-Content-Type-Options:\s*nosniff$/m);
  assert.match(staticHeaders, /^Referrer-Policy:\s*strict-origin-when-cross-origin$/m);
  assert.match(staticHeaders, /^X-Frame-Options:\s*DENY$/m);
  assert.match(staticHeaders, /^Permissions-Policy:\s*camera=\(\), microphone=\(\), geolocation=\(\), payment=\(\)$/m);
  assert.doesNotMatch(staticHeaders, /Content-Security-Policy:/i, "CSP needs separate Vinext/RSC validation before it is enabled");
  assert.doesNotMatch(headers, /Content-Security-Policy:/i, "CSP must remain absent from every header rule until Vinext/RSC validation is complete");
});

test("updates the document language when international routes change", async () => {
  const [controller, layout] = await Promise.all([
    readFile(new URL("../app/document-language.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(controller, /"use client"/);
  assert.match(controller, /usePathname/);
  assert.match(controller, /pathname === "\/en" \? "en" : pathname === "\/es" \? "es" : "pt-BR"/);
  assert.match(controller, /document\.documentElement\.lang = language/);
  assert.match(layout, /import \{ DocumentLanguage \} from "\.\/document-language"/);
  assert.match(layout, /<DocumentLanguage \/>/);
});
