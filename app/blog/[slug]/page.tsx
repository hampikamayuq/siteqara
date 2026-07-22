/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, CtaBand, Footer, Header, portraitSrcSet } from "../../ui";
import { articles, getArticle, isoDate } from "../articles";
import { articleContent } from "../article-content";
import { evidence } from "../article-evidence";

export function generateStaticParams() { return articles.map(article => ({ slug: article.slug })); }

const SPECIALTY: Record<string, [string, string]> = {
  "Câncer da pele": ["Cirurgia dermatológica", "/cirurgia-dermatologica"],
  "Cirurgia": ["Cirurgia dermatológica", "/cirurgia-dermatologica"],
  "Cabelos": ["Cabelos e couro cabeludo", "/cabelo"],
  "Unhas": ["Doenças das unhas", "/unhas"],
  "Doenças inflamatórias": ["Doenças inflamatórias", "/doencas-inflamatorias"],
  "Dermatologia estética": ["Dermatologia estética", "/dermatologia-estetica"],
  "Dermatopediatria": ["Dermatopediatria", "/dermatopediatria"],
  "Dermatologia clínica": ["Dermatologia clínica", "/dermatologia-clinica"],
};

const PREPARATION: Record<string, string> = {
  "Câncer da pele": "Se possível, observe há quanto tempo a lesão existe e leve fotografias que mostrem sua evolução. Informe histórico pessoal e familiar de câncer da pele e procedimentos prévios na região.",
  "Cirurgia": "Leve a lista de medicamentos, alergias e laudos anteriores. Não suspenda anticoagulantes ou outros remédios por conta própria; o preparo depende do procedimento e das suas condições clínicas.",
  "Cabelos": "Leve exames anteriores, a lista de medicamentos e suplementos e fotografias da evolução. Evite penteados que escondam o couro cabeludo no dia da avaliação.",
  "Unhas": "Retire esmaltes antes da consulta, quando possível, e leve resultados de exames micológicos ou tratamentos já realizados. Não lixe ou corte excessivamente a área alterada.",
  "Doenças inflamatórias": "Anote a duração e a frequência das crises, medicamentos já usados e possíveis sintomas nas articulações. Fotografias ajudam quando as lesões variam entre os dias.",
  "Dermatologia estética": "Conte quais procedimentos já realizou, produtos em uso, alergias e o resultado que espera. A avaliação presencial define limites, alternativas e um plano coerente com sua anatomia.",
  "Dermatopediatria": "Leve a caderneta de saúde, a lista de produtos e medicamentos usados e fotografias das crises. A conversa inclui os responsáveis e respeita o tempo da criança.",
  "Dermatologia clínica": "Leve a lista de medicamentos e produtos em uso, exames anteriores e fotografias da evolução. Evite iniciar tratamentos novos imediatamente antes da consulta, salvo orientação médica.",
};

const AUTHOR_IMAGES: Record<string, [string, number, number]> = {
  "/equipe/dr-diego-galvez": ["/images/dr-diego.webp", 1351, 1672],
  "/equipe/dra-diana-stohmann": ["/images/dra-diana.webp", 1200, 1423],
  "/equipe/dra-manuela-pedretti": ["/images/dra-manuela.webp", 852, 1280],
  "/equipe/dr-miguel-ceccarelli": ["/images/dr-miguel.webp", 1000, 1300],
  "/equipe/dr-fabricio-de-andrade": ["/images/dr-fabricio-de-andrade.webp", 1023, 1537],
};

const sectionId = (title: string) => title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const responsiveCover = (src: string) => src.replace(/\.webp$/, "-640.webp") + " 640w, " + src.replace(/\.webp$/, "-1024.webp") + " 1024w, " + src + " 1400w";
const credentials = (author: (typeof evidence)[string]["author"]) => [author.crm, author.rqe, author.qualification].filter(Boolean).join(" · ");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article ? {
    title: `${article.title} | Clínica QARA`,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description, publishedTime: isoDate(article.date), images: [{ url: article.image, width: 1400, height: 788, alt: article.title }] },
  } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const sections = articleContent[slug];
  const ev = evidence[slug];
  if (!sections || !ev) notFound();
  const authorImage = AUTHOR_IMAGES[ev.author.url];
  const sameCategory = articles.filter(item => item.category === article.category && item.slug !== article.slug);
  const related = [...sameCategory, ...articles.filter(item => item.category !== article.category && item.slug !== article.slug)].slice(0, 3);
  const specialty = SPECIALTY[article.category];
  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Article"],
    headline: article.title,
    description: article.description,
    datePublished: isoDate(article.date),
    dateModified: isoDate(article.date),
    inLanguage: "pt-BR",
    url: `https://clinicaqara.com.br/blog/${article.slug}`,
    mainEntityOfPage: `https://clinicaqara.com.br/blog/${article.slug}`,
    image: `https://clinicaqara.com.br${article.image}`,
    author: {
      "@type": "Physician",
      name: ev.author.name,
      medicalSpecialty: ev.author.specialties ?? ["Dermatology"],
      identifier: [ev.author.crm, ev.author.rqe].filter(Boolean),
      url: `https://clinicaqara.com.br${ev.author.url}`,
    },
    publisher: { "@type": "MedicalClinic", name: "Clínica QARA", url: "https://clinicaqara.com.br" },
    citation: ev.references.map(([, url]) => url),
  };

  const toc = <>{sections.map(([title]) => <a href={`#${sectionId(title)}`} key={title}>{title}</a>)}<a href="#consulta">Como se preparar</a><a href="#fontes">Referências</a></>;

  return <>
    <Header current="/blog" />
    <main id="conteudo">
      <Breadcrumb trail={[["Conteúdo", "/blog"], [article.title, ""]]}><Link href="/blog">Conteúdo</Link><span>/</span>{article.category}</Breadcrumb>
      <article className="article-page">
        <header className="article-header shell">
          <p className="kicker">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="lead">{article.description}</p>
          <div className="article-meta"><span>Por <Link href={ev.author.url}>{ev.author.name}</Link> · {credentials(ev.author)}</span><span>Atualizado em {article.date}</span><span>{article.readTime} de leitura</span></div>
        </header>
        <figure className="article-cover"><img src={article.image} srcSet={responsiveCover(article.image)} sizes="100vw" width={1400} height={788} fetchPriority="high" alt={`Imagem clínica ilustrativa: ${article.title}`} /><figcaption>Imagem ilustrativa. A apresentação clínica varia entre pacientes.</figcaption></figure>

        <details className="article-mobile-toc shell"><summary>Neste artigo</summary><nav aria-label="Conteúdo deste artigo">{toc}</nav></details>

        <div className="shell article-layout">
          <aside><strong>Conteúdo deste artigo</strong>{toc}</aside>
          <div className="article-body">
            <p className="article-introduction">Condições diferentes podem produzir sinais semelhantes. Este conteúdo ajuda a compreender as possibilidades, mas o diagnóstico depende da história clínica e do exame dermatológico.</p>
            <div className="key-points"><h2>Pontos principais</h2><ul>{article.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></div>

            {sections.map(([title, paragraphs], index) => <section id={sectionId(title)} key={title}>
              <h2>{title}</h2>
              {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              <div className="inline-citations" aria-label="Fontes desta seção"><span>Fontes desta seção</span>{ev.sectionCitations[index].map(number => <a href={`#ref-${number}`} key={number} aria-label={`Ver referência ${number}`}>[{number}]</a>)}</div>
            </section>)}

            <section id="consulta"><h2>Como se preparar para a consulta</h2><p>{PREPARATION[article.category] ?? PREPARATION["Dermatologia clínica"]}</p></section>
            <div className="warning-box"><strong>Quando procurar avaliação</strong><p>{article.warning}</p></div>
            <section className="medical-note"><h2>Nota médica</h2><p>Este conteúdo tem finalidade educativa e não substitui consulta, exame físico ou diagnóstico individual. Tratamentos e exames devem ser indicados por profissional habilitado.</p></section>

            <section className="article-author-profile">
              {authorImage && <img src={authorImage[0]} srcSet={portraitSrcSet[authorImage[0]]} sizes="96px" width={authorImage[1]} height={authorImage[2]} alt="" loading="lazy" decoding="async" />}
              <div><span>Autoria médica</span><h2>{ev.author.name}</h2><p>{credentials(ev.author)}</p><Link href={ev.author.url}>Conhecer formação e áreas de atuação →</Link></div>
            </section>

            <section className="references" id="fontes"><h2>Referências</h2><ol>{ev.references.map(([title, url], index) => <li id={`ref-${index + 1}`} key={url}><a href={url} target="_blank" rel="noreferrer">{title}</a></li>)}</ol></section>
          </div>
        </div>

        <section className="article-related shell"><div className="article-related-heading"><div><h2>Continue a leitura.</h2><p>Conteúdo relacionado, com autoria médica e referências.</p></div>{specialty && <Link href={specialty[1]}>Conhecer {specialty[0].toLowerCase()} <span aria-hidden="true">→</span></Link>}</div><div>{related.map(item => <article key={item.slug}><Link className="related-image" href={`/blog/${item.slug}`} aria-label={`Ler ${item.title}`}><img src={item.image} srcSet={responsiveCover(item.image)} sizes="(max-width: 700px) 100vw, 33vw" width={1400} height={788} alt="" loading="lazy" decoding="async" /></Link><span>{item.category} · {item.readTime}</span><h3><Link href={`/blog/${item.slug}`}>{item.title}</Link></h3></article>)}</div><Link className="back-blog" href="/blog">← Ver todos os artigos</Link></section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </article>
      <CtaBand />
    </main>
    <Footer />
  </>;
}
