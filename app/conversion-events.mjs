const freeze = values => Object.freeze([...values]);

export const conversionAllowlists = Object.freeze({
  event_name: freeze([
    "whatsapp_click",
    "phone_click",
    "maps_click",
    "doctor_profile_view",
    "specialty_view",
    "article_to_specialty_click",
    "language_change",
  ]),
  placement: freeze(["header", "mobile_menu", "hero", "cta_band", "footer", "blog_guidance", "not_found", "article_related", "contact"]),
  variant: freeze(["schedule", "guidance", "whatsapp", "phone", "maps"]),
  context: freeze(["home", "specialty", "profile", "blog", "article", "international", "not_found"]),
  doctor: freeze(["dr-miguel-ceccarelli", "dr-diego-galvez", "dra-diana-stohmann", "dra-manuela-pedretti", "dr-fabricio-de-andrade"]),
  specialty: freeze(["dermatologia-clinica", "cirurgia-dermatologica", "cabelo", "unhas", "doencas-inflamatorias", "dermatopediatria", "dermatologia-estetica"]),
  article: freeze([
    "cancer-da-pele-sinais-de-alerta", "biopsia-de-pele-quando-e-indicada", "queda-de-cabelo-causas", "alopecia-androgenetica",
    "psoriase-guia-para-pacientes", "dermatite-atopica", "hidradenite-supurativa", "doencas-das-unhas",
    "melasma-por-que-as-manchas-voltam", "toxina-botulinica-antes-de-aplicar", "preenchimento-facial-planejamento", "cicatrizes-de-acne-tratamento",
    "blefaroplastia-o-que-avaliar", "dermatite-atopica-no-bebe", "acne-na-adolescencia", "marcas-de-nascimento-quando-avaliar",
    "acne-tratamento-por-fases", "rosacea-diferenca-da-acne", "dermatite-seborreica-couro-cabeludo", "vitiligo-causas-e-tratamento",
    "mapeamento-de-pintas-dermatoscopia-digital", "unha-encravada-tratamento-e-cirurgia", "micose-de-unha-tratamento", "cistos-e-lipomas-quando-remover",
    "verrugas-tratamento", "transplante-capilar-fue-avaliacao", "alopecia-areata", "efluvio-telogeno",
  ]),
  category: freeze(["cancer-da-pele", "cirurgia", "cabelos", "doencas-inflamatorias", "unhas", "dermatologia-estetica", "dermatopediatria", "dermatologia-clinica"]),
  locale: freeze(["pt-BR", "en", "es"]),
  to_locale: freeze(["pt-BR", "en", "es"]),
  acquisition_channel: freeze(["direct", "organic", "paid_search", "paid_social", "referral", "other"]),
});

const marketingKeys = freeze(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "msclkid", "fbclid", "ttclid"]);
const publicPathnames = freeze([
  "/",
  "/blog",
  "/equipe",
  "/en",
  "/es",
  "/not-found",
  ...conversionAllowlists.specialty.map(slug => `/${slug}`),
  ...conversionAllowlists.doctor.map(slug => `/equipe/${slug}`),
  ...conversionAllowlists.article.map(slug => `/blog/${slug}`),
]);

export function deriveAcquisitionChannel(searchParams) {
  const params = searchParams instanceof URLSearchParams ? searchParams : new URLSearchParams(searchParams ?? "");
  const medium = (params.get("utm_medium") ?? "").toLowerCase().replace(/[\s-]+/g, "_");

  if (params.has("gclid") || params.has("msclkid") || ["cpc", "ppc", "paid_search", "search_ads"].includes(medium)) return "paid_search";
  if (params.has("fbclid") || params.has("ttclid") || ["paid_social", "social_paid", "social_ads"].includes(medium)) return "paid_social";
  if (medium === "organic") return "organic";
  if (medium === "referral") return "referral";
  if (marketingKeys.some(key => params.has(key))) return "other";
  return "direct";
}

function normalizePathname(pathname) {
  const raw = String(pathname || "/").split(/[?#]/, 1)[0];
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");
  const normalized = collapsed.length > 1 ? collapsed.replace(/\/+$/, "") : "/";
  return publicPathnames.includes(normalized) ? normalized : "/not-found";
}

export function createConversionEvent(input, locationLike = {}) {
  if (!input || typeof input !== "object" || !input.event_name) throw new Error("Missing conversion event_name");

  const detail = {};
  for (const [key, allowed] of Object.entries(conversionAllowlists)) {
    if (key === "acquisition_channel" || !(key in input)) continue;
    const value = input[key];
    if (!allowed.includes(value)) throw new Error(`Unknown conversion ${key}: ${String(value)}`);
    detail[key] = value;
  }

  detail.pathname = normalizePathname(locationLike.pathname);
  const searchParams = locationLike.searchParams ?? new URLSearchParams(locationLike.search ?? "");
  detail.acquisition_channel = deriveAcquisitionChannel(searchParams);
  return detail;
}
