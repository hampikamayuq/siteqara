import type { Metadata } from "next";
import "./globals.css";
import { MotionController } from "./motion-controller";

export const metadata: Metadata = {
  metadataBase: new URL("https://clinicaqara.com.br"),
  title: "Clínica QARA | Dermatologia em Copacabana",
  description: "Dermatologia clínica e cirúrgica, cabelos, unhas e doenças inflamatórias com atendimento especializado em Copacabana.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Clínica QARA",
    locale: "pt_BR",
    title: "Clínica QARA | Dermatologia em Copacabana",
    description: "Dermatologia clínica e cirúrgica, cabelos, unhas e doenças inflamatórias com atendimento especializado em Copacabana.",
    images: [{ url: "/images/qara-atendimento.webp", width: 1460, height: 973, alt: "Atendimento na Clínica QARA" }],
  },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/fonts/Telegraf-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body data-motion-root>
        {children}
        <MotionController />
        <script dangerouslySetInnerHTML={{ __html: `addEventListener("keydown",function(e){if(e.key!=="Escape")return;var d=e.target&&e.target.closest?e.target.closest("details[open]"):null;d=d||document.querySelector(".mega-menu[open],.mobile-menu[open]");if(d){d.removeAttribute("open");var s=d.querySelector("summary");s&&s.focus()}});addEventListener("click",function(e){var l=e.target&&e.target.closest?e.target.closest(".mega-menu[open] a,.mobile-menu[open] a"):null;if(l){var dd=l.closest("details[open]");while(dd){dd.removeAttribute("open");dd=dd.parentElement?dd.parentElement.closest("details[open]"):null}}document.querySelectorAll(".mega-menu[open],.mobile-menu[open]").forEach(function(d){d.contains(e.target)||d.removeAttribute("open")});var f=e.target&&e.target.closest?e.target.closest(".blog-index nav a"):null;if(f){f.closest("nav").querySelectorAll("a").forEach(function(x){x.removeAttribute("aria-current")});f.setAttribute("aria-current","true")}});` }} />
      </body>
    </html>
  );
}
