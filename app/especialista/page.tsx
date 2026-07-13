/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Breadcrumb, CtaBand, Footer, Header, SectionHeading } from "../ui";

export default function SpecialistPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb>Equipe / Dr. Diego Gálvez</Breadcrumb>
        <section className="profile-hero shell">
          <div className="profile-photo"><img src="/images/dr-diego.webp" width={1351} height={1672} fetchPriority="high" alt="Dr. Diego Gálvez, dermatologista e cirurgião dermatológico" /></div>
          <div>
            <p className="eyebrow">Dermatologista e cirurgião dermatológico</p>
            <h1>Dr. Diego Gálvez</h1>
            <p className="credential">CRM-RJ 52-0112387-4 · RQE 57517</p>
            <p className="lead">Atuação em dermatologia clínica e cirurgia dermatológica, com foco em diagnóstico preciso, planejamento seguro e acompanhamento próximo.</p>
            <div className="actions"><a className="button button-primary" href="https://wa.me/5521992189718?text=Olá%2C%20gostaria%20de%20consultar%20horários%20com%20o%20Dr.%20Diego.">Consultar horários</a><a className="button button-secondary" href="#atuacao">Ver áreas de atuação</a></div>
            <ul className="profile-facts"><li>Português, espanhol e inglês</li><li>Atendimento presencial e telemedicina</li><li>Fundador da Clínica QARA</li></ul>
          </div>
        </section>

        <section className="soft-section" id="atuacao">
          <div className="section shell">
            <SectionHeading eyebrow="Áreas de atuação" title="Dermatologia clínica e cirurgia da pele." text="Veja em quais situações o Dr. Diego atua e acesse a página com informações completas sobre cada atendimento." />
            <div className="focus-grid">
              <article><h3>Cirurgia dermatológica</h3><p>Retirada de lesões, reconstruções, retalhos, enxertos e acompanhamento pós-operatório.</p><Link href="/cirurgiadermatologica">Ver cirurgia dermatológica →</Link></article>
              <article><h3>Câncer da pele</h3><p>Avaliação, biópsia, planejamento cirúrgico e controle de margens quando indicado.</p><Link href="/cirurgiadermatologica">Ver tratamento cirúrgico →</Link></article>
              <article><h3>Biópsias</h3><p>Coleta de amostras da pele, das unhas ou do couro cabeludo para esclarecer o diagnóstico.</p><Link href="/blog/biopsia-de-pele-quando-e-indicada">Entender quando a biópsia é indicada →</Link></article>
              <article><h3>Dermatologia clínica</h3><p>Avaliação de sintomas e lesões da pele, com dermatoscopia quando necessária.</p><Link href="/dermatologia-clinica">Ver dermatologia clínica →</Link></article>
            </div>
          </div>
        </section>

        <section className="section shell biography-grid">
          <div><p className="eyebrow">Formação e experiência</p><h2>Trajetória dedicada à dermatologia e à cirurgia da pele.</h2></div>
          <div className="timeline"><article><span>Formação</span><h3>Dermatologia</h3><p>Instituto Professor Rubem David Azulay.</p></article><article><span>Aperfeiçoamento</span><h3>Cirurgia Dermatológica</h3><p>Santa Casa do Rio de Janeiro.</p></article><article><span>Atuação</span><h3>Clínica QARA</h3><p>Fundador e integrante da equipe médica em Copacabana.</p></article></div>
        </section>

        <section className="section shell proof-grid">
          <div><p className="eyebrow">Como é o atendimento</p><h2>Informação antes de qualquer decisão.</h2></div>
          <blockquote><p>Na consulta, você recebe explicações sobre as hipóteses diagnósticas, os exames necessários, as opções de tratamento e o acompanhamento esperado.</p><footer>Clínica QARA · Atendimento individualizado</footer></blockquote>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
