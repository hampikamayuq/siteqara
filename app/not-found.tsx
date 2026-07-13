import Link from "next/link";
import { Footer, Header } from "./ui";

export default function NotFound() {
  return <><Header/><main id="conteudo" className="status-page"><div className="shell status-inner"><p className="kicker">Página não encontrada</p><h1>Este endereço não está disponível.</h1><p>O conteúdo pode ter mudado de endereço. Você pode voltar ao início, consultar as especialidades ou falar com a equipe.</p><div className="actions"><Link className="button button-primary" href="/">Voltar ao início</Link><a className="button button-secondary" href="https://wa.me/5521992189718" target="_blank" rel="noopener noreferrer">Falar com a equipe</a></div></div></main><Footer/></>;
}
