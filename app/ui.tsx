import type { ReactNode } from "react";
import Link from "next/link";

export function Header() {
  const links = [
    ["Especialidades", "/#cuidados"],
    ["Cirurgia dermatológica", "/cirurgiadermatologica"],
    ["Cabelos", "/cabelo"],
    ["Blog", "/blog"],
    ["Especialistas", "/#especialistas"],
    ["Localização e contato", "/#contato"],
  ] as const;
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Clínica QARA — Início">QARA<span>clínica dermatológica</span></Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <a className="header-cta" href="https://wa.me/5521992189718">Agendar pelo WhatsApp</a>
        <details className="mobile-menu">
          <summary aria-label="Abrir menu de navegação"><span>Menu</span><i aria-hidden="true" /></summary>
          <nav aria-label="Navegação móvel">
            {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            <a className="mobile-menu-cta" href="https://wa.me/5521992189718">Agendar pelo WhatsApp</a>
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
        <div><div className="wordmark inverse">QARA<span>clínica dermatológica</span></div><p>Ciência, precisão e cuidado humano.</p></div>
        <div><strong>Endereço</strong><p>Rua Santa Clara, 50 · salas 521/522<br />Copacabana · Rio de Janeiro</p></div>
        <div><strong>Contato</strong><p>WhatsApp: (21) 99218-9718<br />Atendimento com hora marcada</p></div>
        <div><strong>Registro</strong><p>Clínica QARA · CRM-RJ 1285041<br />Direção técnica médica</p></div>
      </div>
    </footer>
  );
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-heading">
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      <p>{text}</p>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band" id="agendar">
      <div className="shell cta-inner">
        <div><p className="eyebrow">Agende sua avaliação</p><h2>Conte o que precisa. Nossa equipe indica o especialista adequado e apresenta os horários disponíveis.</h2></div>
        <div className="actions"><a className="button button-light" href="https://wa.me/5521992189718">Consultar horários no WhatsApp</a><a className="button button-outline-light" href="#contato">Ver endereço da clínica</a></div>
      </div>
    </section>
  );
}

export function Breadcrumb({ children }: { children: ReactNode }) {
  return <div className="breadcrumb shell"><Link href="/">Início</Link><span>/</span>{children}</div>;
}
