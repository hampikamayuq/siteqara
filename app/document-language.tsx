"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function DocumentLanguage() {
  const pathname = usePathname();
  const language = pathname === "/en" ? "en" : pathname === "/es" ? "es" : "pt-BR";

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}
