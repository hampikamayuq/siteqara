---
name: qara-release
description: Aplicar gate final antes de abrir, aprovar ou mesclar PR do site institucional QARA. Use quando a mudança estiver pronta para release; não automatize merge/deploy.
---

# QARA Release Gate

1. Confirme branch/PR e ausência de trabalho direto em `main`.
2. Revise o diff final para escopo, secrets, arquivos gerados, dependências e conteúdo não confirmado.
3. Confirme que o lifecycle de `README.md` foi respeitado e que validações apropriadas foram executadas quando o ambiente permite.
4. Mudança visual exige QA/revisão visual; mudança de auth, D1/Drizzle, binding, dependência ou entrada externa exige revisão de segurança.
5. Findings bloqueadores devem estar resolvidos ou aceitos explicitamente por humano.
6. Conteúdo médico/institucional novo deve estar coerente com fatos confirmados e sem promessa indevida.
7. Resuma impacto, risco, rollback e itens NOT RUN.
8. Pode preparar PR/checklist; não fazer merge ou `land-and-deploy` sem instrução humana explícita.
9. Após deploy humano, executar canary nas rotas/fluxos alterados quando houver ferramenta adequada.

## Decisão

Retorne READY, READY WITH RESIDUAL RISK ou NOT READY, com justificativa objetiva.