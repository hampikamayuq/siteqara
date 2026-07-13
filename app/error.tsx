"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main id="conteudo" className="status-page"><div className="shell status-inner" role="alert"><p className="kicker">Não foi possível carregar</p><h1>Ocorreu um problema temporário.</h1><p>Tente novamente. Se o problema continuar, volte ao início ou entre em contato pelo WhatsApp.</p><div className="actions"><button className="button button-primary" type="button" onClick={reset}>Tentar novamente</button><Link className="button button-secondary" href="/">Voltar ao início</Link></div></div></main>;
}
