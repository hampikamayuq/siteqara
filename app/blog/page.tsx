/* eslint-disable @next/next/no-img-element */
import type {Metadata} from "next"; import Link from "next/link"; import {Breadcrumb,Footer,Header} from "../ui"; import {articles} from "./articles";
export const metadata:Metadata={title:"Blog de Dermatologia | Clínica QARA",description:"Informação médica revisada sobre pele, cabelos, unhas, câncer da pele e doenças inflamatórias.",alternates:{canonical:"/blog"}};
const slugify=(c:string)=>c.toLowerCase().replaceAll(" ","-");
function Card({a,featured=false,eager=false}:{a:(typeof articles)[number];featured?:boolean;eager?:boolean}){
  return <article className={featured?"featured":""}><Link className="blog-image" href={`/blog/${a.slug}`}><img src={a.image} alt={a.title} width={1400} height={788} decoding="async" fetchPriority={eager?"high":"auto"} loading={eager?"eager":"lazy"}/></Link><div><span>{a.category} · {a.readTime}</span><h2><Link href={`/blog/${a.slug}`}>{a.title}</Link></h2><p>{a.description}</p><Link href={`/blog/${a.slug}`}>Ler o artigo completo →</Link></div></article>;
}
export default function Blog(){
  const cats=[...new Set(articles.map(a=>a.category))];
  const [featured,...rest]=articles;
  return <><Header current="/blog"/><main id="conteudo"><Breadcrumb>Conteúdo médico</Breadcrumb>
    <section className="blog-hero"><div className="shell"><p className="kicker">Orientação baseada em evidências</p><h1>Entenda os sinais, os exames e as opções de tratamento.</h1><p className="lead">Artigos escritos por dermatologistas da Clínica QARA, com autoria, referências e linguagem clara para pacientes.</p></div></section>
    <section className="shell blog-index">
      <nav aria-label="Navegar pelos temas do blog"><a href="#artigos" aria-current="true">Todos os artigos</a>{cats.map(c=><a href={`#${slugify(c)}`} key={c}>{c}</a>)}</nav>
      <div className="blog-grid" id="artigos"><Card a={featured} featured eager/></div>
      {cats.map(c=>{
        const list=articles.filter(a=>a.category===c);
        return <div className="blog-section" id={slugify(c)} key={c}>
          <h2 className="blog-section-title">{c}<span>{list.length} {list.length===1?"artigo":"artigos"}</span></h2>
          <div className="blog-grid">{list.map(a=><Card a={a} key={a.slug}/>)}</div>
        </div>;
      })}
    </section>
  </main><Footer/></>;
}
