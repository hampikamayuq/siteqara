/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, CtaBand, Footer, Header } from "../../ui";

type Profile = {
  name: string; role: string; credential: string; lead: string;
  image: string; imageW: number; imageH: number;
  facts: string[];
  areas: [string, string, string][]; // title, text, href
  timeline: [string, string, string][]; // tag, title, text
  memberOf?: string[];
  languages?: string[];
};

const profiles: Record<string, Profile> = {
  "dr-diego-galvez": {
    name: "Dr. Diego Gálvez", role: "Dermatologista e cirurgião dermatológico",
    credential: "CRM-RJ 52-0112387-4 · RQE 57517",
    lead: "Atuação em dermatologia clínica e cirurgia dermatológica, com foco em diagnóstico preciso, planejamento seguro e acompanhamento próximo.",
    image: "/images/dr-diego.webp", imageW: 1351, imageH: 1672,
    facts: ["Português, espanhol e inglês", "Atendimento presencial e telemedicina", "Fundador da Clínica QARA"],
    areas: [
      ["Cirurgia dermatológica", "Retirada de lesões, reconstruções, retalhos, enxertos e acompanhamento pós-operatório.", "/cirurgia-dermatologica"],
      ["Câncer da pele", "Avaliação, biópsia, planejamento cirúrgico e controle de margens quando indicado.", "/cirurgia-dermatologica"],
      ["Biópsias", "Coleta de amostras da pele, das unhas ou do couro cabeludo para esclarecer o diagnóstico.", "/blog/biopsia-de-pele-quando-e-indicada"],
      ["Dermatologia clínica", "Avaliação de sintomas e lesões da pele, com dermatoscopia quando necessária.", "/dermatologia-clinica"],
    ],
    timeline: [
      ["Formação", "Dermatologia", "Instituto Professor Rubem David Azulay."],
      ["Aperfeiçoamento", "Cirurgia Dermatológica", "Santa Casa do Rio de Janeiro."],
      ["Atuação", "Clínica QARA", "Fundador e integrante da equipe médica em Copacabana. Membro da SBD e da SBCD."],
    ],
    memberOf: ["Sociedade Brasileira de Dermatologia", "Sociedade Brasileira de Cirurgia Dermatológica"],
    languages: ["pt-BR", "es", "en"],
  },
  "dra-diana-stohmann": {
    name: "Dra. Diana Stohmann", role: "Dermatologista · Tricologia e transplante capilar",
    credential: "CRM-RJ 52.1305301 · RQE 57357",
    lead: "Atuação dedicada às doenças dos cabelos e do couro cabeludo, da investigação da queda ao transplante capilar pela técnica FUE.",
    image: "/images/dra-diana.webp", imageW: 1200, imageH: 1423,
    facts: ["Tricoscopia na avaliação capilar", "Transplante capilar pela técnica FUE"],
    areas: [
      ["Cabelos e couro cabeludo", "Investigação da queda capilar, alopecias e doenças do couro cabeludo.", "/cabelo"],
      ["Transplante capilar", "Avaliação da área doadora, padrão de perda e restauração pela técnica FUE.", "/cabelo"],
      ["Tricoscopia", "Ampliação dos fios e folículos para orientar o diagnóstico.", "/blog/queda-de-cabelo-causas"],
      ["Alopecias", "Diagnóstico e acompanhamento das alopecias não cicatriciais e cicatriciais.", "/blog/alopecia-androgenetica"],
    ],
    timeline: [
      ["Formação", "Dermatologia e fellow em Tricologia", "Instituto Professor Rubem David Azulay."],
      ["Atuação", "Clínica QARA", "Doenças dos cabelos e transplante capilar pela técnica FUE, em Copacabana."],
    ],
  },
  "dr-miguel-ceccarelli": {
    name: "Dr. Miguel Ceccarelli", role: "Dermatologista · Unhas e dermatologia estética",
    credential: "CRM-RJ 52-1092456 · RQE 34414",
    lead: "Atuação dedicada às doenças das unhas e à dermatologia estética, com investigação diagnóstica e planejamento individualizado.",
    image: "/images/dr-miguel.webp", imageW: 415, imageH: 640,
    facts: ["Procedimentos da unidade ungueal", "Planejamento estético individualizado"],
    areas: [
      ["Doenças das unhas", "Micose, unha encravada, psoríase ungueal, tumores e cirurgia da unha.", "/unhas"],
      ["Cirurgia ungueal", "Biópsias e procedimentos da unidade ungueal quando indicados.", "/unhas"],
      ["Dermatologia estética", "Planejamento individualizado, alinhado à anatomia e aos objetivos do paciente.", "/dermatologia-estetica"],
      ["Conteúdo sobre unhas", "Quando a alteração da unha não é micose.", "/blog/doencas-das-unhas"],
    ],
    timeline: [
      ["Atuação", "Doenças das unhas", "Investigação diagnóstica e procedimentos da unidade ungueal na Clínica QARA."],
      ["Atuação", "Dermatologia estética", "Indicações conduzidas a partir de planejamento individualizado."],
    ],
  },
  "dra-manuela-pedretti": {
    name: "Dra. Manuela Pedretti", role: "Dermatologista · Doenças inflamatórias e dermatopediatria",
    credential: "CRM-RJ 52-8115976-3 · RQE 53939",
    lead: "Atuação dedicada à psoríase, à dermatite atópica, à hidradenite e às doenças autoimunes, além da dermatologia de bebês, crianças e adolescentes.",
    image: "/images/dra-manuela.webp", imageW: 852, imageH: 1280,
    facts: ["Residência em Dermatologia pela UERJ", "Acompanhamento de doenças crônicas da pele"],
    areas: [
      ["Doenças inflamatórias", "Psoríase, dermatite atópica, hidradenite e doenças autoimunes.", "/doencas-inflamatorias"],
      ["Dermatopediatria", "Avaliação dermatológica de bebês, crianças e adolescentes.", "/dermatopediatria"],
      ["Psoríase", "Guia para pacientes: além das lesões na pele.", "/blog/psoriase-guia-para-pacientes"],
      ["Dermatite atópica", "Por que a coceira volta e como cuidar da pele no dia a dia.", "/blog/dermatite-atopica"],
    ],
    timeline: [
      ["Formação", "Residência em Dermatologia", "Universidade do Estado do Rio de Janeiro (UERJ)."],
      ["Atuação", "Clínica QARA", "Doenças inflamatórias e dermatopediatria, acompanhando pacientes e famílias em Copacabana."],
    ],
  },
};

export function generateStaticParams() { return Object.keys(profiles).map(slug => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = profiles[slug];
  if (!p) return {};
  return {
    title: `${p.name} — ${p.role} | Clínica QARA`,
    description: `${p.lead} ${p.credential}.`,
    alternates: { canonical: `/equipe/${slug}` },
    openGraph: { title: `${p.name} — ${p.role}`, description: p.lead, images: [{ url: p.image, width: p.imageW, height: p.imageH, alt: p.name }] },
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = profiles[slug];
  if (!p) notFound();
  const schema = {
    "@context": "https://schema.org", "@type": "Physician",
    name: p.name, medicalSpecialty: "Dermatology",
    identifier: p.credential.split(" · "),
    url: `https://clinicaqara.com.br/equipe/${slug}`,
    image: `https://clinicaqara.com.br${p.image}`,
    ...(p.languages ? { knowsLanguage: p.languages } : {}),
    ...(p.memberOf ? { memberOf: p.memberOf.map(name => ({ "@type": "Organization", name })) } : {}),
    worksFor: { "@type": "MedicalClinic", name: "Clínica QARA", url: "https://clinicaqara.com.br" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main id="conteudo">
        <Breadcrumb><Link href="/#especialistas">Equipe</Link><span>/</span>{p.name}</Breadcrumb>
        <section className="profile-hero shell">
          <div className="profile-photo"><img src={p.image} width={p.imageW} height={p.imageH} fetchPriority="high" alt={`${p.name}, ${p.role.toLowerCase()}`} /></div>
          <div>
            <p className="eyebrow">{p.role}</p>
            <h1>{p.name}</h1>
            <p className="credential">{p.credential}</p>
            <p className="lead">{p.lead}</p>
            <div className="actions">
              <a className="button button-primary" href={`https://wa.me/5521992189718?text=${encodeURIComponent(`Olá, gostaria de consultar horários com ${p.name.split(" ").slice(0, 2).join(" ")}.`)}`} target="_blank" rel="noopener noreferrer">Consultar horários</a>
              <a className="button button-secondary" href="#atuacao">Ver áreas de atuação</a>
            </div>
            {p.facts.length > 0 && <ul className="profile-facts">{p.facts.map(f => <li key={f}>{f}</li>)}</ul>}
          </div>
        </section>

        <section className="soft-section" id="atuacao">
          <div className="section shell">
            <div className="section-heading">
              <div><h2>Áreas de atuação.</h2></div>
              <p>Veja em quais situações {p.name.split(" ").slice(0, 2).join(" ")} atua e acesse as páginas com informações completas.</p>
            </div>
            <div className="focus-grid">
              {p.areas.map(([t, text, href]) => <article key={t}><h3>{t}</h3><p>{text}</p><Link href={href}>Saber mais →</Link></article>)}
            </div>
          </div>
        </section>

        <section className="section shell biography-grid">
          <div><h2>Formação e atuação.</h2></div>
          <div className="timeline">
            {p.timeline.map(([tag, t, text]) => <article key={t + text}><span>{tag}</span><h3>{t}</h3><p>{text}</p></article>)}
          </div>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
