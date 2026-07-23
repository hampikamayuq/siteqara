/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, Footer, Header } from "../ui";
import { articles } from "./articles";
import { evidence } from "./article-evidence";
import { BlogNavSpy } from "./nav-spy";
import { whatsappHref } from "../clinic-links";

export const metadata: Metadata = {
  title: "Blog de Dermatologia | Clínica QARA",
  description: "Informação médica revisada sobre pele, cabelos, unhas, câncer da pele e doenças inflamatórias.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog de Dermatologia | Clínica QARA",
    description: "Informação médica revisada sobre pele, cabelos, unhas, câncer da pele e doenças inflamatórias.",
    images: [{ url: "/images/qara-atendimento.webp", width: 1460, height: 973, alt: "Atendimento na Clínica QARA" }],
  },
};

const slugify = (category: string) => category.toLowerCase().replaceAll(" ", "-");
const responsiveCover = (src: string) => src.replace(/\.webp$/, "-640.webp") + " 640w, " + src.replace(/\.webp$/, "-1024.webp") + " 1024w, " + src + " 1400w";
const authorLine = (slug: string) => evidence[slug]?.author.name;

function Cover({ article, eager = false, sizes }: { article: (typeof articles)[number]; eager?: boolean; sizes: string }) {
  return <Link className="blog-image" href={`/blog/${article.slug}`} aria-label={`Ler ${article.title}`}>
    <img src={article.image} srcSet={responsiveCover(article.image)} sizes={sizes} alt="" width={1400} height={788} decoding="async" fetchPriority={eager ? "high" : "auto"} loading={eager ? "eager" : "lazy"} />
  </Link>;
}

function StoryMeta({ article }: { article: (typeof articles)[number] }) {
  return <p className="story-meta">{article.readTime} · Por {authorLine(article.slug)}</p>;
}

export default function Blog() {
  const [featured, ...rest] = articles;
  const categories = [...new Set(articles.map(article => article.category))];
  const groups = categories.map(category => ({ category, items: rest.filter(article => article.category === category) }));

  return <>
    <Header current="/blog" />
    <main id="conteudo">
      <Breadcrumb trail={[["Conteúdo médico", ""]]}>Conteúdo médico</Breadcrumb>
      <section className="blog-hero">
        <div className="shell blog-hero-grid">
          <div><p className="kicker">Orientação baseada em evidências</p><h1>Entenda os sinais, os exames e as opções de tratamento.</h1></div>
          <p className="lead">Artigos escritos por dermatologistas da Clínica QARA, com autoria, referências específicas e linguagem clara para pacientes.</p>
        </div>
      </section>

      <section className="shell blog-index">
        <nav aria-label="Navegar pelos temas do blog">
          <a href="#artigos" aria-current="true">Em destaque</a>
          {groups.map(({ category, items }) => <a href={items.length ? `#${slugify(category)}` : "#artigos"} key={category}>{category}</a>)}
        </nav>

        <article className="blog-featured" id="artigos">
          <Cover article={featured} eager sizes="(max-width: 900px) 100vw, 62vw" />
          <div><span>{featured.category}</span><h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.description}</p><StoryMeta article={featured} /><Link className="story-link" href={`/blog/${featured.slug}`}>Ler o artigo completo <span aria-hidden="true">→</span></Link></div>
        </article>

        {groups.filter(group => group.items.length).map(({ category, items }) => {
          const [lead, ...secondary] = items;
          return <section className="blog-section" id={slugify(category)} key={category}>
            <header className="blog-section-title"><h2>{category}</h2><span>{items.length} {items.length === 1 ? "artigo" : "artigos"}</span></header>
            <div className={`topic-layout${secondary.length ? "" : " single"}`}>
              <article className="topic-lead"><Cover article={lead} sizes="(max-width: 900px) 100vw, 42vw" /><div><h3><Link href={`/blog/${lead.slug}`}>{lead.title}</Link></h3><p>{lead.description}</p><StoryMeta article={lead} /><Link className="story-link" href={`/blog/${lead.slug}`}>Ler artigo <span aria-hidden="true">→</span></Link></div></article>
              {secondary.length > 0 && <div className="topic-list">{secondary.map(article => <article key={article.slug}><div><h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3><StoryMeta article={article} /></div><Link className="topic-arrow" href={`/blog/${article.slug}`} aria-label={`Ler ${article.title}`}><span aria-hidden="true">→</span></Link></article>)}</div>}
            </div>
          </section>;
        })}
      </section>
      <section className="blog-guidance"><div className="shell"><div><h2>Não sabe por onde começar?</h2><p>Conte brevemente sua necessidade. A equipe orienta a especialidade mais adequada antes do agendamento.</p></div><div className="actions"><Link className="button button-secondary" href="/#cuidados">Ver especialidades</Link><a className="button button-primary" href={whatsappHref("Olá, gostaria de orientação para escolher o especialista adequado.")} target="_blank" rel="noopener noreferrer" data-conversion-event="whatsapp_click" data-conversion-placement="blog_guidance" data-conversion-variant="guidance" data-conversion-context="blog">Pedir orientação no WhatsApp</a></div></div></section>
    </main>
    <BlogNavSpy />
    <Footer />
  </>;
}
