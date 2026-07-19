import type { ReactNode } from "react";
import Link from "next/link";

export function Header({ current }: { current?: string } = {}) {
  const cur = (href: string) => { const h = href.split("#")[0]; return h && h !== "/" && h === current ? "page" as const : undefined; };
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
              <div className="mega-guide"><p>Comece pela sua necessidade.</p><span>Se ainda não sabe qual especialista procurar, nossa equipe pode orientar.</span><a href="https://wa.me/5521992189718?text=Ol%C3%A1%2C%20ainda%20n%C3%A3o%20sei%20qual%20especialista%20procurar%20%E2%80%94%20podem%20me%20orientar%3F" target="_blank" rel="noopener noreferrer">Pedir orientação →</a></div>
              <div className="mega-group mega-specialties"><strong>Especialidades</strong>{specialties.map(([label,href,text])=><Link href={href} aria-current={cur(href)} key={href}><span>{label}</span><small>{text}</small></Link>)}</div>
              <div className="mega-group"><strong>Queixas frequentes</strong>{needs.map(([label,href])=><Link href={href} key={label}>{label}<span aria-hidden="true">→</span></Link>)}</div>
              <div className="mega-group"><strong>Clínica e conteúdo</strong>{clinic.map(([label,href])=><Link href={href} key={label}>{label}<span aria-hidden="true">→</span></Link>)}</div>
            </div>
          </details>
          <Link href="/#especialistas">Equipe</Link><Link href="/#clinica">Clínica</Link><Link href="/blog" aria-current={cur("/blog")}>Conteúdo</Link><Link className="lang-link" href="/en" aria-current={cur("/en")} lang="en">EN</Link><Link className="lang-link" href="/es" aria-current={cur("/es")} lang="es">ES</Link>
        </nav>
        <a className="header-cta" href="https://wa.me/5521992189718?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Cl%C3%ADnica%20QARA." target="_blank" rel="noopener noreferrer" aria-label="Agendar pelo WhatsApp (abre em nova aba)"><span className="cta-full">Agendar pelo WhatsApp</span><span className="cta-short">Agendar</span></a>
        <details className="mobile-menu">
          <summary aria-label="Abrir menu de navegação"><span>Menu</span><i aria-hidden="true" /></summary>
          <nav aria-label="Navegação móvel">
            <details className="mobile-menu-group"><summary>Especialidades</summary><div>{specialties.map(([label,href])=><Link href={href} aria-current={cur(href)} key={href}>{label}</Link>)}</div></details>
            <details className="mobile-menu-group"><summary>Encontre seu cuidado</summary><div>{needs.map(([label,href])=><Link href={href} key={label}>{label}</Link>)}</div></details>
            {clinic.map(([label,href])=><Link href={href} key={label}>{label}</Link>)}
            <Link href="/en" lang="en">English</Link>
            <Link href="/es" lang="es">Español</Link>
            <a className="mobile-menu-cta" href="https://wa.me/5521992189718?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Cl%C3%ADnica%20QARA." target="_blank" rel="noopener noreferrer" aria-label="Agendar pelo WhatsApp (abre em nova aba)">Agendar pelo WhatsApp</a>
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
        <div><div className="wordmark inverse">QARA<span>clínica dermatológica</span></div><p>Ciência, precisão e cuidado humano.</p><p><Link href="/en" lang="en">English</Link> · <Link href="/es" lang="es">Español</Link></p></div>
        <div><strong>Endereço</strong><p>Rua Santa Clara, 50 · salas 521/522<br />Copacabana · Rio de Janeiro</p></div>
        <div><strong>Contato</strong><p><a href="https://wa.me/5521992189718" target="_blank" rel="noopener noreferrer">WhatsApp: (21) 99218-9718</a><br /><a href="tel:+5521992189718">Ligar: (21) 99218-9718</a><br /><a href="mailto:contato@clinicaqara.com.br">contato@clinicaqara.com.br</a><br />Seg. a sex., 8h–21h · Sáb., 8h–13h<br />Atendimento com hora marcada</p></div>
        <div><strong>Registro</strong><p>Clínica QARA · CRM-RJ 1285041<br />Direção técnica médica</p></div>
      </div>
    </footer>
  );
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
  return (
    <div className="section-heading">
      <div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>
      <p>{text}</p>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band" id="agendar">
      <div className="shell cta-inner">
        <div><p className="eyebrow">Agende sua avaliação</p><h2>Conte o que precisa. Nossa equipe indica o especialista adequado e apresenta os horários disponíveis.</h2></div>
        <div><div className="actions"><a className="button button-light" href="https://wa.me/5521992189718?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Cl%C3%ADnica%20QARA." target="_blank" rel="noopener noreferrer">Consultar horários no WhatsApp</a><a className="button button-outline-light" href="#contato">Ver endereço da clínica</a></div><p className="cta-note">Atendimento de seg. a sex., 8h–21h, e sáb., 8h–13h. Mensagens fora desse horário são respondidas no próximo período.</p></div>
      </div>
    </section>
  );
}

export function Breadcrumb({ children }: { children: ReactNode }) {
  return <div className="breadcrumb shell"><Link href="/">Início</Link><span>/</span>{children}</div>;
}
