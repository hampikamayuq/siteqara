---
name: qara-security
description: Auditar segurança do site institucional QARA em mudanças de auth, headers de identidade, formulários, D1/Drizzle, bindings, dependências, secrets, integrações ou infraestrutura. Não use para edição puramente textual sem superfície técnica.
---

# QARA Security

1. Delimite ativos, entradas e fronteiras de confiança da mudança.
2. Considere OWASP Top 10 e STRIDE como checklists. Só gere finding quando houver caminho plausível de exploração.
3. Verifique autenticação/autorização, confiança em headers, validação de retorno/redirect, XSS/injeção, CSRF quando aplicável, CORS, exposição de secrets, D1/Drizzle, bindings, SSRF, dependências e configuração de deploy.
4. Para Sign in with ChatGPT ou headers de identidade, não confunda identidade autenticada com autorização/membership; aplique validação server-side conforme o contexto.
5. Não incluir dados reais, tokens ou credenciais em testes, exemplos, logs ou diffs.
6. Classifique finding por impacto e explorabilidade; inclua evidência, cenário de abuso, correção mínima e teste de regressão.
7. Se não houver novo risco material, registre explicitamente.

## Gate

Finding alto/crítico bloqueia merge até correção ou aceitação humana explícita.