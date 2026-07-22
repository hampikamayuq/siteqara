/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Footer, Header, portraitSrcSet } from "./ui";

export type IntlContent = {
  path: string; ogLocale: string;
  hero: { kicker: string; h1: string; lead: string; cta: string; ctaHref: string; quiet: string };
  siteNote: string;
  assurance: [string, string][];
  servicesTitle: string; servicesText: string;
  services: [string, string, string][]; // name, desc, href
  teamTitle: string; teamText: string;
  team: [string, string, string[], string, string][]; // name, area, langs, img, slug
  profileLabel: string;
  stepsTitle: string; stepsLead: string;
  steps: [string, string][];
  faqTitle: string;
  faq: [string, string][];
  visitTitle: string; addressLines: string[]; hoursLabel: string; hoursLines: string[]; mapsLabel: string; emailLabel: string;
  ctaTitle: string; ctaBtn: string; ctaNote: string;
};

export function InternationalPage({ c }: { c: IntlContent }) {
  const clinicSchema = {
    "@context": "https://schema.org", "@type": "MedicalClinic",
    name: "Clínica QARA", url: `https://clinicaqara.com.br${c.path}`,
    telephone: "+55-21-99218-9718", email: "contato@clinicaqara.com.br",
    medicalSpecialty: "Dermatology",
    address: { "@type": "PostalAddress", streetAddress: "Rua Santa Clara, 50 — salas 521/522", addressLocality: "Rio de Janeiro", addressRegion: "RJ", postalCode: "22041-012", addressCountry: "BR" },
    geo: { "@type": "GeoCoordinates", latitude: -22.9716311, longitude: -43.1868668 },
    availableLanguage: ["pt-BR", "en", "es", "de", "fr"],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "13:00" },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: c.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main id="conteudo">
        <section className="craft-hero">
          <div className="shell craft-hero-inner">
            <div className="craft-hero-copy">
              <p className="kicker">{c.hero.kicker}</p>
              <h1>{c.hero.h1}</h1>
              <span className="hero-rule" aria-hidden="true" />
              <p className="lead">{c.hero.lead}</p>
              <div className="actions">
                <a className="button craft-primary" href={c.hero.ctaHref} target="_blank" rel="noopener noreferrer">{c.hero.cta}</a>
                <a className="quiet-link" href="#services">{c.hero.quiet} <span aria-hidden="true">↓</span></a>
              </div>
              <p className="intl-note">{c.siteNote}</p>
            </div>
            <div className="hero-image"><img src="/images/qara-atendimento.webp" srcSet="/images/qara-atendimento-640.webp 640w, /images/qara-atendimento-1024.webp 1024w, /images/qara-atendimento.webp 1460w" sizes="(max-width: 900px) 100vw, 55vw" alt="Dermatologist examining a patient with a dermatoscope at Clínica QARA" width={1460} height={973} fetchPriority="high" /></div>
          </div>
        </section>

        <section className="assurance-bar" aria-label="Key facts">
          <div className="shell">
            {c.assurance.map(([strong, span]) => <p key={strong}><strong>{strong}</strong><span>{span}</span></p>)}
          </div>
        </section>

        <section className="care-strip" id="services">
          <div className="shell care-grid">
            <div className="care-intro"><h2>{c.servicesTitle}</h2><p>{c.servicesText}</p></div>
            <div className="care-list">
              {c.services.map(([title, text, href]) => <Link className="care-item" href={href} key={title}><div><h3>{title}</h3><p>{text}</p></div><b aria-hidden="true">→</b></Link>)}
            </div>
          </div>
        </section>

        <section className="section shell">
          <div className="section-heading">
            <div><h2>{c.teamTitle}</h2></div>
            <p>{c.teamText}</p>
          </div>
          <div className="craft-specialists">
            {c.team.map(([name, area, langs, img, slug]) => (
              <article key={slug}>
                <div className="doctor-image"><img src={img} srcSet={portraitSrcSet[img]} sizes={portraitSrcSet[img] && "(max-width: 620px) 90vw, (max-width: 900px) 45vw, 240px"} alt={name} width={1000} height={1300} loading="lazy" decoding="async" /></div>
                <h3>{name}</h3>
                <div className="lang-tags">{langs.map(l => <span key={l}>{l}</span>)}</div>
                <p>{area}</p>
                <Link href={`/equipe/${slug}`}>{c.profileLabel} <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="journey-section">
          <div className="shell journey-grid">
            <div><h2>{c.stepsTitle}</h2><p>{c.stepsLead}</p></div>
            <ol>
              {c.steps.map(([t, text], i) => <li key={t}><b>{i + 1}</b><div><h3>{t}</h3><p>{text}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className="practical-section shell">
          <div><h2>{c.faqTitle}</h2></div>
          <div className="practical-list">
            {c.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </section>

        <section className="location-section">
          <div className="shell location-grid">
            <div>
              <h2>{c.visitTitle}</h2>
              <p>{c.addressLines.map(l => <span key={l}>{l}<br /></span>)}</p>
              <p><strong>{c.hoursLabel}</strong><br />{c.hoursLines.map(l => <span key={l}>{l}<br /></span>)}</p>
              <p><a href="https://www.google.com/maps/search/?api=1&query=Rua+Santa+Clara+50+Copacabana+Rio+de+Janeiro" target="_blank" rel="noreferrer">{c.mapsLabel} <span aria-hidden="true">→</span></a><br />
              <a href="mailto:contato@clinicaqara.com.br">{c.emailLabel}: contato@clinicaqara.com.br</a></p>
            </div>
            <a className="map-art" href="https://www.google.com/maps/search/?api=1&query=Rua+Santa+Clara+50+Copacabana+Rio+de+Janeiro" target="_blank" rel="noreferrer" aria-label={c.mapsLabel}><span><em>QARA</em></span><b>Rua Santa Clara, 50</b></a>
          </div>
        </section>

        <section className="cta-band">
          <div className="shell cta-inner">
            <div><h2>{c.ctaTitle}</h2></div>
            <div>
              <div className="actions"><a className="button button-light" href={c.hero.ctaHref} target="_blank" rel="noopener noreferrer">{c.ctaBtn}</a></div>
              <p className="cta-note">{c.ctaNote}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const WA_EN = "https://wa.me/5521992189718?text=" + encodeURIComponent("Hello! I'd like to book an appointment at Clínica QARA.");
const WA_ES = "https://wa.me/5521992189718?text=" + encodeURIComponent("¡Hola! Me gustaría agendar una consulta en la Clínica QARA.");

export const enContent: IntlContent = {
  path: "/en", ogLocale: "en_US",
  hero: {
    kicker: "Clínica QARA · Copacabana, Rio de Janeiro",
    h1: "English-speaking dermatologists in Copacabana.",
    lead: "Clinical and surgical dermatology, hair, nails and inflammatory skin diseases — with appointments, diagnosis and follow-up conducted in English.",
    cta: "Book on WhatsApp (in English)", ctaHref: WA_EN, quiet: "See our services",
  },
  siteNote: "Care is available in English; detailed service pages are in Portuguese.",
  assurance: [
    ["Copacabana, near the metro", "Rua Santa Clara, 50 — by Siqueira Campos station"],
    ["Private care with invoice", "Itemized invoice (nota fiscal) for travel-insurance reimbursement claims"],
    ["English · Español · Deutsch · Français", "According to the attending physician"],
  ],
  servicesTitle: "What we treat.",
  servicesText: "Every area is led by a dedicated dermatologist. Service pages are in Portuguese — message us in English and we will guide you.",
  services: [
    ["Clinical dermatology", "Acne, rosacea, spots, allergies and mole checks.", "/dermatologia-clinica"],
    ["Dermatologic surgery", "Biopsies, lesion removal and skin cancer surgery.", "/cirurgia-dermatologica"],
    ["Hair and scalp", "Hair loss, alopecia and FUE hair transplant.", "/cabelo"],
    ["Nail diseases", "Fungal infections, ingrown nails and nail surgery.", "/unhas"],
    ["Inflammatory diseases", "Psoriasis, atopic dermatitis and hidradenitis.", "/doencas-inflamatorias"],
    ["Pediatric dermatology", "Skin care for babies, children and teenagers.", "/dermatopediatria"],
    ["Aesthetic dermatology", "Individualized planning for skin health and quality.", "/dermatologia-estetica"],
  ],
  teamTitle: "Meet our specialists.",
  teamText: "Five physicians, each dedicated to a specific area of dermatologic care.",
  team: [
    ["Dr. Diego Gálvez", "Dermatology and dermatologic surgery", ["EN", "ES", "PT"], "/images/dr-diego.webp", "dr-diego-galvez"],
    ["Dr. Miguel Ceccarelli", "Nail diseases and aesthetic dermatology", ["EN", "ES", "PT"], "/images/dr-miguel.webp", "dr-miguel-ceccarelli"],
    ["Dra. Diana Stohmann", "Trichology and hair transplant", ["FR", "PT"], "/images/dra-diana.webp", "dra-diana-stohmann"],
    ["Dra. Manuela Pedretti", "Psoriasis and inflammatory diseases", ["DE", "PT"], "/images/dra-manuela.webp", "dra-manuela-pedretti"],
    ["Dr. Fabrício de Andrade", "Pediatric dermatology · Dermatologist and pediatrician", ["EN", "PT"], "/images/dr-fabricio-de-andrade.webp", "dr-fabricio-de-andrade"],
  ],
  profileLabel: "View profile",
  stepsTitle: "How it works.",
  stepsLead: "From your first message to follow-up, in your language.",
  steps: [
    ["Message us on WhatsApp", "Write in English. Tell us briefly what you need and our team will suggest the right specialist and available times."],
    ["Visit the clinic", "Appointments are always scheduled — no walk-in queues. Bring any previous exams or a list of medications if you have them."],
    ["Diagnosis and follow-up", "You leave with a clear explanation and a plan. When clinically appropriate, follow-up can be done by telemedicine after you travel home."],
  ],
  faqTitle: "Frequently asked questions.",
  faq: [
    ["Do the doctors speak English?", "Yes. Dr. Diego Gálvez, Dr. Miguel Ceccarelli and Dr. Fabrício de Andrade provide care in English. Dr. Diego and Dr. Miguel also attend in Spanish, Dra. Diana Stohmann in French and Dra. Manuela Pedretti in German. Tell us your language when booking and we will match you with the right specialist."],
    ["Can I use my travel insurance?", "The clinic provides private care and issues an itemized invoice (nota fiscal) and medical documentation you can submit to your travel-insurance provider for reimbursement, according to your policy's rules."],
    ["How do I book an appointment?", "Send us a WhatsApp message in English — the button on this page opens a conversation. Our team confirms the specialist, date and time with you."],
    ["What are the opening hours?", "Monday to Friday from 8am to 9pm, and Saturdays from 8am to 1pm, always by appointment. Messages sent outside these hours are answered in the next service period."],
    ["Is telemedicine available?", "Some cases and follow-ups can be handled by telemedicine when clinically appropriate. Procedures and physical examinations require an in-person visit."],
  ],
  visitTitle: "Visiting the clinic.",
  addressLines: ["Rua Santa Clara, 50 · rooms 521/522", "Copacabana, Rio de Janeiro"],
  hoursLabel: "Opening hours", hoursLines: ["Mon–Fri: 8am–9pm", "Sat: 8am–1pm"],
  mapsLabel: "Open in Google Maps", emailLabel: "E-mail",
  ctaTitle: "Tell us what you need — in English.",
  ctaBtn: "Chat on WhatsApp", ctaNote: "Mon–Fri 8am–9pm, Sat 8am–1pm. Messages outside these hours are answered in the next service period.",
};

export const esContent: IntlContent = {
  path: "/es", ogLocale: "es_ES",
  hero: {
    kicker: "Clínica QARA · Copacabana, Río de Janeiro",
    h1: "Dermatólogos que hablan español en Copacabana.",
    lead: "Dermatología clínica y quirúrgica, cabello, uñas y enfermedades inflamatorias de la piel — con consulta, diagnóstico y seguimiento en español.",
    cta: "Agendar por WhatsApp (en español)", ctaHref: WA_ES, quiet: "Ver nuestros servicios",
  },
  siteNote: "La atención está disponible en español; las páginas detalladas de servicios están en portugués.",
  assurance: [
    ["Copacabana, cerca del metro", "Rua Santa Clara, 50 — junto a la estación Siqueira Campos"],
    ["Atención particular con factura", "Factura detallada (nota fiscal) para el reembolso de su seguro de viaje"],
    ["Español · English · Deutsch · Français", "Según el médico tratante"],
  ],
  servicesTitle: "Qué tratamos.",
  servicesText: "Cada área está a cargo de un dermatólogo dedicado. Las páginas de servicios están en portugués — escríbanos en español y lo orientamos.",
  services: [
    ["Dermatología clínica", "Acné, rosácea, manchas, alergias y control de lunares.", "/dermatologia-clinica"],
    ["Cirugía dermatológica", "Biopsias, extirpación de lesiones y cirugía del cáncer de piel.", "/cirurgia-dermatologica"],
    ["Cabello y cuero cabelludo", "Caída del cabello, alopecias y trasplante capilar FUE.", "/cabelo"],
    ["Enfermedades de las uñas", "Micosis, uñas encarnadas y cirugía ungueal.", "/unhas"],
    ["Enfermedades inflamatorias", "Psoriasis, dermatitis atópica e hidradenitis.", "/doencas-inflamatorias"],
    ["Dermatología pediátrica", "Cuidado de la piel de bebés, niños y adolescentes.", "/dermatopediatria"],
    ["Dermatología estética", "Planificación individualizada para la salud de la piel.", "/dermatologia-estetica"],
  ],
  teamTitle: "Conozca a nuestros especialistas.",
  teamText: "Cinco médicos, cada uno dedicado a un área específica de la atención dermatológica.",
  team: [
    ["Dr. Diego Gálvez", "Dermatología y cirugía dermatológica", ["ES", "EN", "PT"], "/images/dr-diego.webp", "dr-diego-galvez"],
    ["Dr. Miguel Ceccarelli", "Enfermedades de las uñas y dermatología estética", ["ES", "EN", "PT"], "/images/dr-miguel.webp", "dr-miguel-ceccarelli"],
    ["Dra. Diana Stohmann", "Tricología y trasplante capilar", ["FR", "PT"], "/images/dra-diana.webp", "dra-diana-stohmann"],
    ["Dra. Manuela Pedretti", "Psoriasis y enfermedades inflamatorias", ["DE", "PT"], "/images/dra-manuela.webp", "dra-manuela-pedretti"],
    ["Dr. Fabrício de Andrade", "Dermatología pediátrica · Dermatólogo y pediatra", ["EN", "PT"], "/images/dr-fabricio-de-andrade.webp", "dr-fabricio-de-andrade"],
  ],
  profileLabel: "Ver perfil",
  stepsTitle: "Cómo funciona.",
  stepsLead: "Desde su primer mensaje hasta el seguimiento, en su idioma.",
  steps: [
    ["Escríbanos por WhatsApp", "Escriba en español. Cuéntenos brevemente qué necesita y nuestro equipo le indicará el especialista adecuado y los horarios disponibles."],
    ["Visite la clínica", "La atención es siempre con cita previa — sin filas. Traiga exámenes anteriores o una lista de medicamentos si los tiene."],
    ["Diagnóstico y seguimiento", "Usted sale con una explicación clara y un plan. Cuando es clínicamente apropiado, el seguimiento puede hacerse por telemedicina después de volver a su país."],
  ],
  faqTitle: "Preguntas frecuentes.",
  faq: [
    ["¿Los médicos hablan español?", "Sí. El Dr. Diego Gálvez y el Dr. Miguel Ceccarelli atienden en español e inglés. La Dra. Diana Stohmann también atiende en francés y la Dra. Manuela Pedretti en alemán. Indique su idioma al agendar y lo conectamos con el especialista adecuado."],
    ["¿Puedo usar mi seguro de viaje?", "La atención es particular y la clínica emite factura detallada (nota fiscal) y documentación médica que usted puede presentar a su seguro de viaje para reembolso, según las reglas de su póliza."],
    ["¿Cómo agendo una consulta?", "Envíe un mensaje de WhatsApp en español — el botón de esta página abre la conversación. Nuestro equipo confirma con usted el especialista, la fecha y la hora."],
    ["¿Cuál es el horario de atención?", "De lunes a viernes de 8 a 21 h, y sábados de 8 a 13 h, siempre con cita previa. Los mensajes enviados fuera de ese horario se responden en el siguiente período de atención."],
    ["¿Hay telemedicina?", "Algunos casos y seguimientos pueden atenderse por telemedicina cuando es clínicamente apropiado. Los procedimientos y el examen físico requieren visita presencial."],
  ],
  visitTitle: "Cómo llegar.",
  addressLines: ["Rua Santa Clara, 50 · salas 521/522", "Copacabana, Río de Janeiro"],
  hoursLabel: "Horario", hoursLines: ["Lun–Vie: 8–21 h", "Sáb: 8–13 h"],
  mapsLabel: "Abrir en Google Maps", emailLabel: "Correo",
  ctaTitle: "Cuéntenos qué necesita — en español.",
  ctaBtn: "Conversar por WhatsApp", ctaNote: "Lun–Vie 8–21 h, Sáb 8–13 h. Los mensajes fuera de ese horario se responden en el siguiente período.",
};
