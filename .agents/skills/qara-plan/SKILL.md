---
name: qara-plan
description: Planejar features, refactors ou mudanças relevantes no site institucional da Clínica QARA antes de implementar. Use para produto, arquitetura, SEO/GEO, integrações, D1/Drizzle, autenticação ou mudanças com múltiplos arquivos.
---

# QARA Plan

1. Leia `AGENTS.md` e `README.md`; depois leia os arquivos diretamente afetados.
2. Preserve o lifecycle Vinext/Sites documentado no repositório. Não substitua scripts próprios por fluxo genérico de agente.
3. Reformule a tarefa como resultado verificável para paciente, operação ou marketing, distinguindo fatos confirmados de hipóteses.
4. Escolha a menor solução compatível com a arquitetura atual; evite dependências e abstrações novas sem necessidade.
5. Avalie impacto em SEO, GEO, acessibilidade, responsividade, performance, autenticação, bindings e persistência quando aplicável.
6. Conteúdo médico público não pode inventar credenciais, métricas, avaliações, serviços ou promessa de resultado.
7. Produza: objetivo, escopo, fora de escopo, arquivos/camadas, fluxo de dados, riscos, critérios de aceitação, testes, segurança e rollback.
8. Para auth, D1/Drizzle, bindings, infraestrutura ou entrada externa, incluir explicitamente revisão de segurança.
9. Não implementar junto quando houver risco alto ou ambiguidade material, salvo pedido explícito de execução end-to-end.

## Gate

Cada critério de aceitação deve ter forma objetiva de verificação.