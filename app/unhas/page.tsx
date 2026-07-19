import type {Metadata} from "next"; import {SpecialtyTemplate} from "../specialty-template"; import {specialties} from "../specialties-data";
export const metadata:Metadata={title:"Dermatologista Especialista em Unhas no RJ | QARA",description:"Avaliação de micose, unha encravada, psoríase ungueal, tumores e cirurgia das unhas em Copacabana.",alternates:{canonical:"/unhas"}}; export default function Page(){return <SpecialtyTemplate data={specialties.unhas} path="/unhas">
  <section className="section shell treatment-feature">
    <div>
      <h2>Podologia integrada ao cuidado médico das unhas.</h2>
      <p>A equipe conta com a podologista Regina Azevedo para cuidados podológicos de apoio, como o manejo de calosidades, espessamentos e desconfortos ao caminhar.</p>
      <p>O trabalho acontece de forma integrada: alterações que sugerem doença da unha ou da pele são avaliadas pelo dermatologista, e os cuidados podológicos complementam o tratamento quando indicados.</p>
    </div>
    <div className="treatment-photo"><img src="/images/podologa-regina.webp" alt="Regina Azevedo, podologista da Clínica QARA" width={892} height={1024} style={{objectPosition:"center 12%"}} loading="lazy" decoding="async" /></div>
  </section>
</SpecialtyTemplate>}
