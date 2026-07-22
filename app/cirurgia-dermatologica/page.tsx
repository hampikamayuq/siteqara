import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, CtaBand, Footer, Header } from "../ui";

export const metadata: Metadata = {
  title: "Cirurgia Dermatológica em Copacabana | Clínica QARA",
  description: "Biópsias, retirada de pintas, cistos e lipomas e cirurgia do câncer da pele com planejamento individual e análise histopatológica em Copacabana, RJ.",
  alternates: { canonical: "/cirurgia-dermatologica" },
  openGraph: {
    title: "Cirurgia Dermatológica em Copacabana | Clínica QARA",
    description: "Biópsias, retirada de pintas, cistos e lipomas e cirurgia do câncer da pele com planejamento individual e análise histopatológica em Copacabana, RJ.",
    images: [{ url: "/images/dr-diego.webp", width: 1351, height: 1672, alt: "Dr. Diego Gálvez, dermatologista e cirurgião dermatológico da Clínica QARA" }],
  },
};

const procedures = [
  ["Biópsias", "Retirada de pequenos fragmentos de pele, couro cabeludo ou unhas para análise histopatológica — o exame do tecido ao microscópio que ajuda a confirmar o diagnóstico. Costumam ser procedimentos breves, geralmente realizados com anestesia local."],
  ["Pintas e lesões benignas", "Avaliação com dermatoscopia — exame que amplia as estruturas da lesão — para diferenciar nevos (pintas), verrugas e outras lesões benignas daquelas que merecem investigação. A retirada é indicada conforme critérios médicos, avaliados caso a caso."],
  ["Cistos e lipomas", "Nódulos benignos do tecido subcutâneo que podem crescer, inflamar ou incomodar ao longo do tempo. O planejamento cirúrgico considera a localização, o tamanho e as características da lesão, buscando a remoção completa e o fechamento cuidadoso da área."],
  ["Tumores e câncer da pele", "Tratamento cirúrgico de carcinoma basocelular, carcinoma espinocelular e melanoma, definido conforme o diagnóstico e o estadiamento — a avaliação da extensão da doença. A retirada é planejada com margens de segurança, isto é, uma faixa de pele ao redor da lesão, verificadas pela análise histopatológica."],
  ["Retalhos e enxertos", "Técnicas de reconstrução utilizadas quando o fechamento direto da área operada não é possível ou não é o mais adequado. O retalho aproveita a pele vizinha e o enxerto utiliza pele de outra região, com o objetivo de preservar a função e favorecer a cicatrização."],
  ["Cirurgia corretiva", "Correção de cicatrizes, fenda de lóbulo de orelha e outras alterações que causam desconforto funcional ou estético. Cada caso é avaliado individualmente para definir se a cirurgia é indicada e qual técnica costuma ser mais adequada à região e ao tipo de pele."],
];

const faqs: [string, string][] = [
  ["A cirurgia é feita com anestesia?", "Muitos procedimentos dermatológicos são realizados com anestesia local, que adormece apenas a região operada. A técnica anestésica e o local de realização do procedimento dependem da complexidade de cada caso."],
  ["Toda lesão retirada precisa de análise?", "O médico define quando a análise histopatológica — o exame do tecido ao microscópio — é necessária. Em lesões suspeitas ou retiradas para diagnóstico, ela costuma ser parte importante da investigação."],
  ["Quanto tempo dura a recuperação?", "Varia conforme o procedimento, a localização e a extensão da área operada. As orientações sobre curativos, atividade física e retorno às rotinas são individualizadas e revisadas nas consultas de acompanhamento."],
  ["Quais cuidados devo ter com a cicatriz depois da cirurgia?", "Os cuidados variam conforme o procedimento e a região operada, mas costumam incluir manter o curativo conforme orientado, evitar esforço sobre a área e proteger a cicatriz do sol. As recomendações específicas são entregues após o procedimento e revisadas nos retornos."],
  ["Quando o resultado da biópsia fica pronto?", "O prazo é informado no atendimento e varia conforme o laboratório e o tipo de análise. O resultado costuma ser discutido em consulta, para que o laudo seja interpretado no contexto clínico e os próximos passos sejam definidos em conjunto."],
  ["É possível solicitar reembolso?", "O atendimento é particular. A clínica emite nota fiscal e documentos médicos para solicitação de reembolso junto ao convênio, conforme as regras de cada plano."],
];

const schema={"@context":"https://schema.org","@type":"MedicalWebPage",name:"Cirurgia dermatológica",description:"Biópsias, remoção de lesões e tratamento cirúrgico do câncer da pele em Copacabana.",inLanguage:"pt-BR",url:"https://clinicaqara.com.br/cirurgia-dermatologica",mainEntityOfPage:"https://clinicaqara.com.br/cirurgia-dermatologica",about:{"@type":"MedicalSpecialty",name:"Cirurgia dermatológica"},author:{"@type":"Physician",name:"Dr. Diego Gálvez",medicalSpecialty:["Dermatology","Dermatologic Surgery"],identifier:["CRM-RJ 52-0112387-4","RQE 57517"],url:"https://clinicaqara.com.br/equipe/dr-diego-galvez",worksFor:{"@type":"MedicalClinic",name:"Clínica QARA",url:"https://clinicaqara.com.br"}}};

const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};

export default function SurgeryPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/><Header current="/cirurgia-dermatologica" /><main id="conteudo">
    <section className="specialty-hero specialty-hero-dark"><Breadcrumb trail={[["Cirurgia dermatológica", ""]]}>Cirurgia dermatológica</Breadcrumb><div className="shell specialty-hero-grid"><div><p className="kicker light">Cirurgia dermatológica · Copacabana</p><h1>Avaliação, retirada de lesões e reconstrução da pele.</h1><p className="lead">Biópsias e cirurgias da pele, do couro cabeludo e das unhas, com planejamento e acompanhamento da cicatrização.</p><div className="actions"><a className="button button-light" href="https://wa.me/5521992189718?text=Olá%2C%20gostaria%20de%20consultar%20horários%20para%20uma%20avaliação%20de%20cirurgia%20dermatológica.">Consultar horários</a><a className="button button-outline-light" href="#procedimentos">Ver procedimentos realizados</a></div></div><div className="specialty-portrait"><img src="/images/dr-diego.webp" srcSet="/images/dr-diego-640.webp 640w, /images/dr-diego-1024.webp 1024w, /images/dr-diego.webp 1351w" sizes="(max-width: 900px) 100vw, 45vw" alt="Dr. Diego Gálvez, dermatologista e cirurgião dermatológico" width={1351} height={1672} fetchPriority="high" /></div></div></section>

    <section className="section shell intro-split"><div><h2>Do diagnóstico ao tratamento, com acompanhamento próximo.</h2></div><div><p>A cirurgia dermatológica abrange procedimentos realizados na pele, nas unhas e no tecido subcutâneo. Pode ser indicada para esclarecer diagnósticos, tratar lesões benignas ou malignas e reconstruir a área operada.</p><p>Muitos desses procedimentos são realizados com anestesia local, e o paciente recebe orientações sobre preparo, curativos e retorno às atividades — o que costuma tornar a experiência mais tranquila e previsível.</p><p>A técnica depende do diagnóstico, da localização, do tamanho da lesão e das condições clínicas de cada paciente. Por isso, a consulta e o planejamento individual são etapas essenciais antes de qualquer decisão cirúrgica.</p></div></section>

    <section className="specialty-soft" id="procedimentos"><div className="shell section"><div className="editorial-heading"><div><h2>Procedimentos realizados.</h2></div><p>A indicação é definida somente após avaliação médica. Nem toda lesão precisa ser removida e procedimentos diferentes exigem preparos distintos.</p></div><div className="procedure-list">{procedures.map(([title,text])=><article key={title}><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="section shell care-process"><div><h2>Quatro etapas para uma decisão segura.</h2></div><ol><li><b>01</b><div><h3>Consulta e dermatoscopia</h3><p>Avaliação da lesão com dermatoscopia, além do histórico, sintomas, medicamentos em uso e condições clínicas relevantes para a segurança do procedimento.</p></div></li><li><b>02</b><div><h3>Definição diagnóstica</h3><p>Solicitação de biópsia ou exames complementares quando necessários, para que a decisão cirúrgica se apoie em um diagnóstico bem estabelecido.</p></div></li><li><b>03</b><div><h3>Planejamento</h3><p>Explicação da técnica, anestesia, cicatriz esperada, análise histopatológica e recuperação, com espaço para esclarecer dúvidas antes de decidir.</p></div></li><li><b>04</b><div><h3>Procedimento e acompanhamento</h3><p>Orientações pré e pós-operatórias e seguimento da cicatrização em consultas de retorno, com ajustes de cuidado quando necessários.</p></div></li></ol></section>

    <section className="doctor-band"><div className="shell doctor-band-grid"><div className="doctor-band-photo"><img src="/images/dr-diego-terno.webp" alt="Dr. Diego Gálvez" width={825} height={1075} loading="lazy" decoding="async" /></div><div><p className="kicker light">Especialista responsável</p><h2>Dr. Diego Gálvez</h2><p className="credential-light">CRM-RJ 52-0112387-4 · RQE 57517</p><p>Dermatologista com formação no Instituto Professor Rubem David Azulay e pós-graduação em Cirurgia Dermatológica pela Santa Casa do Rio de Janeiro. Fundador da Clínica QARA e membro da SBD e SBCD.</p><Link href="/equipe/dr-diego-galvez">Conhecer formação e áreas de atuação →</Link></div></div></section>

    <section className="section shell specialty-faq"><div><h2>Antes do procedimento.</h2></div><div className="practical-list">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="related-reading shell"><h2>Leia mais sobre estes procedimentos.</h2><div>{([["Biópsia de pele: quando é indicada","/blog/biopsia-de-pele-quando-e-indicada"],["Cistos e lipomas: quando remover","/blog/cistos-e-lipomas-quando-remover"],["Verrugas: tratamento","/blog/verrugas-tratamento"],["Câncer da pele: sinais de alerta","/blog/cancer-da-pele-sinais-de-alerta"],["Mapeamento de pintas","/blog/mapeamento-de-pintas-dermatoscopia-digital"]] as [string,string][]).map(([t,u])=><a href={u} key={u}>{t}<span>→</span></a>)}</div></section>
    <CtaBand />
  </main><Footer /></>;
}
