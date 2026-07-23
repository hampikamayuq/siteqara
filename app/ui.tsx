import type { ReactNode } from "react";
import Link from "next/link";
import { appointmentLinks, clinicContact, whatsappHref } from "./clinic-links";

export const clinicMapsUrl = clinicContact.mapsUrl;

type HeaderConversionContext = "home" | "specialty" | "profile" | "blog" | "article" | "international" | "not_found";

export function Header({ current, conversionContext }: { current?: string; conversionContext?: HeaderConversionContext } = {}) {
  const cur = (href: string) => { const h = href.split("#")[0]; return h && h !== "/" && h === current ? "page" as const : undefined; };
  const locale = current === "/en" ? "en" : current === "/es" ? "es" : "pt-BR";
  const context = conversionContext ?? (current === "/en" || current === "/es" ? "international" : current === "/blog" ? "blog" : current && current !== "/" ? "specialty" : "home");
  const language = (target: "pt-BR" | "en" | "es", placement: "header" | "mobile_menu") => target === locale ? { "aria-current": "page" as const } : { "data-conversion-event": "language_change", "data-conversion-placement": placement, "data-conversion-context": context, "data-conversion-locale": locale, "data-conversion-to-locale": target };
  const specialties = [
    ["Dermatologia clínica", "/dermatologia-clinica", "Acne, rosácea, manchas e pintas"],
    ["Cirurgia dermatológica", "/cirurgia-dermatologica", "Biópsias, lesões e reconstruções"],
    ["Cabelos e couro cabeludo", "/cabelo", "Queda, alopecias e transplante"],
    ["Doenças das unhas", "/unhas", "Micose, inflamações e cirurgia ungueal"],
    ["Doenças inflamatórias", "/doencas-inflamatorias", "Psoríase, dermatite e hidradenite"],
    ["Dermatopediatria", "/dermatopediatria", "Pele de bebês, crianças e adolescentes"],
    ["Dermatologia estética", "/dermatologia-estetica", "Pele, cicatrizes e envelhecimento"],
  ] as const;
  const needs = [
    ["Acne, rosácea e manchas", "/dermatologia-clinica"],
    ["Pintas e câncer da pele", "/blog/cancer-da-pele-sinais-de-alerta"],
    ["Queda de cabelo", "/cabelo"],
    ["Alterações das unhas", "/unhas"],
    ["Psoríase e dermatite", "/doencas-inflamatorias"],
  ] as const;
  const clinic = [["Corpo clínico", "/#especialistas"], ["A Clínica QARA", "/#clinica"], ["Como funciona a consulta", "/#jornada"], ["Localização e contato", "/#contato"], ["Conteúdo médico", "/blog"]] as const;
  return (
    <header className="site-header">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Clínica QARA — Início">QARA<span>clínica dermatológica</span></Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <details className="mega-menu">
            <summary>Especialidades <span aria-hidden="true">⌄</span></summary>
            <div className="mega-panel">
              <div className="mega-guide"><p>Comece pela sua necessidade.</p><span>Se ainda não sabe qual especialista procurar, nossa equipe pode orientar.</span><a href={whatsappHref("Olá, ainda não sei qual especialista procurar — podem me orientar?")} target="_blank" rel="noopener noreferrer" data-conversion-event="whatsapp_click" data-conversion-placement="header" data-conversion-variant="guidance">Pedir orientação →</a></div>
              <div className="mega-group mega-specialties"><strong>Especialidades</strong>{specialties.map(([label,href,text])=><Link href={href} aria-current={cur(href)} key={href}><span>{label}</span><small>{text}</small></Link>)}</div>
              <div className="mega-group"><strong>Queixas frequentes</strong>{needs.map(([label,href])=><Link href={href} key={label}>{label}<span aria-hidden="true">→</span></Link>)}</div>
              <div className="mega-group"><strong>Clínica e conteúdo</strong>{clinic.map(([label,href])=><Link href={href} key={label}>{label}<span aria-hidden="true">→</span></Link>)}</div>
            </div>
          </details>
          <Link href="/#especialistas">Equipe</Link><Link href="/#clinica">Clínica</Link><Link href="/blog" aria-current={cur("/blog")}>Conteúdo</Link>
          <div className="language-switcher" aria-label="Idiomas" role="group"><Link className="lang-link" href="/" lang="pt-BR" {...language("pt-BR", "header")}>PT</Link><Link className="lang-link" href="/en" lang="en" {...language("en", "header")}>EN</Link><Link className="lang-link" href="/es" lang="es" {...language("es", "header")}>ES</Link></div>
        </nav>
        <a className="header-cta" href={current === "/" ? appointmentLinks.home : whatsappHref("Olá, gostaria de agendar uma avaliação na Clínica QARA.")} target="_blank" rel="noopener noreferrer" aria-label="Agendar pelo WhatsApp (abre em nova aba)" data-conversion-event="whatsapp_click" data-conversion-placement="header" data-conversion-variant="schedule"><span className="cta-full">Agendar pelo WhatsApp</span><span className="cta-short">Agendar</span></a>
        <details className="mobile-menu">
          <summary aria-label="Abrir menu de navegação"><span>Menu</span><i aria-hidden="true" /></summary>
          <nav aria-label="Navegação móvel">
            <details className="mobile-menu-group"><summary>Especialidades</summary><div>{specialties.map(([label,href])=><Link href={href} aria-current={cur(href)} key={href}>{label}</Link>)}</div></details>
            <details className="mobile-menu-group"><summary>Encontre seu cuidado</summary><div>{needs.map(([label,href])=><Link href={href} key={label}>{label}</Link>)}</div></details>
            {clinic.map(([label,href])=><Link href={href} key={label}>{label}</Link>)}
            <Link href="/" lang="pt-BR" {...language("pt-BR", "mobile_menu")}>PT</Link>
            <Link href="/en" lang="en" {...language("en", "mobile_menu")}>English</Link>
            <Link href="/es" lang="es" {...language("es", "mobile_menu")}>Español</Link>
            <a className="mobile-menu-cta" href={current === "/" ? appointmentLinks.home : whatsappHref("Olá, gostaria de agendar uma avaliação na Clínica QARA.")} target="_blank" rel="noopener noreferrer" aria-label="Agendar pelo WhatsApp (abre em nova aba)" data-conversion-event="whatsapp_click" data-conversion-placement="mobile_menu" data-conversion-variant="schedule">Agendar pelo WhatsApp</a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="contato">
      <div className="shell footer-grid">
        <div className="footer-brand"><div className="wordmark inverse">QARA<span>clínica dermatológica</span></div><p>Ciência, precisão e cuidado humano em cada etapa do cuidado dermatológico.</p><nav aria-label="Links institucionais"><Link href="/blog">Conteúdo médico</Link><Link href="/equipe">Equipe médica</Link><Link href="/en" lang="en">English</Link><Link href="/es" lang="es">Español</Link></nav></div>
        <div className="footer-column"><strong>Especialidades</strong><nav aria-label="Especialidades"><Link href="/dermatologia-clinica">Dermatologia clínica</Link><Link href="/cirurgia-dermatologica">Cirurgia dermatológica</Link><Link href="/cabelo">Cabelos e couro cabeludo</Link><Link href="/unhas">Doenças das unhas</Link><Link href="/doencas-inflamatorias">Doenças inflamatórias</Link><Link href="/dermatopediatria">Dermatopediatria</Link><Link href="/dermatologia-estetica">Dermatologia estética</Link></nav></div>
        <div className="footer-column footer-hours"><strong>Horário de atendimento</strong><dl><div><dt>Segunda-feira</dt><dd>08:00–21:00</dd></div><div><dt>Terça-feira</dt><dd>08:00–21:00</dd></div><div><dt>Quarta-feira</dt><dd>08:00–21:00</dd></div><div><dt>Quinta-feira</dt><dd>08:00–21:00</dd></div><div><dt>Sexta-feira</dt><dd>08:00–21:00</dd></div><div><dt>Sábado</dt><dd>08:00–13:00</dd></div></dl><p>Atendimento com hora marcada.</p></div>
        <div className="footer-column"><strong>Contato</strong><address><a href={clinicContact.mapsUrl} target="_blank" rel="noopener noreferrer" data-conversion-event="maps_click" data-conversion-placement="footer" data-conversion-variant="maps">Rua Santa Clara, 50 · salas 521/522<br />Copacabana · Rio de Janeiro</a><a href={clinicContact.whatsappUrl} target="_blank" rel="noopener noreferrer" data-conversion-event="whatsapp_click" data-conversion-placement="footer" data-conversion-variant="whatsapp">WhatsApp: (21) 99218-9718</a><a href={clinicContact.telephoneHref} data-conversion-event="phone_click" data-conversion-placement="footer" data-conversion-variant="phone">Ligar: (21) 99218-9718</a><a href={clinicContact.emailHref}>{clinicContact.email}</a></address><a className="footer-social" href="https://instagram.com/qaraclinica" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Clínica QARA: @qaraclinica"><span aria-hidden="true">◎</span>@qaraclinica</a></div>
        <div className="footer-column footer-registration"><strong>Registro</strong><p>Clínica QARA<br />CRM 1285041-RJ</p><p><b>Diretor técnico</b><br />Dr. Miguel Ceccarelli<br />CRM-RJ 1092456<br />RQE 34414 · Dermatologia</p></div>
      </div>
    </footer>
  );
}

export function WhatsAppFloatingButton() {
  return <a className="whatsapp-float" href={clinicContact.whatsappFloatingUrl} target="_blank" rel="noopener noreferrer" aria-label="Agendar uma consulta pelo WhatsApp (abre em nova aba)" data-conversion-event="whatsapp_click" data-conversion-placement="floating" data-conversion-variant="schedule"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.7 4.3A10.6 10.6 0 0 0 3.2 17.1L2 22l5.1-1.3A10.7 10.7 0 1 0 19.7 4.3Zm-7.6 16a8.5 8.5 0 0 1-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.5 8.5 0 1 1 12.1 20.3Zm4.7-6.4c-.3-.2-1.6-.8-1.9-.9s-.5-.2-.7.2-.8.9-.9 1.1-.3.2-.6.1a7 7 0 0 1-2.1-1.3A7.8 7.8 0 0 1 9 11.2c-.2-.3 0-.5.1-.6l.4-.5.2-.5c.1-.2 0-.4 0-.5L8.8 7c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.3 1 2.6 1.2 2.8a10 10 0 0 0 3.8 3.5c.5.3.9.5 1.2.6.5.2 1 .2 1.4.1.4-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3s-.2-.2-.5-.3Z" /></svg><span>Agendar no WhatsApp</span></a>;
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
  return (
    <div className="section-heading">
      <div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>
      <p>{text}</p>
    </div>
  );
}

export function CtaBand({ whatsappUrl = appointmentLinks.home }: { whatsappUrl?: string } = {}) {
  return (
    <section className="cta-band" id="agendar">
      <div className="shell cta-inner">
        <div><p className="eyebrow">Agende sua avaliação</p><h2>Conte o que precisa. Nossa equipe indica o especialista adequado e apresenta os horários disponíveis.</h2></div>
        <div><div className="actions"><a className="button button-light" href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-conversion-event="whatsapp_click" data-conversion-placement="cta_band" data-conversion-variant="schedule">Consultar horários no WhatsApp</a><a className="button button-outline-light" href="#contato">Ver endereço da clínica</a></div><p className="cta-note">Atendimento de seg. a sex., 8h–21h, e sáb., 8h–13h, sempre com hora marcada.</p></div>
      </div>
    </section>
  );
}

export function Breadcrumb({ children, trail }: { children: ReactNode; trail?: [string, string][] }) {
  const ld = trail && {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [["Início", "/"] as [string, string], ...trail].map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, ...(url ? { item: `https://clinicaqara.com.br${url}` } : {}) })),
  };
  return <div className="breadcrumb shell">{ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}<Link href="/">Início</Link><span>/</span>{children}</div>;
}

export const portraitSrcSet: Record<string, string> = {
  "/images/dr-diego.webp": "/images/dr-diego-640.webp 640w, /images/dr-diego-1024.webp 1024w, /images/dr-diego.webp 1351w",
  "/images/dra-diana.webp": "/images/dra-diana-640.webp 640w, /images/dra-diana-1024.webp 1024w, /images/dra-diana.webp 1200w",
  "/images/dra-manuela.webp": "/images/dra-manuela-640.webp 640w, /images/dra-manuela.webp 852w",
  "/images/dr-fabricio-de-andrade.webp": "/images/dr-fabricio-de-andrade-640.webp 640w, /images/dr-fabricio-de-andrade.webp 1023w",
};
