import { Breadcrumb, CtaBand, Footer, Header, PhotoPlaceholder, SectionHeading } from "../ui";

export default function ServiceWireframe() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb>Cirurgia dermatológica</Breadcrumb>
        <section className="service-hero shell">
          <div>
            <p className="eyebrow">Cirurgia dermatológica em Copacabana</p>
            <h1>Avaliação e tratamento cirúrgico de lesões da pele.</h1>
            <p className="lead">Investigação cuidadosa, planejamento individualizado e acompanhamento antes e depois do procedimento.</p>
            <div className="actions"><a className="button button-primary" href="#agendar">Agendar avaliação</a><a className="button button-secondary" href="#como-funciona">Como funciona</a></div>
          </div>
          <PhotoPlaceholder label="Imagem clínica ou procedimento, sem conteúdo sensível" variant="service-photo" />
        </section>

        <section className="section shell" id="como-funciona">
          <SectionHeading eyebrow="Quando procurar avaliação" title="Situações que merecem investigação especializada." text="O conteúdo orienta sem fazer diagnóstico ou substituir a consulta." />
          <div className="symptom-grid">
            <article><span>01</span><h3>Lesão que cresceu ou mudou</h3><p>Alterações recentes de tamanho, forma, cor ou superfície.</p></article>
            <article><span>02</span><h3>Ferida que não cicatriza</h3><p>Lesões persistentes, com sangramento ou formação recorrente de crosta.</p></article>
            <article><span>03</span><h3>Diagnóstico já confirmado</h3><p>Planejamento para retirada de lesões benignas ou malignas.</p></article>
          </div>
        </section>

        <section className="soft-section">
          <div className="section shell">
            <SectionHeading eyebrow="Jornada de atendimento" title="Como funciona a avaliação cirúrgica." text="A página apresenta o processo com clareza e reduz dúvidas antes do contato." />
            <ol className="process-list">
              <li><strong>01</strong><div><h3>Consulta e dermatoscopia</h3><p>Avaliação da lesão, histórico e condições clínicas relevantes.</p></div></li>
              <li><strong>02</strong><div><h3>Definição diagnóstica</h3><p>Biópsia ou exames complementares quando forem necessários.</p></div></li>
              <li><strong>03</strong><div><h3>Planejamento</h3><p>Discussão da técnica, anestesia, análise histopatológica e recuperação.</p></div></li>
              <li><strong>04</strong><div><h3>Procedimento e acompanhamento</h3><p>Orientações pré e pós-operatórias e seguimento da cicatrização.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="section shell doctor-feature">
          <PhotoPlaceholder label="Foto do especialista responsável" variant="doctor-photo" />
          <div><p className="eyebrow">Especialista responsável</p><h2>Dr. Diego Gálvez</h2><p className="credential">Dermatologista · CRM-RJ 52-0112387-4 · RQE 57517</p><p>Especialização em Dermatologia pelo Instituto Professor Rubem David Azulay e pós-graduação em Cirurgia Dermatológica pela Santa Casa do Rio de Janeiro.</p><a className="text-link" href="/especialista">Conhecer formação e áreas de atuação <span aria-hidden="true">→</span></a></div>
        </section>

        <section className="section shell faq-layout">
          <div><p className="eyebrow">Perguntas frequentes</p><h2>Informações antes da avaliação.</h2></div>
          <div className="faq-list"><details open><summary>Biópsia e retirada são a mesma coisa?</summary><p>Não necessariamente. A indicação depende da hipótese diagnóstica e das características da lesão.</p></details><details><summary>O procedimento é feito na clínica?</summary><p>A possibilidade depende do tipo, tamanho, localização e condições clínicas do paciente.</p></details><details><summary>Como funciona a análise no laboratório?</summary><p>O material pode ser encaminhado para exame anatomopatológico, conforme indicação médica.</p></details></div>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
