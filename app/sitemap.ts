import type { MetadataRoute } from "next";
import { articles, isoDate } from "./blog/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://clinicaqara.com.br";
  const routes = ["", "/dermatologia-clinica", "/cirurgia-dermatologica", "/cabelo", "/unhas", "/doencas-inflamatorias", "/dermatopediatria", "/dermatologia-estetica", "/psoriase", "/hidradenite", "/vitiligo", "/en", "/es", "/equipe", "/equipe/dr-diego-galvez", "/equipe/dr-miguel-ceccarelli", "/equipe/dra-diana-stohmann", "/equipe/dra-manuela-pedretti", "/equipe/dr-fabricio-de-andrade", "/blog"];
  const updated = new Date("2026-07-22");
  const languages = { "pt-BR": base, en: `${base}/en`, es: `${base}/es`, "x-default": base };
  return [...routes.map(route => ({ url: `${base}${route}`, lastModified: updated, changeFrequency: route === "/blog" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .8, ...(["", "/en", "/es"].includes(route) ? { alternates: { languages } } : {}) })), ...articles.map(article => ({ url: `${base}/blog/${article.slug}`, lastModified: new Date(isoDate(article.date)), changeFrequency: "monthly" as const, priority: .7 }))];
}
