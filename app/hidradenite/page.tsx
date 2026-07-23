import type {Metadata} from "next"; import {SpecialtyTemplate} from "../specialty-template"; import {specialties} from "../specialties-data";
export const metadata:Metadata={title:"Hidradenite Supurativa: Tratamento Clínico e Cirúrgico | QARA",description:"Diagnóstico e tratamento em equipe da hidradenite supurativa, do manejo clínico à cirurgia, em Copacabana, no Rio de Janeiro.",alternates:{canonical:"/hidradenite"},openGraph:{title:"Hidradenite Supurativa: Tratamento Clínico e Cirúrgico | QARA",description:"Diagnóstico e tratamento em equipe da hidradenite supurativa, do manejo clínico à cirurgia, em Copacabana, no Rio de Janeiro.",images:[{url:"/images/dra-manuela.webp",width:852,height:1280,alt:"Dra. Manuela Pedretti, dermatologista da Clínica QARA"}]}};

const feature = (
  <section className="section shell treatment-feature">
    <div>
      <h2>O estágio orienta a escolha do tratamento.</h2>
      <p>Quanto mais cedo a doença é identificada e classificada, maior a chance de conter sua progressão e reduzir a formação de cicatrizes e trajetos mais complexos. A avaliação inclui a classificação da gravidade do quadro, que orienta a escolha entre tratamento clínico, cirúrgico ou a combinação dos dois — e evita que o paciente circule por anos entre diagnósticos equivocados.</p>
    </div>
    <div className="treatment-photo treatment-photo-diagram"><img src="/images/hidradenite/estagios-hs.webp" srcSet="/images/hidradenite/estagios-hs-640.webp 640w, /images/hidradenite/estagios-hs.webp 704w" sizes="(max-width: 900px) 100vw, 50vw" width={704} height={1024} alt="Diagrama dos estágios de gravidade da hidradenite supurativa, de leve a grave" loading="lazy" decoding="async" /></div>
  </section>
);

export default function Page(){return <SpecialtyTemplate data={specialties["hidradenite"]} path="/hidradenite" feature={feature}>
  <section className="section shell treatment-feature treatment-feature-reverse">
    <div>
      <h2>Onde as lesões costumam aparecer.</h2>
      <p>As áreas de dobra concentram a maior parte dos casos: axilas, virilhas, região glútea e a região sob as mamas. Reconhecer esse padrão de localização ajuda a diferenciar a hidradenite de furúnculos isolados e de infecções de repetição.</p>
      <p>O diagrama é ilustrativo. A distribuição das lesões varia entre pacientes e é confirmada no exame dermatológico.</p>
    </div>
    <div className="treatment-photo treatment-photo-diagram"><img src="/images/hidradenite/localizacoes-comuns.webp" srcSet="/images/hidradenite/localizacoes-comuns-640.webp 640w, /images/hidradenite/localizacoes-comuns.webp 776w" sizes="(max-width: 900px) 100vw, 50vw" width={776} height={885} alt="Diagrama das localizações mais comuns da hidradenite supurativa: axilas, virilhas e região glútea" loading="lazy" decoding="async" /></div>
  </section>
</SpecialtyTemplate>}
