/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, CtaBand, Footer, Header, portraitSrcSet } from "../../ui";

type Profile = {
  name: string; role: string; credential: string; lead: string;
  image: string; imageW: number; imageH: number;
  facts: string[];
  areas: [string, string, string][]; // title, text, href
  timeline: [string, string, string][]; // tag, title, text
  memberOf?: string[];
  languages?: string[];
  quotes?: [string, string][]; // text, author
  externalProfile?: string;
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
    quotes: [
      ["Dr Diego Galvez é um excelente profissional, minha cicatriz ficou imperceptível!", "Marcus Vinícius · Avaliação pública no Google"],
      ["O Dr. Diego fez um excelente trabalho. A blefaroplastia do meu tio ficou incrível. A equipe toda é maravilhosa. Muito feliz por ter eles no Rio de Janeiro!", "Fabiola Chavez · Avaliação pública no Google"],
      ["Gostei bastante do atendimento. O resultado foi maravilhoso 🙏.", "Wallace Tavares · Avaliação pública no Google"],
    ],
  },
  "dra-diana-stohmann": {
    name: "Dra. Diana Stohmann", role: "Dermatologista · Tricologia e transplante capilar",
    credential: "CRM-RJ 52-1305301 · RQE 57357",
    lead: "Atuação dedicada às doenças dos cabelos e do couro cabeludo, da investigação da queda ao transplante capilar pela técnica FUE.",
    image: "/images/dra-diana.webp", imageW: 1200, imageH: 1423,
    facts: ["Atendimento também em francês", "Tricoscopia na avaliação capilar", "Transplante capilar pela técnica FUE"],
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
    languages: ["pt-BR", "fr"],
    quotes: [
      ["Muito profissional, atenciosa e extremamente dedicada. Explica tudo nos mín detalhes, transmite segurança e passa uma tranquilidade que faz toda a diferença.", "Cristiane Taverna · Avaliação pública no Doctoralia"],
      ["Cuidadosa com o paciente e detalhista nas explicações, passando confiança na sua especialidade.", "José Francisco · Avaliação pública no Doctoralia"],
      ["Excelente profissional, saímos satisfeitos da consulta, confiantes no tratamento!", "Luis Lopes · Avaliação pública no Doctoralia"],
      ["Excelente consulta com atendimento humanizado! Interesse e foco no paciente.", "M.A.C · Avaliação pública no Doctoralia"],
      ["Muito anteciosa! Me sentir bem a vontade em falar.", "Katia · Avaliação pública no Doctoralia"],
    ],
  },
  "dr-miguel-ceccarelli": {
    name: "Dr. Miguel Ceccarelli", role: "Dermatologista · Unhas e dermatologia estética",
    credential: "CRM-RJ 52-0109245-6 · RQE 34414",
    lead: "Atuação dedicada às doenças das unhas e à dermatologia estética, com investigação diagnóstica e planejamento individualizado.",
    image: "/images/dr-miguel.webp", imageW: 415, imageH: 640,
    facts: ["Português, espanhol e inglês", "Fundador da Clínica QARA", "Doutorando em Ciências Médicas (UERJ)", "Coordenador do Departamento de Unhas da SBD-RJ"],
    areas: [
      ["Doenças das unhas", "Micose, unha encravada, psoríase ungueal, tumores e cirurgia da unha.", "/unhas"],
      ["Cirurgia ungueal", "Biópsias e procedimentos da unidade ungueal quando indicados.", "/unhas"],
      ["Dermatologia estética", "Planejamento individualizado, alinhado à anatomia e aos objetivos do paciente.", "/dermatologia-estetica"],
      ["Conteúdo sobre unhas", "Quando a alteração da unha não é micose.", "/blog/doencas-das-unhas"],
    ],
    timeline: [
      ["Formação", "Dermatologia", "Pós-graduação pelo Instituto de Dermatologia Professor Rubem David Azulay, no Hospital Geral da Santa Casa da Misericórdia do Rio de Janeiro."],
      ["Doutorado", "Ciências Médicas em andamento", "Doutorando do programa de Ciências Médicas da Universidade do Estado do Rio de Janeiro (UERJ)."],
      ["Atuação acadêmica", "Ambulatório de Doenças das Unhas", "Fundador e coordenador no Serviço de Dermatologia do Hospital Universitário Pedro Ernesto (UERJ), ambulatório do SUS especializado no estudo das unhas no Rio de Janeiro."],
      ["Pesquisa", "Revisão científica internacional", "Pesquisa clínica e revisão de artigos para periódicos como o International Journal of Dermatology e o Journal of the European Academy of Dermatology and Venereology."],
      ["Atuação", "Clínica QARA", "Fundador da Clínica QARA. Doenças das unhas, procedimentos da unidade ungueal e dermatologia estética, com atendimento presencial no Rio de Janeiro e em São Paulo e telemedicina em português, espanhol e inglês."],
    ],
    memberOf: ["Sociedade Brasileira de Dermatologia", "European Academy of Dermatology and Venereology", "European Nail Society"],
    languages: ["pt-BR", "es", "en"],
    quotes: [
      ["O atendimento foi excelente, Dr. Miguel é solícito e explicou tudo com calma e cuidado. Fiquei surpresa com a riqueza de informações sobre unhas que eu desconhecia, foi muito esclarecedor.", "Josie M. · Avaliação pública no Google"],
      ["Fui muito bem atendida. Dr. Miguel foi muito didático ao me explicar tudo sobre o que eu tinha e me deu toda orientação.", "Dalva Maria do Bomfim Lopes · Avaliação pública no Google"],
      ["Dermatologista com especialidade difícil de encontrar, no meu caso doença de unha. Fui muito bem atendida logo na recepção, o que me deu segurança de estar no lugar certo para o meu problema.", "Consuelo Siqueira · Avaliação pública no Google"],
    ],
  },
  "dra-manuela-pedretti": {
    name: "Dra. Manuela Pedretti", role: "Dermatologista · Psoríase e doenças inflamatórias",
    credential: "CRM-RJ 52-8115976-3 · RQE 53939",
    lead: "Atuação dedicada à psoríase, à dermatite atópica, à hidradenite e às doenças autoimunes, com acompanhamento individualizado das doenças crônicas da pele.",
    image: "/images/dra-manuela.webp", imageW: 852, imageH: 1280,
    facts: ["Atendimento também em alemão", "Residência em Dermatologia pela UERJ", "Acompanhamento de doenças crônicas da pele"],
    areas: [
      ["Doenças inflamatórias", "Psoríase, dermatite atópica, hidradenite e doenças autoimunes.", "/doencas-inflamatorias"],
      ["Psoríase", "Guia para pacientes: além das lesões na pele.", "/blog/psoriase-guia-para-pacientes"],
      ["Dermatite atópica", "Por que a coceira volta e como cuidar da pele no dia a dia.", "/blog/dermatite-atopica"],
      ["Hidradenite supurativa", "Inflamação recorrente, diagnóstico e acompanhamento de longo prazo.", "/blog/hidradenite-supurativa"],
    ],
    timeline: [
      ["Formação", "Residência em Dermatologia", "Universidade do Estado do Rio de Janeiro (UERJ)."],
      ["Atuação", "Clínica QARA", "Psoríase, dermatite atópica, hidradenite e doenças autoimunes, em Copacabana."],
    ],
    languages: ["pt-BR", "de"],
    quotes: [
      ["A Dra. Manuela Pedretti é uma dermatologista fantástica! Tenho psoríase e ela tem sido incrível no manejo do meu tratamento. Sempre oferece soluções eficazes e explicações claras. Além disso, ela é super atenciosa e faz você se sentir realmente cuidado. Recomendo muito!", "Renato Alves dos Santos"],
      ["A Dra. Manuela tem sido incrível no tratamento da minha dermatite atópica. Ela é muito atenciosa e sabe exatamente como cuidar da minha pele. Com suas orientações, consegui controlar melhor as crises e melhorar a qualidade da minha pele. Recomendo demais!", "Luzia dos Reis Silva"],
      ["Impressionante o nível de cuidado e atenção que recebi! A equipe é extremamente profissional e dedicada, tornando toda a experiência muito positiva. Minha pele nunca esteve tão bem, e o acompanhamento contínuo tem sido fantástico. Recomendo fortemente para quem busca um atendimento dermatológico de alto padrão.", "Maria Gonçalves de Melo"],
    ],
  },
  "dr-fabricio-de-andrade": {
    name: "Dr. Fabrício de Andrade", role: "Dermatologista e pediatra · Dermatopediatria",
    credential: "CRM-RJ 92.788-0",
    lead: "Formado em Dermatologia e Pediatria, atua no cuidado da pele de bebês, crianças e adolescentes, integrando o olhar das duas especialidades.",
    image: "/images/dr-fabricio-de-andrade.webp", imageW: 1023, imageH: 1537,
    facts: ["Português e inglês", "Dermatologista, pediatra e intensivista pediátrico", "Consultas às terças, quartas e quintas-feiras"],
    areas: [
      ["Dermatopediatria", "Avaliação dermatológica de bebês, crianças e adolescentes.", "/dermatopediatria"],
      ["Dermatite atópica", "Diagnóstico, orientação familiar e acompanhamento das crises na infância.", "/blog/dermatite-atopica"],
      ["Pintas e marcas de nascimento", "Avaliação de manchas, nevos e lesões vasculares desde os primeiros meses de vida.", "/dermatopediatria"],
      ["Acne na adolescência", "Tratamento adequado à idade para controlar a inflamação e prevenir cicatrizes.", "/dermatopediatria"],
    ],
    timeline: [
      ["Formação", "Dermatologia", "Instituto de Dermatologia Professor Rubem David Azulay, Hospital Geral da Santa Casa da Misericórdia do Rio de Janeiro."],
      ["Formação", "Pediatria e Terapia Intensiva Pediátrica", "Hospital Prontobaby."],
      ["Atuação acadêmica", "Preceptor em Dermatologia", "Preceptor do Ambulatório Geral da Pós-Graduação do Instituto de Dermatologia Professor Rubem David Azulay."],
      ["Agenda", "Horários de atendimento", "Terças-feiras, das 14h às 20h; quartas-feiras, das 10h às 20h; e quintas-feiras, das 10h às 14h."],
      ["Local", "Clínica QARA — Copacabana", "Rua Santa Clara, 50, salas 521/522, Copacabana, Rio de Janeiro."],
    ],
    languages: ["pt-BR", "en"],
    quotes: [
      ["Ele foi ótimo, muito detalhado e profissional. Recomendo!", "Andrew L. · Consulta verificada no Doctoralia"],
    ],
    externalProfile: "https://www.doctoralia.com.br/fabricio-de-andrade/dermatologista/rio-de-janeiro",
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
    name: p.name, medicalSpecialty: slug === "dr-fabricio-de-andrade" ? ["Dermatology", "Pediatrics"] : "Dermatology",
    identifier: p.credential.split(" · "),
    url: `https://clinicaqara.com.br/equipe/${slug}`,
    image: `https://clinicaqara.com.br${p.image}`,
    ...(p.externalProfile ? { sameAs: [p.externalProfile] } : {}),
    ...(p.languages ? { knowsLanguage: p.languages } : {}),
    ...(p.memberOf ? { memberOf: p.memberOf.map(name => ({ "@type": "Organization", name })) } : {}),
    worksFor: { "@type": "MedicalClinic", name: "Clínica QARA", url: "https://clinicaqara.com.br" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main id="conteudo">
        <Breadcrumb trail={[["Equipe", "/equipe"], [p.name, ""]]}><Link href="/equipe">Equipe</Link><span>/</span>{p.name}</Breadcrumb>
        <section className="profile-hero shell">
          <div className="profile-photo"><img src={p.image} srcSet={portraitSrcSet[p.image]} sizes={portraitSrcSet[p.image] && "(max-width: 900px) 100vw, 480px"} width={p.imageW} height={p.imageH} fetchPriority="high" alt={`${p.name}, ${p.role.toLowerCase()}`} /></div>
          <div>
            <p className="eyebrow">{p.role}</p>
            <h1>{p.name}</h1>
            <p className="credential">{p.credential}</p>
            <p className="lead">{p.lead}</p>
            <div className="actions">
              <a className="button button-primary" href={`https://wa.me/5521992189718?text=${encodeURIComponent(`Olá, gostaria de consultar horários com ${p.name.split(" ").slice(0, 2).join(" ")}.`)}`} target="_blank" rel="noopener noreferrer">Consultar horários</a>
              <a className="button button-secondary" href="#atuacao">Ver áreas de atuação</a>
              {p.externalProfile && <a className="button button-secondary" href={p.externalProfile} target="_blank" rel="noopener noreferrer">Ver perfil no Doctoralia</a>}
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
        {p.quotes && <section className="soft-section">
          <div className="section shell">
            <div className="section-heading">
              <div><h2>O que dizem os pacientes.</h2></div>
              <p>Depoimentos de pacientes publicados no Google e nos canais da clínica. Experiências individuais não substituem avaliação médica.</p>
            </div>
            <div className="quotes-grid">
              {p.quotes.map(([text, author]) => <blockquote key={author}><p>{text}</p><footer>{author}</footer></blockquote>)}
            </div>
          </div>
        </section>}
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
