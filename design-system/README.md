# Clínica QARA — Design System package

Componentes aislados y previsualizables del sistema de diseño de la Clínica QARA,
listos para subir a **Claude Design** con `/design-sync`.

## Fuente de la verdad

El sistema real vive en el código del sitio:

- **Tokens:** `app/globals.css` (variables `--qara-*`, espaciado, radios, sombra)
- **Componentes React:** `app/ui.tsx` (Header, Footer, SectionHeading, CtaBand, Breadcrumb)
- **Referencia viva en el sitio:** ruta `/design-system` (`app/design-system/page.tsx`)
- **Especificación:** `DESIGN.md` en la raíz del repo

Este paquete es una **copia previsualizable** de ese sistema. Cada archivo `.html`
es autocontenido (tokens y estilos en línea) para que renderice de forma aislada
como tarjeta en el panel de Design System de Claude Design.

## Estructura

```
design-system/
├── foundations/
│   ├── colors.html        Paleta: primárias, acentos, neutros
│   ├── typography.html     Escala Telegraf / Roboto
│   ├── spacing.html        Escala de espaçamento
│   ├── radii.html          Surface / Compact / Pill
│   └── elevation.html      Plano por defecto + sombra ambiente
└── components/
    ├── buttons.html        Primary, secondary, light, outline-light
    ├── service-card.html   Cartão de especialidade
    ├── labels.html         Eyebrow, kicker, credential, text-link
    ├── section-heading.html
    ├── cta-band.html
    ├── faq-item.html       details/summary accesible
    ├── blockquote.html
    ├── header-nav.html
    └── footer.html
```

## Marcador de tarjeta

Cada preview declara su tarjeta en la primera línea:

```html
<!-- @dsCard group="Foundations" name="Colors" -->
```

`/design-sync` compila estos marcadores en el índice del panel de Design System.

## Cómo sincronizar

Desde la raíz del repo, en Claude Code, ejecuta el comando (solo tú puedes dispararlo):

```
/design-sync
```

El sistema aparecerá bajo **Design systems** en claude.ai para tu organización.
El código sigue siendo la fuente de la verdad; Claude Design es la capa visual.
