---
name: qara-investigate
description: Investigar bugs, regressões, falhas de build/deploy ou comportamento inesperado no site QARA antes de corrigir. Use quando a causa não for óbvia.
---

# QARA Investigate

1. Defina sintoma, impacto, esperado, ambiente e primeira versão conhecida com problema.
2. Reproduza quando possível e preserve evidência.
3. Leia `README.md` antes de atribuir falha a build/runtime; respeite o lifecycle Vinext/Sites.
4. Trace o fluxo relevante: rota, server/client boundary, componente, auth/headers, binding, persistência, build e deploy.
5. Gere poucas hipóteses testáveis e teste uma por vez. Não faça correção especulativa antes de evidência suficiente.
6. Use histórico/diff para localizar regressões quando útil.
7. Ao encontrar a causa, explique mecanismo, condição de disparo e lacuna de teste/observabilidade.
8. Faça a menor correção possível, acrescente teste/check quando viável e revalide a reprodução.
9. Após três tentativas falhas de correção, pare e reavalie a hipótese raiz.

## Saída

Causa raiz, evidência, correção, validação e risco residual.