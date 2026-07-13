# Clínica QARA — Contexto do Produto

## Produto

Website institucional e editorial da Clínica QARA, clínica dermatológica localizada em Copacabana, Rio de Janeiro. O site apresenta a clínica, o corpo clínico, as especialidades e conteúdo médico educativo, conduzindo pacientes para agendamento pelo WhatsApp.

## Plataforma

web

## Registro

brand

## Objetivo principal

Transformar visitantes com uma necessidade dermatológica em contatos qualificados, transmitindo confiança clínica antes do agendamento. A conversão principal é o clique em “Agendar pelo WhatsApp”; localização, artigos e perfis médicos apoiam essa decisão.

## Públicos prioritários

- Adultos que procuram dermatologia clínica, cirurgia dermatológica, oncologia cutânea, tricologia, doenças das unhas, doenças inflamatórias ou dermatologia estética.
- Famílias que procuram dermatopediatria.
- Pacientes no Rio de Janeiro, especialmente Copacabana e Zona Sul.
- Pacientes de outras regiões atendidos por telemedicina quando clinicamente apropriado.
- Turistas e estrangeiros que valorizam atendimento em português, espanhol ou inglês.

## Proposta de valor

Conhecimento que cuida e presença que transforma. A QARA combina precisão diagnóstica, atualização científica, segurança em procedimentos e atendimento individualizado, sem promessas de resultado nem comunicação alarmista.

## Personalidade da marca

- Precisa, serena e acolhedora.
- Contemporânea, sem parecer tecnológica ou impessoal.
- Sofisticada por proporção, tipografia e fotografia, não por excesso decorativo.
- Médica e responsável, mas compreensível para pacientes.

## Arquitetura de informação

- Homepage: posicionamento, especialidades, princípios, especialistas, clínica, informações práticas, localização e conversão.
- Especialidades: dermatologia clínica, cirurgia dermatológica, cabelos, unhas, doenças inflamatórias, dermatopediatria e dermatologia estética.
- Especialistas: apresentação profissional, credenciais e áreas de atuação.
- Blog: educação médica baseada em evidências, organizada por temas e vinculada ao profissional responsável.
- Contato: WhatsApp, endereço e orientação para escolha do especialista.

## Conteúdo médico

- Todo artigo deve ter autoria médica coerente com a área de atuação, CRM e RQE visíveis.
- A Clínica QARA é a editora; não atribuir revisão a quem não a realizou formalmente.
- Citações numeradas devem apontar para referências específicas e verificáveis.
- Priorizar diretrizes, consensos, revisões sistemáticas e periódicos de alto impacto.
- Incluir finalidade educativa e explicar que conteúdo não substitui consulta, exame físico ou diagnóstico individual.
- Imagens clínicas geradas são ilustrativas, realistas, respeitosas e não gráficas; não devem ser interpretadas como diagnóstico.

## Conversão e confiança

- CTA principal: “Agendar pelo WhatsApp”.
- CTAs secundários: conhecer especialidade, conhecer especialista, ver localização e ler conteúdo relacionado.
- Credenciais, autoria, referências, endereço e linguagem cuidadosa reduzem incerteza antes do contato.
- O WhatsApp deve permanecer acessível no desktop e no menu móvel.

## Requisitos de experiência

- Navegação completa por teclado e toque.
- Alvos interativos de pelo menos 44 × 44 px para dispositivos de toque.
- Zoom do navegador nunca deve ser bloqueado.
- Layout funcional a partir de 320 px, com reordenação lógica em tablet e desktop.
- Respeitar `prefers-reduced-motion`.
- Texto corrido legível, com contraste WCAG AA e linhas de até aproximadamente 70 caracteres.

## Requisitos de desempenho e SEO

- Imagens em WebP, dimensões intrínsecas definidas e carregamento tardio fora da primeira dobra.
- Imagem LCP prioritária; evitar JavaScript desnecessário.
- Fontes locais subsetadas e `font-display: swap`.
- Metadados únicos, hierarquia semântica, links internos e dados estruturados médicos.
- Artigos usam `MedicalWebPage`; autores usam `Physician`; a clínica usa `MedicalClinic`.

## Tecnologia atual

- Next.js 16, React 19 e TypeScript.
- Build Vinext/Vite para hospedagem atual do protótipo.
- CSS global com tokens em `app/globals.css`.
- Componentes compartilhados em `app/ui.tsx`.
- Conteúdo de especialidades em `app/specialties-data.ts` e artigos em `app/blog/`.

## Restrições e anti-referências

- Não usar comunicação promocional agressiva, sensacionalismo médico ou garantias de resultado.
- Não transformar o site em catálogo de cards idênticos.
- Evitar estética genérica de spa, excesso de bege, dourado ostensivo, neon, gradientes decorativos e glassmorphism.
- Não usar imagens gráficas, constrangedoras ou que exponham pacientes desnecessariamente.
- Não inventar credenciais, revisores, referências ou depoimentos.
- Preservar a paleta, Roboto/Roboto Slab e o caráter visual já aprovado.

## Critérios de sucesso

- Aumento de contatos qualificados pelo WhatsApp.
- Maior descoberta orgânica das páginas de especialidade e artigos.
- Boa leitura e navegação em celulares Android e iOS.
- Core Web Vitals estáveis, sem deslocamentos perceptíveis causados por imagens.
- Conteúdo percebido como confiável, claro e clinicamente responsável.
