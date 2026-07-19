import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Header, Footer } from "../ui";

export const metadata: Metadata = {
  title: "Design System | Clínica QARA",
  description:
    "Referência viva do sistema de design da Clínica QARA: cores, tipografia, espaçamento, componentes e princípios de uso.",
  robots: { index: false, follow: false },
};

type Swatch = { name: string; token: string; hex: string; role: string; dark?: boolean };

const primary: Swatch[] = [
  { name: "Grafite clínico", token: "--qara-graphite", hex: "#404041", role: "CTA principal, superfícies escuras, rodapé", dark: true },
  { name: "Tinta profunda", token: "--qara-ink", hex: "#29292A", role: "Títulos e texto de maior ênfase", dark: true },
];

const accents: Swatch[] = [
  { name: "Taupe humano", token: "--qara-taupe", hex: "#A28A7F", role: "Bordas, divisores e detalhes decorativos (não usar em texto pequeno)", dark: true },
  { name: "Taupe profundo", token: "--qara-taupe-deep", hex: "#796960", role: "Fundos de bandas com texto branco (AA)", dark: true },
  { name: "Blush de cuidado", token: "--qara-blush", hex: "#FDE6DC", role: "Acento suave em áreas selecionadas" },
  { name: "Blush ambiente", token: "--qara-blush-soft", hex: "#FFF1EB", role: "Fundos editoriais e seções de respiro" },
  { name: "Foco taupe", token: "--qara-focus", hex: "#735F56", role: "Texto pequeno da marca: eyebrows, kickers, credenciais, links e foco (≈6:1)", dark: true },
];

const neutrals: Swatch[] = [
  { name: "Branco clínico", token: "--qara-white", hex: "#FFFFFF", role: "Fundo principal e superfícies" },
  { name: "Névoa neutra", token: "--qara-gray-050", hex: "#F1F1F2", role: "Fundos de apoio" },
  { name: "Linha suave", token: "--qara-gray-200", hex: "#D0D2D3", role: "Bordas e separadores" },
  { name: "Texto corrente", token: "--qara-copy", hex: "#5F5F61", role: "Parágrafos e descrições", dark: true },
  { name: "Cinza auxiliar", token: "--qara-gray-600", hex: "#7A7A7A", role: "Metadados não essenciais", dark: true },
  { name: "Névoa muted", token: "--qara-muted", hex: "#6D6D6F", role: "Legendas e metadados discretos", dark: true },
];

const typeScale = [
  { key: "Display", cls: "display", specs: "Telegraf · 400 · clamp(2.75rem, 5.4vw, 5.6rem) · 1.04 · -0.04em", sample: "Precisão que acolhe" },
  { key: "Headline", cls: "headline", specs: "Telegraf · 400 · clamp(2rem, 3.8vw, 3.6rem) · 1.12 · -0.025em", sample: "Dermatologia com presença humana" },
  { key: "Title", cls: "title", specs: "Roboto · 600 · 1.08rem · 1.35", sample: "Como funciona a consulta" },
  { key: "Body", cls: "body", specs: "Roboto · 400 · 1rem · 1.7 · 65–75 caracteres", sample: "Precisão diagnóstica, atualização científica e atendimento individualizado, sem promessas de resultado nem comunicação alarmista." },
  { key: "Label", cls: "label", specs: "Roboto · 600 · 0.8rem · 0.14em · uppercase", sample: "Corpo clínico" },
];

const spacing = [
  { token: "--space-2xs", value: "4px", px: 4 },
  { token: "--space-xs", value: "8px", px: 8 },
  { token: "--space-sm", value: "12px", px: 12 },
  { token: "--space-md", value: "24px", px: 24 },
  { token: "--space-lg", value: "48px", px: 48 },
  { token: "--space-xl", value: "72px", px: 72 },
  { token: "--space-2xl", value: "96px", px: 96 },
];

const radii = [
  { name: "Surface", value: "24px", radius: "24px", note: "Cartões consolidados" },
  { name: "Compact", value: "12–16px", radius: "14px", note: "Cartões novos" },
  { name: "Pill", value: "999px", radius: "999px", note: "Apenas ações" },
];

function SwatchGroup({ items }: { items: Swatch[] }) {
  return (
    <div className="ds-swatches">
      {items.map((s) => (
        <div className="ds-swatch" key={s.token}>
          <div className="ds-chip" style={{ background: s.hex, borderBottom: s.hex === "#FFFFFF" ? "1px solid var(--qara-gray-200)" : undefined }} />
          <dl>
            <dt>{s.name}</dt>
            <dd>{s.hex} · {s.token}</dd>
            <dd className="ds-role">{s.role}</dd>
          </dl>
        </div>
      ))}
    </div>
  );
}

function Section({ id, title, intro, children }: { id: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section className="ds-section shell" id={id}>
      <div className="ds-section-head">
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <Header />
      <main>
        <header className="ds-hero">
          <div className="shell">
            <p className="kicker">Sistema de design · Clínica QARA</p>
            <h1>Precisão que acolhe</h1>
            <p className="lead">
              Referência viva dos tokens e componentes que sustentam a identidade da QARA. Uma marca clínica
              contemporânea — clara, silenciosa e humana — onde a sofisticação vem da proporção e do conteúdo
              confiável, nunca do excesso decorativo.
            </p>
            <div className="ds-meta">
              <span>Telegraf + Roboto</span>
              <span>Base branca e grafite</span>
              <span>Acentos taupe e blush</span>
              <span>Plano por padrão</span>
            </div>
            <nav className="ds-index" aria-label="Seções do sistema de design">
              <a href="#cores">Cores</a>
              <a href="#tipografia">Tipografia</a>
              <a href="#espacamento">Espaçamento</a>
              <a href="#raios">Raios</a>
              <a href="#elevacao">Elevação</a>
              <a href="#botoes">Botões</a>
              <a href="#cartoes">Cartões</a>
              <a href="#principios">Princípios</a>
            </nav>
          </div>
        </header>

        <Section id="cores" title="Cores" intro="A paleta combina neutralidade clínica com calor controlado. O taupe orienta e o blush acolhe, mas nenhum dos dois domina o conteúdo — regra do calor contido.">
          <p className="eyebrow" style={{ marginBottom: 18 }}>Primárias</p>
          <SwatchGroup items={primary} />
          <p className="eyebrow" style={{ margin: "40px 0 18px" }}>Acentos</p>
          <SwatchGroup items={accents} />
          <p className="eyebrow" style={{ margin: "40px 0 18px" }}>Neutros</p>
          <SwatchGroup items={neutrals} />
        </Section>

        <Section id="tipografia" title="Tipografia" intro="Telegraf traz precisão contemporânea aos títulos; Roboto mantém leitura médica clara em telas pequenas e textos longos. Títulos podem ser expressivos; parágrafos permanecem simples e objetivos.">
          <div>
            {typeScale.map((t) => (
              <div className="ds-type-row" key={t.key}>
                <div className="ds-type-meta">
                  <span>{t.key}</span>
                  <small>{t.specs}</small>
                </div>
                <p className={`ds-type-sample ${t.cls}`}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="espacamento" title="Espaçamento" intro="Escala progressiva usada para ritmo vertical e respiro entre blocos. Seções respiram com 112px no desktop e reduzem proporcionalmente no celular.">
          <div className="ds-scale">
            {spacing.map((s) => (
              <div className="ds-scale-row" key={s.token}>
                <code>{s.value}</code>
                <span>{s.token.replace("--space-", "")}</span>
                <span className="ds-scale-bar" style={{ width: `${s.px}px` }} aria-hidden="true" />
              </div>
            ))}
          </div>
        </Section>

        <Section id="raios" title="Raios" intro="Pill (999px) é exclusivo de ações. Cartões consolidados usam 24px; cartões novos preferem 12–16px quando o conteúdo não exige continuidade com o legado.">
          <div className="ds-radii">
            {radii.map((r) => (
              <div className="ds-radius" key={r.name}>
                <div style={{ borderRadius: r.radius }} />
                <p>{r.name}</p>
                <small>{r.value}</small>
                <p style={{ color: "var(--qara-copy)", fontWeight: 400, fontSize: ".8rem" }}>{r.note}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="elevacao" title="Elevação" intro="O sistema é plano por padrão. Profundidade vem de contraste tonal, fotografia e linhas finas. A sombra ambiente é reservada a estados interativos — nunca aplicada em série a todos os cartões.">
          <div className="ds-example-stage neutral" style={{ borderRadius: 16 }}>
            <div className="ds-shadow-demo">
              <strong>Sombra ambiente</strong>
              <small>0 20px 55px rgba(64, 64, 65, .08) — hover de elementos que realmente elevam</small>
            </div>
          </div>
        </Section>

        <Section id="botoes" title="Botões" intro="Formato pill para ações, nunca em cartões. Altura interativa mínima de 44px e foco visível de 3px sólido com offset de 4px.">
          <div className="ds-grid">
            <figure className="ds-example">
              <div className="ds-example-stage">
                <a className="button button-primary" href="#botoes">Agendar pelo WhatsApp</a>
                <a className="button button-secondary" href="#botoes">Conhecer especialidade</a>
              </div>
              <figcaption>.button-primary · .button-secondary — sobre fundo claro</figcaption>
            </figure>
            <figure className="ds-example">
              <div className="ds-example-stage dark">
                <a className="button button-light" href="#botoes">Consultar horários</a>
                <a className="button button-outline-light" href="#botoes">Ver endereço</a>
              </div>
              <figcaption>.button-light · .button-outline-light — sobre grafite</figcaption>
            </figure>
          </div>
        </Section>

        <Section id="cartoes" title="Cartões" intro="Plano por padrão, com borda fina de 1px quando a separação tonal não basta. Padding interno de 24–33px. Não empilhar cartões dentro de cartões nem combinar borda fina com sombra larga.">
          <div className="ds-grid">
            <figure className="ds-example">
              <div className="ds-example-stage neutral">
                <div className="card">
                  <span className="card-number">01</span>
                  <h3>Dermatologia clínica</h3>
                  <p>Acne, rosácea, manchas e acompanhamento de pintas com diagnóstico preciso.</p>
                </div>
              </div>
              <figcaption>.service-card — borda neutra, raio surface</figcaption>
            </figure>
            <figure className="ds-example">
              <div className="ds-example-stage soft">
                <div className="card" style={{ background: "transparent", border: 0 }}>
                  <p className="eyebrow">Kicker editorial</p>
                  <h3 style={{ marginTop: 12 }}>Conhecimento que cuida</h3>
                  <p>Blush ambiente como fundo de respiro em seções editoriais.</p>
                </div>
              </div>
              <figcaption>Superfície editorial — .soft-section / blush ambiente</figcaption>
            </figure>
          </div>
        </Section>

        <Section id="principios" title="Princípios" intro="As regras que mantêm a coerência entre novas telas e o legado aprovado. Aplicar por conteúdo, não por decoração.">
          <div className="ds-rules">
            <div className="ds-do">
              <h3>Do</h3>
              <ul>
                <li>Preservar grafite, taupe, blush, Telegraf e Roboto como identidade central.</li>
                <li>Manter alvos de toque de pelo menos 44×44px e foco visível de 3px.</li>
                <li>Usar fotografia real ou gerada em WebP, clinicamente plausível e digna.</li>
                <li>Adaptar o layout por conteúdo: 900px para tablet/menu, 620px para telefone.</li>
                <li>Manter artigos com autoria correta, CRM/RQE e citações verificáveis.</li>
              </ul>
            </div>
            <div className="ds-dont">
              <h3>Don&apos;t</h3>
              <ul>
                <li>Usar comunicação promocional agressiva ou garantias de resultado.</li>
                <li>Transformar o site em catálogo de cards idênticos ou empilhar cartões.</li>
                <li>Recorrer a estética de spa, excesso de bege, dourado, neon ou glassmorphism.</li>
                <li>Combinar borda fina com sombra larga, ou raio acima de 16px em cartões novos.</li>
                <li>Bloquear zoom, esconder função no celular ou depender de hover.</li>
              </ul>
            </div>
          </div>
          <p style={{ color: "var(--qara-copy)", fontSize: ".9rem", marginTop: 40 }}>
            Documentação completa em <Link href="/" className="text-link" style={{ display: "inline" }}>DESIGN.md</Link> e{" "}
            <code style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: ".85rem" }}>app/globals.css</code>.
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
