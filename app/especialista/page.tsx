import { Breadcrumb, CtaBand, Footer, Header, PhotoPlaceholder, SectionHeading } from "../ui";

export default function SpecialistWireframe() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb>Equipe / Dr. Diego Gálvez</Breadcrumb>
        <section className="profile-hero shell">
          <PhotoPlaceholder label="Retrato profissional do Dr. Diego" variant="profile-photo" />
          <div>
            <p className="eyebrow">Dermatologista e cirurgião dermatológico</p>
            <h1>Dr. Diego Gálvez</h1>
            <p className="credential">CRM-RJ 52-0112387-4 · RQE 57517</p>
            <p className="lead">Atuação em dermatologia clínica e cirurgia dermatológica, com foco em diagnóstico preciso, planejamento seguro e acompanhamento próximo.</p>
            <div className="actions"><a className="button button-primary" href="#agendar">Agendar consulta</a><a className="button button-secondary" href="#atuacao">Áreas de atuação</a></div>
            <ul className="profile-facts"><li>Português, espanhol e inglês</li><li>Atendimento presencial e telemedicina</li><li>Fundador da Clínica QARA</li></ul>
          </div>
        </section>

        <section className="soft-section" id="atuacao">
          <div className="section shell">
            <SectionHeading eyebrow="Áreas de atuação" title="Atendimento clínico e cirúrgico individualizado." text="Os cartões direcionam para páginas completas e para mensagens de agendamento específicas." />
            <div className="focus-grid">
              <article><h3>Cirurgia dermatológica</h3><p>Excisão de lesões, reconstruções, retalhos, enxertos e acompanhamento pós-operatório.</p><a href="/servico">Conhecer atendimento →</a></article>
              <article><h3>Câncer de pele</h3><p>Avaliação, biópsia, planejamento cirúrgico e controle de margens quando indicado.</p><a href="/servico">Conhecer atendimento →</a></article>
              <article><h3>Biópsias</h3><p>Investigação de doenças da pele, das unhas e do couro cabeludo.</p><a href="/servico">Conhecer atendimento →</a></article>
              <article><h3>Dermatologia clínica</h3><p>Avaliação integral da pele, cabelos e unhas, com dermatoscopia quando necessária.</p><a href="/servico">Conhecer atendimento →</a></article>
            </div>
          </div>
        </section>

        <section className="section shell biography-grid">
          <div><p className="eyebrow">Formação e experiência</p><h2>Trajetória dedicada à dermatologia e à cirurgia da pele.</h2></div>
          <div className="timeline"><article><span>Formação</span><h3>Dermatologia</h3><p>Instituto Professor Rubem David Azulay.</p></article><article><span>Aperfeiçoamento</span><h3>Cirurgia Dermatológica</h3><p>Santa Casa do Rio de Janeiro.</p></article><article><span>Atuação</span><h3>Clínica QARA</h3><p>Fundador e integrante da equipe médica em Copacabana.</p></article></div>
        </section>

        <section className="section shell proof-grid">
          <div><p className="eyebrow">Avaliações verificadas</p><h2>Experiência relatada pelos pacientes.</h2></div>
          <blockquote><p>“Espaço reservado para depoimento verificado, preservando a linguagem original e identificando a plataforma de origem.”</p><footer>Paciente verificado · Doctoralia</footer></blockquote>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
