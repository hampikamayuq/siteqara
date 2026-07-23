import type {Metadata} from "next"; import {SpecialtyTemplate} from "../specialty-template"; import {specialties} from "../specialties-data";
export const metadata:Metadata={title:"Psoríase: Tratamento Tópico, Oral e Biológico | QARA",description:"Dermatologistas especialistas em psoríase, incluindo psoríase ungueal e do couro cabeludo, com tratamento individualizado em Copacabana.",alternates:{canonical:"/psoriase"},openGraph:{title:"Psoríase: Tratamento Tópico, Oral e Biológico | QARA",description:"Dermatologistas especialistas em psoríase, incluindo psoríase ungueal e do couro cabeludo, com tratamento individualizado em Copacabana.",images:[{url:"/images/dra-manuela.webp",width:852,height:1280,alt:"Dra. Manuela Pedretti, dermatologista da Clínica QARA"}]}};

const feature = (
  <section className="section shell treatment-feature">
    <div>
      <h2>Como as placas se apresentam.</h2>
      <p>As placas costumam ser avermelhadas, bem delimitadas e recobertas por descamação esbranquiçada. A aparência varia conforme a área do corpo e a fase da doença, e áreas como couro cabeludo, unhas e dobras podem exigir avaliação dirigida.</p>
      <p>A imagem é ilustrativa e não substitui o exame dermatológico: quadros semelhantes podem corresponder a diagnósticos diferentes.</p>
    </div>
    <div className="treatment-photo"><img src="/images/psoriase/psoriase-placa-cutanea.webp" srcSet="/images/psoriase/psoriase-placa-cutanea-640.webp 640w, /images/psoriase/psoriase-placa-cutanea.webp 1000w" sizes="(max-width: 900px) 100vw, 50vw" width={1000} height={1000} alt="Placa de psoríase na pele, com descamação característica" loading="lazy" decoding="async" /></div>
  </section>
);

export default function Page(){return <SpecialtyTemplate data={specialties["psoriase"]} path="/psoriase" feature={feature}>
  <section className="section shell specialty-gallery">
    <div className="editorial-heading">
      <div><h2>Do tópico ao injetável, conforme o quadro.</h2></div>
      <p>Na consulta, a avaliação leva em conta a extensão e a localização das lesões, a gravidade dos sintomas e o histórico do paciente para definir um plano terapêutico individualizado. O tratamento pode incluir medicações tópicas, terapias orais, fototerapia ou medicamentos biológicos injetáveis, sempre com acompanhamento contínuo para ajustar a conduta conforme a resposta de cada pessoa.</p>
    </div>
    <div className="specialty-gallery-grid">
      <figure><img src="/images/psoriase/tratamento-topico.webp" srcSet="/images/psoriase/tratamento-topico-640.webp 640w, /images/psoriase/tratamento-topico.webp 1000w" sizes="(max-width: 700px) 90vw, 45vw" width={1000} height={1000} alt="Aplicação de tratamento tópico em lesão de psoríase" loading="lazy" decoding="async" /><figcaption>Tratamento tópico. Imagem ilustrativa.</figcaption></figure>
      <figure><img src="/images/psoriase/tratamento-biologico-injetavel.webp" srcSet="/images/psoriase/tratamento-biologico-injetavel-640.webp 640w, /images/psoriase/tratamento-biologico-injetavel.webp 1000w" sizes="(max-width: 700px) 90vw, 45vw" width={1000} height={786} alt="Frasco e seringa de medicação biológica injetável" loading="lazy" decoding="async" /><figcaption>Biológico injetável, indicado conforme avaliação médica.</figcaption></figure>
    </div>
  </section>
</SpecialtyTemplate>}
