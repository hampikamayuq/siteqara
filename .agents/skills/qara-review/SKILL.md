---
name: qara-review
description: Revisar código, diffs, branches ou PRs do site institucional QARA antes de merge. Use para bugs, regressões, SEO/GEO, acessibilidade, performance, lifecycle, auth, D1/Drizzle e aderência às regras do projeto.
---

# QARA Review

1. Leia `AGENTS.md` e `README.md` antes de revisar o diff.
2. Compare comportamento pretendido com comportamento implementado e priorize defeitos reais.
3. Verifique regressões funcionais, rotas, metadata, renderização, hydration, acessibilidade, responsividade, performance, links/CTAs e segurança.
4. Audite alterações de lifecycle/build para garantir que scripts próprios não foram contornados por comandos genéricos.
5. Para auth, headers de identidade, D1/Drizzle, bindings, formulários e entradas externas, trate segurança como gate explícito.
6. Procure estados vazios/erro não tratados, código incompleto, duplicação, dependências sem justificativa e mudanças fora do escopo.
7. Conteúdo médico e institucional não pode introduzir alegações não confirmadas.
8. Para cada finding: severidade, arquivo/local, impacto e correção concreta. Separe bloqueadores de sugestões.
9. Se não houver finding material, diga isso e registre testes não executados e riscos residuais.

## Gate de merge

Não recomendar merge com regressão funcional/visual relevante, superfície crítica sem revisão, ou lifecycle incompatível com `README.md`.