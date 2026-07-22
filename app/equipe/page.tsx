/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, CtaBand, Footer, Header } from "../ui";

export const metadata: Metadata = {
  title: "Equipe médica | Clínica QARA",
  description: "Conheça os dermatologistas da Clínica QARA em Copacabana: formação, áreas de atuação e credenciais CRM/RQE de cada especialista.",
  alternates: { canonical: "/equipe" },
};

const team = [
  ["Dr. Diego Gálvez", "Dermatologia e cirurgia dermatológica", "/images/dr-diego.webp", "dr-diego-galvez"],
  ["Dr. Miguel Ceccarelli", "Unhas e dermatologia estética", "/images/dr-miguel.webp", "dr-miguel-ceccarelli"],
  ["Dra. Diana Stohmann", "Tricologia e transplante capilar", "/images/dra-diana.webp", "dra-diana-stohmann"],
  ["Dra. Manuela Pedretti", "Psoríase e doenças inflamatórias", "/images/dra-manuela.webp", "dra-manuela-pedretti"],
  ["Dr. Fabrício de Andrade", "Dermatopediatria", "/images/dr-fabricio-de-andrade.webp", "dr-fabricio-de-andrade"],
] as const;

export default function TeamPage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Breadcrumb>Equipe</Breadcrumb>
        <section className="section shell">
          <div className="section-heading">
            <div><p className="eyebrow">Corpo clínico</p><h2>Equipe médica da Clínica QARA.</h2></div>
            <p>Conheça a formação, as credenciais e a principal área de atuação de cada dermatologista.</p>
          </div>
          <div className="craft-specialists">
            {team.map(([name, area, src, slug]) => (
              <article key={slug}>
                <div className="doctor-image"><img src={src} alt={`Retrato profissional de ${name}`} width={1000} height={1300} loading="lazy" decoding="async" /></div>
                <h3>{name}</h3><p>{area}</p><Link href={`/equipe/${slug}`}>Conheça o especialista <span>→</span></Link>
              </article>
            ))}
          </div>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
