import type { Metadata } from "next";
import "./globals.css";

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
    images: [{ url: "/images/qara-atendimento.webp", width: 1920, height: 1280, alt: "Atendimento na Clínica QARA" }],
  },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/fonts/Telegraf-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
