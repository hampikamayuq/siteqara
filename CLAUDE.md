# Instruções do projeto

Site institucional da Clínica QARA. Stack atual: Vinext/Next/React/Vite, com build validado pelo lifecycle do ambiente Sites.

## Regras do projeto

- Tratar o site como conteúdo médico público: não inventar credenciais, resultados, métricas, avaliações, serviços ou alegações clínicas.
- Preservar consistência visual, responsividade, acessibilidade, SEO técnico e performance.
- Antes de alterar scripts de instalação/build, ler `README.md`; o lifecycle deste repositório tem comandos e limites próprios.
- Não alterar dependências, autenticação, bindings, D1/Drizzle ou infraestrutura sem revisão explícita.
- Trabalhar em branch e PR. Não usar `main` como área de desenvolvimento.

## gstack (REQUIRED — global install)

Antes de trabalho assistido por IA, verificar:

```bash
test -d ~/.claude/skills/gstack/bin && echo "GSTACK_OK" || echo "GSTACK_MISSING"
```

Se faltar:

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup --team
```

Reiniciar o agente após instalar. Usar `/browse` do gstack para navegação web quando disponível.

### Roteamento de skills

- Nova página, feature ou mudança estrutural: `/office-hours` quando o problema precisar ser reenquadrado, depois `/plan-ceo-review` e `/plan-eng-review`.
- UI/branding: `/plan-design-review`; `/design-shotgun` para explorar alternativas; `/design-html` quando aplicável; `/design-review` para auditoria e correção visual.
- Bug: `/investigate` antes de corrigir.
- Revisão: `/review`.
- QA de navegação, mobile, formulários, links, imagens e regressões: `/qa`; `/qa-only` para auditoria sem alterações.
- Segurança: `/cso` é obrigatório ao tocar autenticação, headers de identidade, formulários, dados externos, D1/Drizzle, secrets, bindings ou dependências.
- Performance: `/benchmark` para alterações que possam afetar bundle, imagens, carregamento ou Core Web Vitals.
- Mudanças amplas podem usar `/autoplan`, respeitando sempre as restrições do `README.md` e do ambiente Sites.
- Operações destrutivas: `/careful` e `/guard`.
- `/ship` só pode operar em branch e deve respeitar os scripts nativos do projeto; não substituir o lifecycle por comandos genéricos.
- `/land-and-deploy` não é automático. Merge/deploy exige aprovação humana.
- `/canary` é recomendado após deploy aprovado.

### Gate mínimo antes de PR

1. Ler e respeitar `README.md` quando a mudança envolver build, dependências, runtime ou deploy.
2. Rodar apenas os checks apropriados ao lifecycle atual; `npm test`/`npm run build` quando o contexto exigir validação local.
3. `/review` sem achados críticos pendentes.
4. `/qa` nas páginas e fluxos alterados.
5. `/design-review` para alterações visuais relevantes.
6. `/cso` nas mudanças com superfície de segurança.
7. Conteúdo médico novo ou alterado requer revisão humana antes do merge.
