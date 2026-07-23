import assert from "node:assert/strict";
import test from "node:test";

import {
  createConversionEvent,
  deriveAcquisitionChannel,
} from "../app/conversion-events.mjs";

const eventNames = [
  "whatsapp_click",
  "phone_click",
  "maps_click",
  "doctor_profile_view",
  "specialty_view",
  "article_to_specialty_click",
  "language_change",
];

const placements = [
  "header",
  "mobile_menu",
  "hero",
  "cta_band",
  "footer",
  "blog_guidance",
  "not_found",
  "article_related",
  "contact",
  "floating",
];

const variants = ["schedule", "guidance", "whatsapp", "phone", "maps"];
const contexts = ["home", "specialty", "profile", "blog", "article", "international", "not_found"];
const locales = ["pt-BR", "en", "es"];
const doctors = [
  "dr-miguel-ceccarelli",
  "dr-diego-galvez",
  "dra-diana-stohmann",
  "dra-manuela-pedretti",
  "dr-fabricio-de-andrade",
];
const specialties = [
  "dermatologia-clinica",
  "cirurgia-dermatologica",
  "cabelo",
  "unhas",
  "doencas-inflamatorias",
  "dermatopediatria",
  "dermatologia-estetica",
];
const articles = [
  "cancer-da-pele-sinais-de-alerta",
  "biopsia-de-pele-quando-e-indicada",
  "queda-de-cabelo-causas",
  "alopecia-androgenetica",
  "psoriase-guia-para-pacientes",
  "dermatite-atopica",
  "hidradenite-supurativa",
  "doencas-das-unhas",
  "melasma-por-que-as-manchas-voltam",
  "toxina-botulinica-antes-de-aplicar",
  "preenchimento-facial-planejamento",
  "cicatrizes-de-acne-tratamento",
  "blefaroplastia-o-que-avaliar",
  "dermatite-atopica-no-bebe",
  "acne-na-adolescencia",
  "marcas-de-nascimento-quando-avaliar",
  "acne-tratamento-por-fases",
  "rosacea-diferenca-da-acne",
  "dermatite-seborreica-couro-cabeludo",
  "vitiligo-causas-e-tratamento",
  "mapeamento-de-pintas-dermatoscopia-digital",
  "unha-encravada-tratamento-e-cirurgia",
  "micose-de-unha-tratamento",
  "cistos-e-lipomas-quando-remover",
  "verrugas-tratamento",
  "transplante-capilar-fue-avaliacao",
  "alopecia-areata",
  "efluvio-telogeno",
];

const locationLike = { pathname: "/blog/queda-de-cabelo-causas/", search: "?utm_source=google&utm_medium=cpc&utm_campaign=private" };

test("accepts every approved event name and enum value", () => {
  for (const event_name of eventNames) {
    assert.equal(createConversionEvent({ event_name }, locationLike).event_name, event_name);
  }
  for (const [key, values] of Object.entries({ placement: placements, variant: variants, context: contexts, locale: locales, to_locale: locales })) {
    for (const value of values) {
      assert.equal(createConversionEvent({ event_name: "whatsapp_click", [key]: value }, locationLike)[key], value);
    }
  }
});

test("accepts every public doctor, specialty, article, and category slug", () => {
  for (const [key, values] of Object.entries({ doctor: doctors, specialty: specialties, article: articles })) {
    for (const value of values) {
      assert.equal(createConversionEvent({ event_name: "specialty_view", [key]: value }, locationLike)[key], value);
    }
  }
  for (const category of ["cancer-da-pele", "cirurgia", "cabelos", "doencas-inflamatorias", "unhas", "dermatologia-estetica", "dermatopediatria", "dermatologia-clinica"]) {
    assert.equal(createConversionEvent({ event_name: "article_to_specialty_click", category }, locationLike).category, category);
  }
});

test("normalizes the pathname and derives only a coarse acquisition channel", () => {
  assert.deepEqual(
    createConversionEvent({ event_name: "whatsapp_click", placement: "hero" }, locationLike),
    { event_name: "whatsapp_click", placement: "hero", pathname: "/blog/queda-de-cabelo-causas", acquisition_channel: "paid_search" },
  );

  const cases = [
    ["", "direct"],
    ["utm_medium=organic&utm_source=google", "organic"],
    ["gclid=secret", "paid_search"],
    ["utm_medium=paid_social&utm_campaign=secret", "paid_social"],
    ["utm_medium=referral&utm_source=partner", "referral"],
    ["utm_medium=email&utm_content=secret", "other"],
  ];
  for (const [query, expected] of cases) {
    assert.equal(deriveAcquisitionChannel(new URLSearchParams(query)), expected);
  }
});

test("maps unknown and sensitive pathnames to the not-found sentinel", () => {
  const sensitivePaths = [
    "/patient@example.com",
    "/+5521992189718",
    "/diagnosis/melanoma",
    "/symptom/itching",
    "/free text supplied by a visitor",
    "/arbitrary-unknown-route",
    "/blog/not-a-public-article",
  ];

  for (const pathname of sensitivePaths) {
    const serialized = JSON.stringify(createConversionEvent({ event_name: "whatsapp_click" }, { pathname }));
    assert.deepEqual(JSON.parse(serialized), {
      event_name: "whatsapp_click",
      pathname: "/not-found",
      acquisition_channel: "direct",
    });
    assert.equal(serialized.includes(pathname), false, pathname);
  }
});

test("discards unknown and sensitive inputs without serializing raw tracking data", () => {
  const sensitive = {
    href: "https://wa.me/secret",
    text: "free text",
    message: "medical message",
    symptom: "itching",
    diagnosis: "private",
    search: "?utm_term=private",
    hash: "#private",
    referrer: "https://search.example/private",
    cookie: "id=private",
    ip: "192.0.2.1",
    userAgent: "private-agent",
    email: "patient@example.com",
    phone: "+552100000000",
    unknown: "private",
  };
  const result = createConversionEvent({ event_name: "whatsapp_click", ...sensitive }, locationLike);
  const serialized = JSON.stringify(result);

  for (const key of Object.keys(sensitive)) assert.equal(key in result, false, key);
  for (const raw of Object.values(sensitive)) assert.equal(serialized.includes(raw), false, raw);
  assert.doesNotMatch(serialized, /google|private|campaign|utm_|gclid/i);
});

test("throws for an unknown event, enum, or public slug", () => {
  for (const input of [
    { event_name: "form_submit" },
    { event_name: "whatsapp_click", placement: "floating-widget" },
    { event_name: "whatsapp_click", variant: "medical-free-text" },
    { event_name: "whatsapp_click", context: "diagnosis" },
    { event_name: "language_change", locale: "de" },
    { event_name: "language_change", to_locale: "fr" },
    { event_name: "doctor_profile_view", doctor: "unknown-doctor" },
    { event_name: "specialty_view", specialty: "unknown-specialty" },
    { event_name: "article_to_specialty_click", article: "unknown-article" },
    { event_name: "article_to_specialty_click", category: "unknown-category" },
  ]) {
    assert.throws(() => createConversionEvent(input, locationLike), /Unknown|Missing/);
  }
});
