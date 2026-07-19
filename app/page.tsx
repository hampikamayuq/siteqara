import { CtaBand, Footer, Header } from "./ui";
import Link from "next/link";
import { articles } from "./blog/articles";

const services = [
  ["Dermatologia clínica", "Acne, rosácea, manchas, alergias e avaliação de pintas.", "/dermatologia-clinica"],
  ["Cirurgia dermatológica", "Biópsias, retirada de lesões e reconstruções da pele.", "/cirurgia-dermatologica"],
  ["Cabelos e couro cabeludo", "Queda capilar, alopecias, doenças do couro cabeludo e transplante.", "/cabelo"],
  ["Doenças das unhas", "Micose, unha encravada, inflamações, tumores e cirurgia ungueal.", "/unhas"],
  ["Doenças inflamatórias", "Psoríase, dermatite atópica, hidradenite e doenças autoimunes.", "/doencas-inflamatorias"],
  ["Dermatopediatria", "Avaliação dermatológica para bebês, crianças e adolescentes.", "/dermatopediatria"],
  ["Dermatologia estética", "Planejamento individualizado para saúde, textura e qualidade da pele.", "/dermatologia-estetica"],
];

const specialists = [
  ["Dr. Miguel Ceccarelli", "Unhas e dermatologia estética", "miguel", "/images/dr-miguel.webp"],
  ["Dr. Diego Gálvez", "Dermatologia e cirurgia dermatológica", "diego", "/images/dr-diego.webp"],
  ["Dra. Diana Stohmann", "Tricologia e transplante capilar", "diana", "/images/dra-diana.webp"],
  ["Dra. Manuela Pedretti", "Psoríase e doenças inflamatórias", "manuela", "/images/dra-manuela.webp"],
];

const slugs: Record<string, string> = { miguel: "dr-miguel-ceccarelli", diego: "dr-diego-galvez", diana: "dra-diana-stohmann", manuela: "dra-manuela-pedretti" };
const mapsUrl = "https://www.google.com/maps/place/Cl%C3%ADnica+QARA/@-22.9717237,-43.1869868,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICp1ZzO9gE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWk7XCEk_ldeGIZtGX3qU8zThjkRR2ad_TBZKBkw__YmLZFe_DtY4LgKFZeJDTGGjn9BY08aCcZ6unD4N0-P0OhzvwFHdET6ERnxEZLmE2IbXttr0APMBhGNGPpJM-_HxSN4u6AY%3Dw128-h86-k-no!7i3870!8i2583!4m7!3m6!1s0x9bd5c690781749:0xd8efa1efc0385245!8m2!3d-22.9716311!4d-43.1868668!10e5!16s%2Fg%2F11v6b1n885?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D";

function LineIcon({ type }: { type: string }) {
  const paths: Record<string, string> = { skin: "M12 3c-4 2-6 6-5 10s5 7 5 7 4-3 5-7-3-7-9-7Z", book: "M12 6c-2-1.4-5-1.4-8 0v12c3-1.4 6-1.4 8 0 2-1.4 5-1.4 8 0V6c-3-1.4-6-1.4-8 0v12", heart: "M12 20c-5-3.5-8-6.5-8-10a4.5 4.5 0 0 1 8-2.6A4.5 4.5 0 0 1 20 10c0 3.5-3 6.5-8 10Z", shield: "M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6Z" };
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[type]} /></svg>;
}

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Clínica QARA",
  description: "Clínica dermatológica em Copacabana: dermatologia clínica e cirúrgica, cabelos, unhas, doenças inflamatórias, dermatopediatria e dermatologia estética.",
  url: "https://clinicaqara.com.br",
  image: "https://clinicaqara.com.br/images/qara-atendimento.webp",
  telephone: "+55-21-99218-9718",
  medicalSpecialty: "Dermatology",
  identifier: "CRM-RJ 1285041",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Santa Clara, 50 — salas 521/522",
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  email: "contato@clinicaqara.com.br",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "13:00" },
  ],
  areaServed: "Copacabana, Rio de Janeiro",
  availableLanguage: ["pt-BR", "es", "en"],
};

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }} />
    <Header />
    <main id="conteudo">
      <section className="craft-hero">
        <div className="shell craft-hero-inner">
          <div className="craft-hero-copy">
            <p className="kicker">Clínica QARA · Copacabana</p>
            <h1>Conhecimento que cuida.<br />Presença que transforma.</h1>
            <span className="hero-rule" aria-hidden="true" />
            <p className="lead">Dermatologia clínica e cirúrgica com precisão técnica e sensibilidade humana para cuidar do que há de mais autêntico em você.</p>
            <div className="actions">
              <a className="button craft-primary" href="https://wa.me/5521992189718?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Cl%C3%ADnica%20QARA.">Agendar pelo WhatsApp</a>
              <a className="quiet-link" href="#cuidados">Ver especialidades <span>↓</span></a>
            </div>
          </div>
          <div className="hero-image"><img src="/images/qara-atendimento.webp" srcSet="/images/qara-atendimento-640.webp 640w, /images/qara-atendimento-1024.webp 1024w, /images/qara-atendimento.webp 1460w" sizes="(max-width: 900px) 100vw, 55vw" alt="Dermatologista da Clínica QARA examina paciente com dermatoscópio" width={1460} height={973} fetchPriority="high" /></div>
          <svg className="contour" viewBox="0 0 240 520" aria-hidden="true"><path d="M168 0c-48 52-39 107-11 137 29 31 1 67-41 93-74 47-82 118-36 150 53 36 86 72 53 140" /></svg>
        </div>
      </section>

      <section className="assurance-bar" aria-label="Informações essenciais"><div className="shell"><p><strong>Copacabana</strong><span>Rua Santa Clara, próximo ao metrô</span></p><p><strong>Atendimento particular</strong><span>Nota fiscal e documentação para reembolso</span></p><p><strong>Português, espanhol e inglês</strong><span>Conforme disponibilidade do profissional</span></p></div></section>

      <section className="journey-section" id="jornada"><div className="shell journey-grid"><div><h2>Uma consulta organizada para compreender antes de tratar.</h2><p>A avaliação relaciona sintomas, histórico, exame dermatológico e, quando necessário, exames complementares.</p></div><ol><li><b>1</b><div><h3>Escuta e avaliação</h3><p>Você conta o que percebe, há quanto tempo e o que já tentou. O médico examina a pele, os cabelos ou as unhas.</p></div></li><li><b>2</b><div><h3>Diagnóstico e investigação</h3><p>As hipóteses são explicadas. Dermatoscopia, tricoscopia, exames laboratoriais ou biópsia podem ser indicados.</p></div></li><li><b>3</b><div><h3>Plano e acompanhamento</h3><p>Benefícios, limites, riscos e alternativas orientam uma decisão compartilhada e o acompanhamento da evolução.</p></div></li></ol></div></section>

      <section className="care-strip" id="cuidados">
        <div className="shell care-grid">
          <div className="care-intro"><h2>Encontre a área adequada para sua necessidade.</h2><p>Se houver dúvida, conte brevemente sua queixa pelo WhatsApp e nossa equipe orienta a escolha do profissional.</p></div>
          <div className="care-list">{services.map(([title,text,href]) => <Link className="care-item" href={href} key={title}><div><h3>{title}</h3><p>{text}</p></div><b aria-hidden="true">→</b></Link>)}</div>
        </div>
      </section>

      <section className="precision-section">
        <div className="shell precision-grid">
          <div className="precision-intro"><h2>Precisão técnica.<br />Cuidado integral.<br />Decisões seguras.</h2><span className="dark-rule" /><p>Ciência, tecnologia e experiência para oferecer tratamentos individualizados, sempre com ética, segurança e naturalidade.</p></div>
          <div className="principles">
            <article><LineIcon type="skin" /><h3>Abordagem individualizada</h3><p>Cada pele, história e objetivo são únicos.</p></article>
            <article><LineIcon type="book" /><h3>Atualização científica</h3><p>Condutas baseadas em evidências e avaliação cuidadosa.</p></article>
            <article><LineIcon type="heart" /><h3>Presença em todas as etapas</h3><p>O especialista que investiga seu caso é o mesmo que acompanha a evolução, com hora marcada e canal direto de resposta.</p></article>
            <article><LineIcon type="shield" /><h3>Segurança em primeiro lugar</h3><p>Estrutura e protocolos para consultas e procedimentos.</p></article>
          </div>
        </div>
      </section>

      <section className="section shell" id="especialistas">
        <div className="specialist-lead"><div><p className="kicker">Corpo clínico</p><h2>Nossos especialistas</h2><p>Conheça a formação e a principal área de atuação de cada dermatologista.</p></div>
        <div className="craft-specialists">
          {specialists.map(([name,area,key,src]) => <article key={name}>
            <div className={`doctor-image doctor-${key}`}><img src={src} alt={`Retrato profissional de ${name}`} width={1000} height={1300} loading="lazy" decoding="async" /></div>
            <h3>{name}</h3><p>{area}</p><a href={`/equipe/${slugs[key]}`}>Conheça o especialista <span>→</span></a>
          </article>)}
        </div></div>
      </section>

      <section className="clinic-story" id="clinica">
        <div className="shell clinic-story-grid">
          <div><h2>Atendimento em Copacabana.</h2><span className="light-rule" /><p>Consultórios preparados para consultas dermatológicas e procedimentos com hora marcada.</p><a href="#contato">Ver endereço e contato <span>→</span></a></div>
          <div className="clinic-main"><img src="/images/miguel.webp" srcSet="/images/miguel-640.webp 640w, /images/miguel-1024.webp 1024w, /images/miguel.webp 1920w" sizes="(max-width: 620px) 100vw, (max-width: 900px) 100vw, 60vw" alt="Recepção da Clínica QARA em Copacabana" width={1920} height={1282} loading="lazy" decoding="async" /></div>
          <div className="clinic-detail" aria-hidden="true"><span className="organic-mark" /></div>
        </div>
      </section>


      <section className="home-journal"><div className="shell journal-heading"><div><h2>Informação para entender sinais e decisões.</h2></div><p>Artigos escritos por dermatologistas da Clínica QARA, com autoria médica e referências específicas.</p></div><div className="shell journal-list">{articles.slice(0,3).map(article=><article key={article.slug}><Link className="journal-image" href={`/blog/${article.slug}`}><img src={article.image} alt={article.title} width={1400} height={788} loading="lazy" decoding="async"/></Link><div><span>{article.category} · {article.readTime}</span><h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3><p>{article.description}</p><Link href={`/blog/${article.slug}`}>Ler artigo →</Link></div></article>)}</div><div className="shell journal-all"><Link className="button button-secondary" href="/blog">Ver todos os artigos</Link></div></section>

      <section className="quote-section"><div className="shell"><blockquote><span>“</span><p>Uma boa indicação começa por entender os sintomas, o histórico e o que você espera do tratamento.</p><footer>Dr. Diego Gálvez · Fundador da Clínica QARA</footer></blockquote></div></section>
      <section className="practical-section shell"><div><h2>Informações práticas.</h2></div><div className="practical-list"><details><summary>Qual é o horário de atendimento?</summary><p>A clínica atende de segunda a sexta, das 8h às 21h, e aos sábados, das 8h às 13h, sempre com hora marcada.</p></details><details><summary>Como escolher o especialista?</summary><p>Conte brevemente sua queixa pelo WhatsApp. Nossa equipe indicará o profissional com a área de atuação mais adequada.</p></details><details><summary>A clínica atende planos de saúde?</summary><p>O atendimento é particular. Emitimos nota fiscal e documentos médicos para solicitação de reembolso, conforme as regras do seu plano.</p></details><details><summary>Há atendimento por telemedicina?</summary><p>Alguns casos podem ser avaliados por telemedicina em todo o Brasil. Procedimentos e exames físicos exigem atendimento presencial.</p></details><details><summary>Quais idiomas estão disponíveis?</summary><p>A equipe oferece atendimento em português, espanhol e inglês, conforme disponibilidade do profissional.</p></details></div></section>
      <section className="location-section"><div className="shell location-grid"><div><h2>Copacabana, Rio de Janeiro.</h2><p>Rua Santa Clara, 50 · salas 521/522<br />Próximo ao metrô Siqueira Campos.</p><a href={mapsUrl} target="_blank" rel="noreferrer">Abrir no Google Maps <span>→</span></a></div><a className="map-art" href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Abrir a localização da Clínica QARA no Google Maps"><span><em>QARA</em></span><b>Rua Santa Clara, 50</b></a></div></section>
      <CtaBand />
    </main>
    <Footer />
  </>;
}
