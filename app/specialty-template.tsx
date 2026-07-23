import type { ReactNode } from "react";
/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, CtaBand, Footer, Header, portraitSrcSet } from "./ui";
import { whatsappHref } from "./clinic-links";

export type Specialty = { eyebrow:string; title:string; lead:string; introTitle:string; intro:string[]; topics:[string,string][]; process:[string,string][]; doctor:string; credential:string; doctorText:string; doctorImage:string; faq:[string,string][]; related:[string,string][] };

export function SpecialtyTemplate({data, path, children}:{data:Specialty; path?:string; children?:ReactNode}) {
  const specialty = path?.replace(/^\//, "");
  const schema = path ? {
    "@context":"https://schema.org","@type":"MedicalWebPage",
    name:data.title,description:data.lead,inLanguage:"pt-BR",
    url:`https://clinicaqara.com.br${path}`,mainEntityOfPage:`https://clinicaqara.com.br${path}`,
    about:{"@type":"MedicalSpecialty",name:data.eyebrow},
    author:{"@type":"Physician",name:data.doctor,medicalSpecialty:data.doctor==="Dr. Fabrício de Andrade"?["Dermatology","Pediatrics"]:"Dermatology",identifier:data.credential.split(" · "),worksFor:{"@type":"MedicalClinic",name:"Clínica QARA",url:"https://clinicaqara.com.br"}},
  } : null;
  const faqSchema = path ? {
    "@context":"https://schema.org","@type":"FAQPage",
    mainEntity:data.faq.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}})),
  } : null;
  return <>{schema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>}{faqSchema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>}<Header current={path}/><main id="conteudo">
  <section className="specialty-hero" data-conversion-event="specialty_view" data-conversion-placement="hero" data-conversion-context="specialty" data-conversion-specialty={specialty}><Breadcrumb trail={[[data.eyebrow, ""]]}>{data.eyebrow}</Breadcrumb><div className="shell specialty-hero-grid"><div><p className="kicker">{data.eyebrow}</p><h1>{data.title}</h1><p className="lead">{data.lead}</p><div className="actions"><a className="button craft-primary" href={whatsappHref(`Olá, gostaria de consultar horários para uma avaliação de ${data.eyebrow}.`)} data-conversion-event="whatsapp_click" data-conversion-placement="hero" data-conversion-variant="schedule" data-conversion-context="specialty" data-conversion-specialty={specialty}>Consultar horários</a><a className="quiet-link" href="#atendimentos">Ver condições atendidas ↓</a></div></div><div className={`specialty-portrait portrait-${data.doctor.split(" ")[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`}><img src={data.doctorImage} srcSet={portraitSrcSet[data.doctorImage]} sizes={portraitSrcSet[data.doctorImage] && "(max-width: 900px) 100vw, 45vw"} width={1000} height={1400} fetchPriority="high" alt={`${data.doctor}, dermatologista da Clínica QARA`}/></div></div></section>
  <section className="section shell intro-split"><div><h2>{data.introTitle}</h2></div><div>{data.intro.map(p=><p key={p}>{p}</p>)}</div></section>
  <section className="specialty-soft" id="atendimentos"><div className="shell section"><div className="editorial-heading"><div><h2>Condições atendidas nesta especialidade.</h2></div><p>Exames e tratamentos são indicados somente após a consulta e variam conforme o diagnóstico, a saúde e os objetivos de cada paciente.</p></div><div className="procedure-list">{data.topics.map(([t,p])=><article key={t}><div><h3>{t}</h3><p>{p}</p></div></article>)}</div></div></section>
  <section className="section shell care-process"><div><h2>Da queixa ao plano de tratamento.</h2></div><ol>{data.process.map(([t,p],i)=><li key={t}><b>{String(i+1).padStart(2,"0")}</b><div><h3>{t}</h3><p>{p}</p></div></li>)}</ol></section>
  <section className="doctor-band"><div className="shell doctor-band-grid"><div className={`doctor-band-photo portrait-${data.doctor.split(" ")[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`}><img src={data.doctorImage} srcSet={portraitSrcSet[data.doctorImage]} sizes={portraitSrcSet[data.doctorImage] && "(max-width: 900px) 100vw, 40vw"} width={1000} height={1400} alt={data.doctor} loading="lazy" decoding="async"/></div><div><p className="kicker light">Profissional desta área</p><h2>{data.doctor}</h2><p className="credential-light">{data.credential}</p><p>{data.doctorText}</p><a href={`/equipe/${data.doctor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\./g,"").replace(/\s+/g,"-")}`}>Conhecer formação e áreas de atuação →</a></div></div></section>
  {children}
  <section className="section shell specialty-faq"><div><h2>O que saber antes de agendar.</h2></div><div className="practical-list">{data.faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
  <section className="related-reading shell"><h2>Leia mais sobre estas condições.</h2><div>{data.related.map(([t,u])=><a href={u} key={u}>{t}<span>→</span></a>)}</div></section>
  <CtaBand/>
  </main><Footer/></> }
