import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wireframes do novo site | Clínica QARA",
  description: "Protótipo estrutural responsivo do novo website da Clínica QARA.",
  robots: { index: false, follow: false },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
