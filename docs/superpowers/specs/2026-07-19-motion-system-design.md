# Sistema de movimento — Clínica QARA

## Objetivo

Adicionar movimento ao site inteiro sem comprometer a serenidade, a legibilidade ou o posicionamento médico premium. A direção combina uma base sutil com pequenos acentos editoriais, evitando efeitos chamativos ou decorativos sem função.

## Princípios

- O movimento deve reforçar hierarquia, continuidade e resposta às ações do usuário.
- Nenhuma animação pode atrasar acesso ao conteúdo ou bloquear interação.
- Cada seção anima apenas na primeira entrada no viewport.
- Movimentos devem ser menores em telas móveis e desativados quando `prefers-reduced-motion: reduce` estiver ativo.
- O conteúdo permanece totalmente visível e funcional se JavaScript falhar.

## Sistema de animação

### Entrada de seções

Seções editoriais entram com combinação de opacidade e deslocamento vertical de 18–24 px. A duração varia de 500 a 700 ms, com easing natural e sem rebote. Títulos, textos e elementos relacionados podem usar stagger curto de 60–100 ms quando a sequência melhora a leitura.

### Hero

A fotografia do hero recebe deslocamento vertical muito leve durante a rolagem, limitado para não criar enjoo ou recortes inadequados. O texto usa uma entrada inicial suave em sequência. Em dispositivos móveis, o deslocamento contínuo é removido e permanece apenas a entrada inicial.

### Acentos editoriais

Faixas destacadas, fotografias editoriais e blocos assimétricos podem usar revelação lateral curta, entre 16 e 28 px. O efeito será reservado a poucos componentes por página para manter contraste com as entradas verticais predominantes.

### Microinterações

- Imagens e cards: zoom de 2–3% no hover, com duração aproximada de 500 ms.
- Botões: transição de cor, borda e deslocamento de 1–2 px; estado ativo tátil e discreto.
- Links com seta: deslocamento horizontal curto da seta no hover e no foco.
- Mega menu: entrada por opacidade e deslocamento vertical curto.
- Elementos interativos preservam estados de foco claramente visíveis.

## Arquitetura

O sistema será centralizado em um pequeno componente cliente de revelação por viewport, baseado em `IntersectionObserver`, e em classes CSS reutilizáveis. Variantes previstas: entrada vertical, entrada lateral esquerda/direita e stagger de filhos. Efeitos contínuos do hero serão isolados para não provocar rerenders do restante da página e deverão usar `requestAnimationFrame` quando necessários.

O conteúdo deve ser renderizado inicialmente em posição normal. A ocultação pré-animação só será aplicada após o cliente confirmar suporte, evitando conteúdo invisível em falhas de hidratação ou JavaScript.

## Responsividade e acessibilidade

- Em telas pequenas, distâncias e duração serão reduzidas e o parallax será removido.
- Em `prefers-reduced-motion: reduce`, transformações e animações não essenciais serão desativadas; mudanças de estado permanecerão instantâneas ou quase instantâneas.
- Não haverá movimento automático infinito, cursor personalizado ou efeitos que sigam o ponteiro.
- Transformações não alterarão a ordem de leitura, o foco ou o tamanho dos alvos de toque.

## Desempenho

- Animar somente `transform` e `opacity` sempre que possível.
- Não adicionar biblioteca externa de animação.
- Observadores serão compartilhados ou desconectados após a primeira revelação.
- O efeito do hero será limitado e não executará em dispositivos com preferência por movimento reduzido.
- Imagens manterão dimensões declaradas para evitar mudança de layout.

## Aplicação por superfície

- Homepage: hero, títulos de seção, cards de especialidades, equipe, artigos, depoimento e localização.
- Páginas de especialidade: hero, lista de condições, etapas do cuidado, faixa do especialista, FAQ e leituras relacionadas.
- Equipe: cabeçalho, perfis e credenciais.
- Blog: navegação temática, cards e cabeçalhos dos artigos; o corpo do texto terá movimento mínimo para preservar leitura longa.
- Cabeçalho: mega menu e menu móvel com transições curtas e previsíveis.

## Verificação

- Testar desktop e celular, inclusive zoom e navegação por teclado.
- Confirmar ausência de overflow horizontal e mudanças de layout.
- Verificar o site com JavaScript indisponível e com `prefers-reduced-motion` ativo.
- Validar que menus, âncoras, accordions, botões e links continuam funcionando.
- Executar build e inspeção visual das rotas principais antes da publicação.

## Critérios de aceite

O site deve parecer mais vivo e editorial, mas continuar sereno. As animações não devem competir com o conteúdo, atrasar ações, prejudicar leitura ou produzir desconforto. A experiência móvel deve permanecer fluida e os usuários que reduzem movimento devem receber uma versão estável e praticamente estática.
