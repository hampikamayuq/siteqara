# AGENTS.md

## Projeto

Site institucional da Clínica QARA em Vinext/Next/React/Vite. O repositório possui lifecycle de build próprio documentado em `README.md`.

## Regras essenciais

- Tratar todo conteúdo como conteúdo médico público: não inventar alegações, credenciais, métricas, avaliações ou serviços.
- Ler `README.md` antes de alterar build, dependências, runtime, D1/Drizzle, autenticação ou deploy.
- Preservar responsividade, acessibilidade, SEO e performance.
- Trabalhar em branch e PR; não desenvolver diretamente em `main`.

## QARA Agent Skills nativas

Este repositório inclui skills no padrão Agent Skills em `.agents/skills/`. Em hosts OpenAI compatíveis, prefira estas skills por serem específicas do projeto:

- `qara-plan`: planejamento de produto/arquitetura/lifecycle.
- `qara-design`: revisão e implementação visual.
- `qara-review`: revisão de código/diff/PR.
- `qara-qa`: QA funcional, responsivo, auth e SEO/GEO.
- `qara-security`: revisão de auth, headers, D1/Drizzle, bindings e entradas externas.
- `qara-investigate`: causa raiz de bugs/build/deploy.
- `qara-release`: gate final sem merge/deploy automático.

No Codex podem ser chamadas com `$qara-plan`, `$qara-review`, etc., ou selecionadas implicitamente pela descrição.

## gstack

O gstack continua como complemento. No Codex CLI:

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack && ./setup --host codex
```

Se já existir clone do gstack, executar apenas `./setup --host codex` a partir dele.

### Fluxos preferidos

- Feature relevante: `qara-plan`; gstack `office-hours`/`plan-ceo-review`/`plan-eng-review` pode complementar.
- Design/UI: `qara-design`; gstack `design-shotgun`/`design-html` pode complementar exploração.
- Bug: `qara-investigate` antes da correção.
- Review/QA: `qara-review` + `qara-qa`.
- Segurança: `qara-security` para auth, headers de identidade, formulários, bindings, D1/Drizzle, dependências, secrets e entradas externas.
- Performance: `gstack-benchmark` quando houver potencial impacto em bundle, imagens, carregamento ou Core Web Vitals.
- Mudanças amplas: gstack `autoplan` pode complementar sem violar o lifecycle do `README.md`.

## Gates

- Não substituir scripts/lifecycle do repositório por comandos genéricos do agente.
- Revisar e testar as superfícies alteradas antes do PR.
- Alteração visual relevante exige revisão visual.
- Merge/deploy permanece humano; não automatizar `land-and-deploy`.
- Canary pós-deploy é permitido após aprovação humana.
