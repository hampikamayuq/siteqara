# AGENTS.md

## Projeto

Site institucional da Clínica QARA em Vinext/Next/React/Vite. O repositório possui lifecycle de build próprio documentado em `README.md`.

## Regras essenciais

- Tratar todo conteúdo como conteúdo médico público: não inventar alegações, credenciais, métricas, avaliações ou serviços.
- Ler `README.md` antes de alterar build, dependências, runtime, D1/Drizzle, autenticação ou deploy.
- Preservar responsividade, acessibilidade, SEO e performance.
- Trabalhar em branch e PR; não desenvolver diretamente em `main`.

## gstack

No Codex CLI:

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack && ./setup --host codex
```

Se já existir clone do gstack, executar apenas `./setup --host codex` a partir dele.

### Fluxos preferidos

- Feature relevante: `gstack-office-hours` quando necessário, `gstack-plan-ceo-review`, `gstack-plan-eng-review`, implementação, `gstack-review`, `gstack-qa`.
- Design/UI: `gstack-plan-design-review`, `gstack-design-shotgun`, `gstack-design-html` quando aplicável e `gstack-design-review`.
- Bug: `gstack-investigate` antes da correção.
- Segurança: `gstack-cso` para auth, headers de identidade, formulários, bindings, D1/Drizzle, dependências, secrets e entradas externas.
- Performance: `gstack-benchmark` quando houver potencial impacto em bundle, imagens, carregamento ou Core Web Vitals.
- Mudanças amplas: `gstack-autoplan`, sem violar o lifecycle descrito no `README.md`.

## Gates

- Não substituir scripts/lifecycle do repositório por comandos genéricos do agente.
- Revisar e testar as superfícies alteradas antes do PR.
- Alteração visual relevante exige revisão visual.
- Merge/deploy permanece humano; não automatizar `land-and-deploy`.
- Canary pós-deploy é permitido após aprovação humana.
