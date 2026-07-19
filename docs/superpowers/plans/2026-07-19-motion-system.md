# Premium Motion System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a restrained, accessible site-wide motion system with editorial accents to the Clínica QARA website.

**Architecture:** A single client-side `MotionController` progressively enhances server-rendered markup by observing semantic CSS selectors and adding motion state classes. CSS owns visual timing and variants, while JavaScript only coordinates viewport entry and the bounded desktop hero offset.

**Tech Stack:** React 19, Next.js 16/Vinext, TypeScript, native IntersectionObserver, requestAnimationFrame, CSS transforms and opacity, Node test runner.

## Global Constraints

- Do not add an animation library.
- Animate `transform` and `opacity` whenever possible.
- Content must remain visible and functional without JavaScript.
- Each reveal runs only once.
- Disable nonessential movement under `prefers-reduced-motion: reduce`.
- Remove continuous hero movement on mobile and preserve visible keyboard focus.

---

### Task 1: Motion behavior contract

**Files:**
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: rendered homepage worker output and `app/globals.css`.
- Produces: regression coverage for the motion controller, progressive enhancement, reduced motion, and mobile behavior.

- [ ] **Step 1: Write the failing tests**

Add assertions that rendered HTML contains `data-motion-root`, that CSS contains `.motion-ready`, `prefers-reduced-motion: reduce`, and the mobile rule disabling hero parallax, and that the controller source uses `IntersectionObserver`.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test`

Expected: FAIL because the motion controller and styles do not exist yet.

- [ ] **Step 3: Commit the test contract with the implementation milestone**

The test and implementation ship together after Tasks 2–3 pass to avoid leaving the branch intentionally broken.

### Task 2: Progressive enhancement controller

**Files:**
- Create: `app/motion-controller.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `MotionController(): null`, mounted once by `RootLayout`.
- DOM contract: `document.documentElement` receives `motion-ready`; observed elements receive `motion-item` plus a variant and finally `is-visible`; the hero media receives the CSS custom property `--hero-shift`.

- [ ] **Step 1: Implement `MotionController`**

Create a client component that exits immediately for reduced-motion users, assigns reveal classes to curated selectors, applies stagger indices to repeated children, observes each element once, and disconnects after revealing. Add a passive scroll listener for desktop hero media, scheduled through `requestAnimationFrame`, clamped to a small offset.

- [ ] **Step 2: Mount the controller once**

Import and render `<MotionController />` near the end of `RootLayout`, before the existing menu behavior script.

- [ ] **Step 3: Preserve no-JavaScript rendering**

Only `.motion-ready .motion-item:not(.is-visible)` may hide or transform content. Plain server output remains visible.

### Task 3: Motion design tokens and component treatments

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: controller classes and `--motion-index`/`--hero-shift` properties.
- Produces: reveal-up, reveal-left, reveal-right, stagger, hover zoom, CTA/link response, menu transition, mobile reduction, and reduced-motion overrides.

- [ ] **Step 1: Add shared motion tokens**

Define durations between 350–700 ms, a smooth editorial easing curve, reveal distances of 18–24 px, and stagger delay capped to avoid slow pages.

- [ ] **Step 2: Add viewport reveal variants**

Implement vertical and lateral transforms scoped under `.motion-ready`, with `will-change` removed after visibility and no layout-affecting properties.

- [ ] **Step 3: Add microinteractions**

Enhance buttons, cards, image wrappers, arrows, mega menu, and mobile menu with subtle transforms and transitions while retaining current focus styles.

- [ ] **Step 4: Add responsive and accessibility overrides**

At mobile widths, shorten distances and disable hero shift. Under `prefers-reduced-motion: reduce`, remove animation, transition, scroll behavior, and transforms globally for the motion system.

### Task 4: Verification and publication readiness

**Files:**
- Modify if required by discovered defects: `app/motion-controller.tsx`, `app/globals.css`, `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: completed motion system.
- Produces: a passing production build and regression suite.

- [ ] **Step 1: Run static checks**

Run: `npx tsc --noEmit`

Expected: exit 0 with no TypeScript errors.

- [ ] **Step 2: Build and run rendered tests**

Run: `npm test`

Expected: build succeeds and all Node tests pass.

- [ ] **Step 3: Review the final diff**

Run: `git diff --check && git diff --stat`

Expected: no whitespace errors; changes remain limited to motion implementation, tests, and documentation.

- [ ] **Step 4: Commit the implementation**

Run:

```bash
git add app/motion-controller.tsx app/layout.tsx app/globals.css tests/rendered-html.test.mjs docs/superpowers/plans/2026-07-19-motion-system.md
git commit -m "Add accessible premium motion system"
```
