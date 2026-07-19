import type { MetadataRoute } from "next";
import { articles } from "./blog/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://clinicaqara.com.br";
  const routes = ["", "/dermatologia-clinica", "/cirurgiadermatologica", "/cabelo", "/unhas", "/doencas-inflamatorias", "/dermatopediatria", "/dermatologia-estetica", "/especialista", "/blog"];
  const updated = new Date("2026-07-19");
  return [...routes.map(route => ({ url: `${base}${route}`, lastModified: updated, changeFrequency: route === "/blog" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .8 })), ...articles.map(article => ({ url: `${base}/blog/${article.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: .7 }))];
}
