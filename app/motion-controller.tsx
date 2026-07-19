"use client";

import { useEffect } from "react";

const REVEAL_GROUPS = [
  ["main > section:not(.hero):not(.specialty-hero), .article-page > header, .article-cover, .article-layout, .breadcrumb", "motion-up"],
  [".section-heading, .editorial-heading, .specialty-hero-grid > div:first-child, .article-header", "motion-up"],
  [".doctor-band-photo, .treatment-photo, .location-grid > div:first-child", "motion-left"],
  [".doctor-band-grid > div:last-child, .treatment-feature > div:first-child, .map-art", "motion-right"],
] as const;

const STAGGER_GROUPS = [
  ".specialty-grid",
  ".team-grid",
  ".journal-list",
  ".procedure-list",
  ".care-process ol",
  ".profile-grid",
  ".blog-grid",
  ".footer-grid",
];

const HERO_MEDIA = ".hero-image, .hero-visual, .hero-media, .specialty-portrait";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) return;

    root.classList.add("motion-ready");
    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );

    const observe = (element: Element, variant: string, index = 0) => {
      if (observed.has(element)) return;
      observed.add(element);
      element.classList.add("motion-item", variant);
      if (element instanceof HTMLElement) element.style.setProperty("--motion-index", String(Math.min(index, 7)));
      observer.observe(element);
    };

    const register = (scope: ParentNode = document) => {
      REVEAL_GROUPS.forEach(([selector, variant]) => {
        scope.querySelectorAll(selector).forEach((element) => observe(element, variant));
      });
      STAGGER_GROUPS.forEach((selector) => {
        scope.querySelectorAll(selector).forEach((group) => {
          Array.from(group.children).forEach((element, index) => observe(element, "motion-up", index));
        });
      });
      scope.querySelectorAll(".hero-copy > *, .specialty-hero-grid > div:first-child > *").forEach((element, index) => observe(element, "motion-up", index));
    };

    register();
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => node instanceof Element && register(node)));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const hero = document.querySelector<HTMLElement>(HERO_MEDIA);
    const wideScreen = window.matchMedia("(min-width: 861px)");
    let frame = 0;
    const updateHero = () => {
      frame = 0;
      if (!hero || !wideScreen.matches || reduceMotion.matches) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight));
      hero.style.setProperty("--hero-shift", `${(progress * 12).toFixed(2)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHero);
    };
    updateHero();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      root.classList.remove("motion-ready");
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      hero?.style.removeProperty("--hero-shift");
    };
  }, []);

  return null;
}
