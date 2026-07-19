import type { Metadata } from "next";
import { InternationalPage, enContent } from "../international";

export const metadata: Metadata = {
  title: "English-Speaking Dermatologist in Copacabana, Rio de Janeiro | Clínica QARA",
  description: "Board-certified dermatologists offering care in English in Copacabana: skin, hair, nails, surgery and skin-cancer checks. Private care with invoice for travel-insurance claims.",
  alternates: { canonical: "/en", languages: { "pt-BR": "/", en: "/en", es: "/es", "x-default": "/" } },
  openGraph: {
    title: "English-Speaking Dermatologist in Copacabana | Clínica QARA",
    description: "Skin, hair and nail care in English, near the Copacabana metro. Book on WhatsApp.",
    locale: "en_US",
    images: [{ url: "/images/qara-atendimento.webp", width: 1460, height: 973, alt: "Dermatologist examining a patient at Clínica QARA" }],
  },
};

export default function EnglishPage() { return <InternationalPage c={enContent} />; }
