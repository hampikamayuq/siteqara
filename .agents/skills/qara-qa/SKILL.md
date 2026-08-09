---
name: qara-qa
description: Testar o site institucional QARA após mudanças de UI, navegação, rotas, conteúdo, auth ou integrações. Use antes de PR/merge ou em regressões; priorize browser/computer use quando disponível.
---

# QARA QA

1. Derive casos de teste do diff e dos critérios de aceitação.
2. Respeite o lifecycle descrito em `README.md`; não substitua scripts próprios por comandos genéricos.
3. Quando houver browser/computer use, teste o comportamento real. Sem navegador, faça inspeção estática e marque a limitação.
4. Para UI, teste mobile e desktop: menu, CTAs, links, imagens, formulários, overflow, foco, targets de toque e estados de erro/carregamento.
5. Para auth/headers/bindings/D1, teste caminho feliz, ausência de identidade, entradas inválidas e falha segura quando aplicável.
6. Verifique SEO/GEO, metadata e headings quando afetados.
7. Execute apenas os comandos de validação previstos pelo projeto quando o ambiente permitir; não repita installs/builds que o lifecycle proíbe como pre-checkpoint normal.
8. Registre cada falha com passos, esperado, observado, severidade e evidência.
9. Após correção, reexecute o caso original e pelo menos um caso adjacente.

## Saída

Matriz PASS/FAIL/NOT RUN e riscos residuais.