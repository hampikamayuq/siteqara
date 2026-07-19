import type { Metadata } from "next";
import { InternationalPage, esContent } from "../international";

export const metadata: Metadata = {
  title: "Dermatólogo que habla español en Copacabana, Río de Janeiro | Clínica QARA",
  description: "Dermatólogos certificados con atención en español en Copacabana: piel, cabello, uñas, cirugía y control de lunares. Atención particular con factura para su seguro de viaje.",
  alternates: { canonical: "/es", languages: { "pt-BR": "/", en: "/en", es: "/es", "x-default": "/" } },
  openGraph: {
    title: "Dermatólogo que habla español en Copacabana | Clínica QARA",
    description: "Cuidado de piel, cabello y uñas en español, junto al metro de Copacabana. Agende por WhatsApp.",
    locale: "es_ES",
    images: [{ url: "/images/qara-atendimento.webp", width: 1460, height: 973, alt: "Dermatóloga examinando a una paciente en la Clínica QARA" }],
  },
};

export default function SpanishPage() { return <InternationalPage c={esContent} />; }
