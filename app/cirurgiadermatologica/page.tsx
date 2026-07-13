import type { Metadata } from "next";
import { CtaBand, Footer, Header } from "../ui";

export const metadata: Metadata = {
  title: "Cirurgia Dermatológica em Copacabana | Clínica QARA",
  description: "Biópsias, remoção de lesões, cistos, lipomas e tratamento cirúrgico do câncer da pele com Dr. Diego Gálvez na Clínica QARA.",
};

const procedures = [
  ["Biópsias", "Pele, couro cabeludo e unhas para investigação diagnóstica e análise histopatológica."],
  ["Pintas e lesões benignas", "Avaliação dermatoscópica e retirada de nevos, verrugas e outras lesões quando indicada."],
  ["Cistos e lipomas", "Planejamento cirúrgico individualizado para remoção de lesões do tecido subcutâneo."],
  ["Tumores e câncer da pele", "Tratamento de carcinoma basocelular, espinocelular e melanoma, conforme diagnóstico e estadiamento."],
  ["Retalhos e enxertos", "Técnicas de reconstrução para preservar função e favorecer o fechamento após retirada de lesões."],
  ["Cirurgia corretiva", "Correção de cicatrizes, fenda de lóbulo e outras alterações avaliadas individualmente."],
];

export default function SurgeryPage() {
  return <><Header /><main id="conteudo">
    <section className="specialty-hero specialty-hero-dark"><div className="shell specialty-hero-grid"><div><p className="kicker light">Cirurgia dermatológica · Copacabana</p><h1>Avaliação, retirada de lesões e reconstrução da pele.</h1><p className="lead">Biópsias e cirurgias da pele, do couro cabeludo e das unhas, com planejamento e acompanhamento da cicatrização.</p><div className="actions"><a className="button button-light" href="https://wa.me/5521992189718?text=Olá%2C%20gostaria%20de%20consultar%20horários%20para%20uma%20avaliação%20de%20cirurgia%20dermatológica.">Consultar horários</a><a className="button button-outline-light" href="#procedimentos">Ver procedimentos realizados</a></div></div><div className="specialty-portrait"><img src="/images/dr-diego.webp" alt="Dr. Diego Gálvez, dermatologista e cirurgião dermatológico" width={1351} height={1672} fetchPriority="high" /></div></div></section>

    <section className="section shell intro-split"><div><p className="kicker">Cirurgia da pele</p><h2>Do diagnóstico ao tratamento, com acompanhamento próximo.</h2></div><div><p>A cirurgia dermatológica abrange procedimentos realizados na pele e no tecido subcutâneo. Pode ser indicada para esclarecer diagnósticos, tratar lesões benignas ou malignas e reconstruir a área operada.</p><p>A técnica depende do diagnóstico, localização, tamanho da lesão e condições clínicas. Por isso, a consulta e o planejamento individual são etapas essenciais.</p></div></section>

    <section className="specialty-soft" id="procedimentos"><div className="shell section"><div className="editorial-heading"><div><p className="kicker">Áreas de atendimento</p><h2>Procedimentos realizados.</h2></div><p>A indicação é definida somente após avaliação médica. Nem toda lesão precisa ser removida e procedimentos diferentes exigem preparos distintos.</p></div><div className="procedure-list">{procedures.map(([title,text],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="section shell care-process"><div><p className="kicker">Como funciona</p><h2>Quatro etapas para uma decisão segura.</h2></div><ol><li><b>01</b><div><h3>Consulta e dermatoscopia</h3><p>Avaliação da lesão, histórico, sintomas, medicamentos e condições clínicas relevantes.</p></div></li><li><b>02</b><div><h3>Definição diagnóstica</h3><p>Solicitação de biópsia ou exames complementares quando necessários.</p></div></li><li><b>03</b><div><h3>Planejamento</h3><p>Explicação da técnica, anestesia, cicatriz esperada, análise histopatológica e recuperação.</p></div></li><li><b>04</b><div><h3>Procedimento e acompanhamento</h3><p>Orientações pré e pós-operatórias e seguimento da cicatrização.</p></div></li></ol></section>

    <section className="doctor-band"><div className="shell doctor-band-grid"><div className="doctor-band-photo"><img src="/images/dr-diego.webp" alt="Dr. Diego Gálvez" width={1351} height={1672} loading="lazy" decoding="async" /></div><div><p className="kicker light">Especialista responsável</p><h2>Dr. Diego Gálvez</h2><p className="credential-light">CRM-RJ 52-0112387-4 · RQE 57517</p><p>Dermatologista com formação no Instituto Professor Rubem David Azulay e pós-graduação em Cirurgia Dermatológica pela Santa Casa do Rio de Janeiro. Fundador da Clínica QARA e membro da SBD e SBCD.</p><a href="/especialista">Conhecer formação e áreas de atuação →</a></div></div></section>

    <section className="section shell specialty-faq"><div><p className="kicker">Perguntas frequentes</p><h2>Antes do procedimento.</h2></div><div className="practical-list"><details><summary>A cirurgia é feita com anestesia?</summary><p>Muitos procedimentos dermatológicos são realizados com anestesia local. A técnica anestésica e o local do procedimento dependem da complexidade do caso.</p></details><details><summary>Toda lesão retirada precisa de análise?</summary><p>O médico define quando a análise histopatológica é necessária. Em lesões suspeitas ou retiradas para diagnóstico, ela costuma ser parte importante da investigação.</p></details><details><summary>Quanto tempo dura a recuperação?</summary><p>Varia conforme o procedimento, localização e extensão. As orientações sobre curativos, atividade física e retorno são individualizadas.</p></details><details><summary>É possível solicitar reembolso?</summary><p>O atendimento é particular. A clínica emite nota fiscal e documentos médicos para solicitação de reembolso, conforme as regras do plano.</p></details></div></section>
    <CtaBand />
  </main><Footer /></>;
}
