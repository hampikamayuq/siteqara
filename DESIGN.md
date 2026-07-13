---
name: "Clínica QARA"
description: "Precisão dermatológica com presença humana."
colors:
  graphite: "#404041"
  ink: "#29292A"
  taupe: "#A28A7F"
  blush: "#FDE6DC"
  blush-soft: "#FFF1EB"
  gray-050: "#F1F1F2"
  gray-200: "#D0D2D3"
  gray-600: "#7A7A7A"
  copy: "#5F5F61"
  white: "#FFFFFF"
  focus: "#735F56"
typography:
  display:
    fontFamily: "Roboto Slab, Georgia, serif"
    fontSize: "clamp(2.75rem, 5.4vw, 5.6rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Roboto Slab, Georgia, serif"
    fontSize: "clamp(2rem, 3.8vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Roboto, Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Roboto, Arial, Helvetica, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.14em"
rounded:
  surface: "24px"
  compact: "12px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "48px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "15px 24px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "15px 24px"
    typography: "{typography.label}"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.surface}"
    padding: "27px"
  mobile-nav-item:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    height: "52px"
    typography: "{typography.body}"
---

# Design System: Clínica QARA

## Overview

**Creative North Star: “Precisão que acolhe”**

O sistema traduz uma consulta dermatológica bem conduzida: claro, silencioso, organizado e humano. A precisão aparece na hierarquia, nas linhas finas, no espaço e na consistência; o acolhimento vem da fotografia, dos tons rosados discretos e da linguagem direta.

É uma marca clínica contemporânea, não um spa e não uma empresa de tecnologia. Sofisticação deve resultar de proporção e conteúdo confiável, sem dourado ostensivo, excesso de decoração ou promessas publicitárias.

**Características principais:**

- Hierarquia tipográfica serena com Roboto Slab e Roboto.
- Base branca e grafite, com taupe e blush como acentos contidos.
- Fotografia realista, natural, respeitosa e clinicamente plausível.
- Layout amplo no desktop e reordenação de coluna única no celular.
- Conversão clara pelo WhatsApp, sem interromper a leitura.

## Colors

A paleta combina neutralidade clínica com calor controlado; o taupe orienta e o blush acolhe, mas nenhum dos dois domina o conteúdo.

### Primary

- **Grafite clínico** (`#404041`): superfícies escuras, CTA principal e rodapé.
- **Tinta profunda** (`#29292A`): títulos e texto de maior ênfase.

### Secondary

- **Taupe humano** (`#A28A7F`): detalhes de marca, credenciais, links e divisores.
- **Blush de cuidado** (`#FDE6DC`): acento suave em áreas selecionadas.
- **Blush ambiente** (`#FFF1EB`): fundos editoriais e seções de respiro.

### Neutral

- **Branco clínico** (`#FFFFFF`): fundo principal e superfícies.
- **Névoa neutra** (`#F1F1F2`): fundos de apoio.
- **Linha suave** (`#D0D2D3`): bordas e separadores.
- **Texto corrente** (`#5F5F61`): parágrafos e descrições.
- **Cinza auxiliar** (`#7A7A7A`): metadados não essenciais.
- **Foco taupe profundo** (`#735F56`): foco visível e links de maior contraste.

**Regra do calor contido.** Taupe e blush apoiam a experiência; não converter toda a interface em bege, rosado ou “estética de spa”.

## Typography

**Display Font:** Roboto Slab, com Georgia como fallback.  
**Body Font:** Roboto, com Arial e Helvetica como fallbacks.

**Caráter:** a Slab adiciona presença e autoridade sem parecer cerimonial; a Roboto mantém leitura médica clara em telas pequenas e textos longos.

### Hierarchy

- **Display** (400, `clamp(2.75rem, 5.4vw, 5.6rem)`, 1.04): títulos hero; espaçamento mínimo `-0.04em`.
- **Headline** (400, `clamp(2rem, 3.8vw, 3.6rem)`, 1.12): títulos de seção e chamadas editoriais.
- **Title** (600, `1.08rem`, 1.35): cartões, perguntas e subtítulos compactos.
- **Body** (400, `1rem`, 1.7): texto corrido, limitado preferencialmente a 65–75 caracteres por linha.
- **Label** (600, `0.8rem`, `0.14em`): kicker pontual, credenciais e metadados curtos.

**Regra da voz médica.** Títulos podem ser expressivos; parágrafos devem permanecer simples, objetivos e confortáveis em zoom ampliado.

## Elevation

O sistema é plano por padrão. Profundidade vem de contraste tonal, fotografia, bordas finas e sobreposição funcional do cabeçalho. A sombra ambiente existente (`0 20px 55px rgba(64, 64, 65, .08)`) é reservada a estados interativos específicos e não deve ser combinada com bordas decorativas pesadas.

### Shadow Vocabulary

- **Ambiente discreto** (`0 20px 55px rgba(64, 64, 65, .08)`): hover de elementos que realmente elevam; nunca aplicar em série a todos os cartões.
- **Cabeçalho sobreposto:** fundo branco a 94% com `backdrop-filter: blur(14px)` e linha inferior sutil; uso exclusivamente funcional.

**Regra plana por padrão.** Superfícies estáticas não precisam parecer flutuantes.

## Components

### Buttons

- **Shape:** pill (`999px`) para ações; nunca usar esse raio em cartões.
- **Primary:** grafite, texto branco, `15px 24px`, peso 600.
- **Secondary:** branco ou transparente com borda neutra fina.
- **Hover / Focus:** mudança tonal discreta; foco de `3px solid #735F56` com offset de `4px`.
- **Touch:** altura interativa mínima de 44 px.

### Cards / Containers

- **Corner Style:** `24px` apenas onde já está consolidado; cartões novos devem preferir 12–16 px quando o conteúdo não exigir continuidade com o legado.
- **Background:** branco, névoa neutra ou blush ambiente conforme a narrativa.
- **Shadow Strategy:** plana por padrão; sombra apenas como resposta de estado.
- **Border:** `1px solid #D0D2D3` quando a separação tonal não basta.
- **Internal Padding:** 24–33 px; reduzir proporcionalmente em celular.

### Navigation

- Cabeçalho sticky branco translúcido, wordmark à esquerda, links centrais e WhatsApp à direita no desktop.
- Abaixo de 900 px, substituir links por menu nativo em `details/summary`.
- No celular, painel de largura total, itens de 52 px e CTA do WhatsApp de pelo menos 48 px.
- Não ocultar destinos essenciais nem depender de hover.

### Article and Evidence Pattern

- Capa 16:9 com dimensão intrínseca, legenda que identifica natureza ilustrativa e carregamento prioritário.
- Autoria médica, CRM, RQE e atualização próximos do título.
- Corpo com introdução, pontos principais, seções clínicas, alertas, nota médica e referências numeradas.
- Imagens internas em WebP, carregamento tardio e texto alternativo contextual.

### Specialty Page Pattern

- Hero com promessa clínica clara, fotografia do especialista e CTA direto.
- Sequência: contexto, condições atendidas, processo clínico, especialista, perguntas frequentes, conteúdo relacionado e CTA final.
- Reutilizar `specialty-template.tsx` e `specialties-data.ts`; não duplicar estrutura por rota.

## Do's and Don'ts

### Do:

- **Do** preservar `#404041`, `#A28A7F`, `#FDE6DC`, Roboto e Roboto Slab como identidade central.
- **Do** usar fotografias reais ou geradas em WebP, clinicamente plausíveis, dignas e não gráficas.
- **Do** manter alvos de toque de pelo menos 44 × 44 px e foco visível de 3 px.
- **Do** definir dimensões intrínsecas, `sizes`, prioridade para LCP e lazy loading fora da primeira dobra.
- **Do** manter artigos com autoria correta, CRM/RQE, citações numeradas e fontes verificáveis.
- **Do** adaptar o layout por conteúdo: 900 px para tablet/menu e 620 px para telefone.

### Don't:

- **Don't** usar comunicação promocional agressiva, sensacionalismo médico ou garantias de resultado.
- **Don't** transformar o site em catálogo de cards idênticos ou empilhar cartões dentro de cartões.
- **Don't** usar estética genérica de spa, excesso de bege, dourado ostensivo, neon, gradientes decorativos ou glassmorphism.
- **Don't** usar `border-left` ou `border-right` maior que 1 px como faixa decorativa.
- **Don't** combinar borda fina com sombra larga em cartões, nem usar raio acima de 16 px em novos cartões sem justificativa de continuidade.
- **Don't** usar imagens gráficas, constrangedoras ou que exponham pacientes desnecessariamente.
- **Don't** inventar credenciais, revisores, referências, resultados ou depoimentos.
- **Don't** bloquear zoom, esconder funcionalidade principal no celular ou depender de hover.
