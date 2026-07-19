"use client";

import { useEffect } from "react";

const STICKY_OFFSET = 160;

export function BlogNavSpy() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".blog-index > nav");
    if (!nav) return;
    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));
    const entries = links.flatMap((link) => {
      const id = decodeURIComponent(link.hash.slice(1));
      const section = document.getElementById(id);
      return section ? [{ link, section, id }] : [];
    });
    if (!entries.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const sync = (fromScroll: boolean) => {
      frame = 0;
      let current = entries[0];
      entries.forEach((entry) => {
        if (entry.section.getBoundingClientRect().top <= STICKY_OFFSET) current = entry;
      });
      entries.forEach(({ link }) => {
        if (link !== current.link) {
          link.removeAttribute("aria-current");
          return;
        }
        if (link.getAttribute("aria-current") === "true") return;
        link.setAttribute("aria-current", "true");
        nav.scrollTo({
          left: link.offsetLeft - (nav.clientWidth - link.clientWidth) / 2,
          behavior: reduceMotion.matches ? "auto" : "smooth",
        });
        if (fromScroll) history.replaceState(null, "", link.hash);
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(() => sync(true));
    };
    sync(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
