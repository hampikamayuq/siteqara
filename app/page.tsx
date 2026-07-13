import { CtaBand, Footer, Header } from "./ui";

const services = [
  ["○", "Dermatologia clínica", "Pele"],
  ["⌁", "Cirurgia dermatológica", "Procedimentos"],
  ["∿", "Cabelos e unhas", "Tricologia e onicologia"],
];

const careTopics = [
  ["Pele e doenças inflamatórias", "Acne, rosácea, manchas, dermatite atópica, psoríase e hidradenite."],
  ["Lesões e câncer da pele", "Dermatoscopia, investigação de pintas e acompanhamento de lesões suspeitas."],
  ["Biópsias e cirurgias", "Biópsias de pele, cabelo e unhas; retirada de nevos, cistos, lipomas e tumores."],
  ["Cabelos e couro cabeludo", "Investigação da queda capilar, alopecias, doenças do couro cabeludo e transplante."],
  ["Unhas", "Alterações de cor e formato, micose, unha encravada e doenças inflamatórias."],
  ["Dermatologia estética", "Planejamento individualizado com foco em equilíbrio e resultados naturais."],
];

const specialists = [
  ["Dr. Miguel Ceccarelli", "Unhas e dermatologia estética", "miguel", "/images/qara-team.webp"],
  ["Dr. Diego Gálvez", "Dermatologia e cirurgia dermatológica", "diego", "/images/dr-diego.webp"],
  ["Dra. Diana Stohmann", "Tricologia e transplante capilar", "diana", "/images/dra-diana.webp"],
  ["Dra. Manuela Pedretti", "Psoríase e doenças inflamatórias", "manuela", "/images/dra-manuela.webp"],
];

function LineIcon({ type }: { type: string }) {
  const paths: Record<string, string> = { skin: "M12 3c-4 2-6 6-5 10s5 7 5 7 4-3 5-7-3-7-9-7Z", surgery: "m5 19 14-14m-3-2 5 5M3 16l5 5", hair: "M7 20c0-8 2-15 5-17 3 4 5 9 5 17M9 8h6" };
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[type]} /></svg>;
}

export default function Home() {
  return <>
    <Header />
    <main>
      <section className="craft-hero">
        <div className="shell craft-hero-inner">
          <div className="craft-hero-copy">
            <p className="kicker">Clínica QARA · Copacabana</p>
            <h1>Conhecimento que cuida.<br />Presença que transforma.</h1>
            <span className="hero-rule" aria-hidden="true" />
            <p className="lead">Dermatologia clínica e cirúrgica com precisão técnica e sensibilidade humana para cuidar do que há de mais autêntico em você.</p>
            <div className="actions">
              <a className="button craft-primary" href="https://wa.me/5521992189718">Agendar pelo WhatsApp</a>
              <a className="quiet-link" href="#cuidados">Encontre o cuidado certo <span>↓</span></a>
            </div>
          </div>
          <div className="hero-image"><img src="/images/qara-atendimento.webp" alt="Atendimento dermatológico na Clínica QARA" width={1920} height={1280} fetchPriority="high" /></div>
          <svg className="contour" viewBox="0 0 240 520" aria-hidden="true"><path d="M168 0c-48 52-39 107-11 137 29 31 1 67-41 93-74 47-82 118-36 150 53 36 86 72 53 140" /></svg>
        </div>
      </section>

      <section className="care-strip" id="cuidados">
        <div className="shell care-grid">
          <div><h2>Nossas<br />especialidades</h2></div>
          {services.map(([,title,text], index) => <a className="care-item" href={["/servico","/cirurgiadermatologica","/cabelo"][index]} key={title}>
            <LineIcon type={["skin","surgery","hair"][index]} /><small>{text}</small><h3>{title}</h3><b aria-hidden="true">→</b>
          </a>)}
        </div>
      </section>

      <section className="precision-section">
        <div className="shell precision-grid">
          <div className="precision-intro"><p className="kicker light">Nossa forma de cuidar</p><h2>Precisão técnica.<br />Cuidado integral.<br />Decisões seguras.</h2><span className="dark-rule" /><p>Ciência, tecnologia e experiência para oferecer tratamentos individualizados, sempre com ética, segurança e naturalidade.</p></div>
          <div className="principles">
            <article><LineIcon type="skin" /><h3>Abordagem individualizada</h3><p>Cada pele, história e objetivo são únicos.</p></article>
            <article><LineIcon type="surgery" /><h3>Atualização científica</h3><p>Condutas baseadas em evidências e avaliação cuidadosa.</p></article>
            <article><LineIcon type="hair" /><h3>Cuidado que acolhe</h3><p>Escuta ativa e presença em todas as etapas.</p></article>
            <article><LineIcon type="skin" /><h3>Segurança em primeiro lugar</h3><p>Estrutura e protocolos para consultas e procedimentos.</p></article>
          </div>
        </div>
      </section>

      <section className="section shell" id="especialistas">
        <div className="specialist-lead"><div><p className="kicker">Corpo clínico</p><h2>Nossos<br />especialistas</h2><p>Dermatologistas com formações complementares, unidos por uma visão cuidadosa e individualizada.</p><a href="#especialistas">Conheça a equipe <span>→</span></a></div>
        <div className="craft-specialists">
          {specialists.map(([name,area,key,src]) => <article key={name}>
            <div className={`doctor-image doctor-${key}`}><img src={src} alt={`Retrato profissional de ${name}`} width={1000} height={1300} loading="lazy" decoding="async" /></div>
            <h3>{name}</h3><p>{area}</p><a href={key === "diego" ? "/especialista" : `https://wa.me/5521992189718?text=${encodeURIComponent(`Olá, gostaria de agendar uma consulta com ${name}.`)}`}>{key === "diego" ? "Conheça o especialista" : "Agendar com o especialista"} <span>→</span></a>
          </article>)}
        </div></div>
      </section>

      <section className="clinic-story">
        <div className="shell clinic-story-grid">
          <div><p className="kicker light">Nossa clínica</p><h2>Um espaço feito para acolher.</h2><span className="light-rule" /><p>Ambientes pensados para oferecer conforto, privacidade e bem-estar durante consultas e procedimentos.</p><a href="#contato">Conheça a clínica <span>→</span></a></div>
          <div className="clinic-main"><img src="/images/miguel.webp" alt="Recepção da Clínica QARA em Copacabana" width={1920} height={1282} loading="lazy" decoding="async" /></div>
          <div className="clinic-detail" aria-hidden="true"><span className="organic-mark" /></div>
        </div>
      </section>

      <section className="information-section shell">
        <div className="information-intro"><p className="kicker">Atendimento completo</p><h2>Da primeira avaliação ao acompanhamento.</h2><p>Comece pela sua queixa. Nossa equipe ajuda a direcionar o atendimento para o profissional mais adequado.</p></div>
        <div className="topic-list">{careTopics.map(([title,text],i) => <article key={title}><span>{String(i+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className="quote-section"><div className="shell"><blockquote><span>“</span><p>Entender sua necessidade é o primeiro passo para indicar o cuidado certo.</p><footer>Clínica QARA · Dermatologia especializada</footer></blockquote></div></section>
      <section className="practical-section shell"><div><p className="kicker">Antes de agendar</p><h2>Informações práticas.</h2></div><div className="practical-list"><details><summary>Como escolher o especialista?</summary><p>Conte brevemente sua queixa pelo WhatsApp. Nossa equipe indicará o profissional com a área de atuação mais adequada.</p></details><details><summary>A clínica atende planos de saúde?</summary><p>O atendimento é particular. Emitimos nota fiscal e documentos médicos para solicitação de reembolso, conforme as regras do seu plano.</p></details><details><summary>Há atendimento por telemedicina?</summary><p>Alguns casos podem ser avaliados por telemedicina em todo o Brasil. Procedimentos e exames físicos exigem atendimento presencial.</p></details><details><summary>Quais idiomas estão disponíveis?</summary><p>A equipe oferece atendimento em português, espanhol e inglês, conforme disponibilidade do profissional.</p></details></div></section>
      <section className="location-section"><div className="shell location-grid"><div><p className="kicker">Onde estamos</p><h2>Copacabana,<br />Rio de Janeiro.</h2><p>Rua Santa Clara, 50 · salas 521/522<br />Próximo ao metrô Siqueira Campos.</p><a href="https://www.google.com/maps/search/?api=1&query=Rua+Santa+Clara+50+Copacabana+Rio+de+Janeiro" target="_blank" rel="noreferrer">Abrir no Google Maps <span>→</span></a></div><a className="map-art" href="https://www.google.com/maps/search/?api=1&query=Rua+Santa+Clara+50+Copacabana+Rio+de+Janeiro" target="_blank" rel="noreferrer" aria-label="Abrir a localização da Clínica QARA no Google Maps"><span>QARA</span><b>Rua Santa Clara, 50</b></a></div></section>
      <CtaBand />
    </main>
    <Footer />
  </>;
}
