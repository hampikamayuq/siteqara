# Homepage Hero Image Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate and integrate a responsive, photorealistic premium dermatology consultation image in the homepage hero.

**Architecture:** Generate one high-resolution source image from the approved art direction, inspect anatomical and compositional quality, then derive optimized WebP variants. Update the existing hero markup to use responsive sources while preserving its copy, layout, motion, and accessibility.

**Tech Stack:** Built-in image generation, ImageMagick/Sharp-compatible image conversion, React/Next.js/Vinext, WebP, Node test runner.

## Global Constraints

- Preserve the existing hero copy, CTA, typography, layout, and movement.
- Keep quiet negative space on the left and the consultation on the center-right.
- Avoid text, logos, obvious lesions, plastic skin, anatomical artifacts, and cold hospital styling.
- Preserve the dermatologist, patient, hands, dermatoscope, and faces in desktop and mobile crops.
- Store every production asset inside `public/images/`.

---

### Task 1: Generate and validate the source photograph

**Files:**
- Create: `public/images/qara-hero-consulta-source.png`

**Interfaces:**
- Produces: one high-resolution photorealistic source with safe crop margins.

- [ ] **Step 1: Generate the approved scene**

Use the `photorealistic-natural` prompt defined by the design spec, with a wide website-hero composition, left-side negative space, center-right consultation, taupe/blush/graphite palette, diffuse natural light, realistic skin and clinically plausible dermatoscope use.

- [ ] **Step 2: Inspect the generated image**

Confirm exactly two adults, plausible hands and fingers, correct dermatoscope orientation, natural facial anatomy, no text or logos, and useful left-side negative space. Reject and regenerate once if any criterion fails.

- [ ] **Step 3: Copy the approved source into the project**

Save the selected production source as `public/images/qara-hero-consulta-source.png` without overwriting the existing hero asset.

### Task 2: Produce responsive web assets

**Files:**
- Create: `public/images/qara-hero-consulta-640.webp`
- Create: `public/images/qara-hero-consulta-1024.webp`
- Create: `public/images/qara-hero-consulta.webp`

**Interfaces:**
- Consumes: `qara-hero-consulta-source.png`.
- Produces: width variants at 640, 1024, and full production width with preserved aspect ratio and WebP compression.

- [ ] **Step 1: Read the source dimensions**

Run: `identify public/images/qara-hero-consulta-source.png`

Expected: a valid RGB/RGBA raster large enough for a desktop hero.

- [ ] **Step 2: Convert the responsive variants**

Use the installed image conversion tool with high-quality Lanczos resizing and WebP quality around 84, preserving metadata-free output.

- [ ] **Step 3: Verify dimensions and file sizes**

Run: `identify public/images/qara-hero-consulta*.webp && du -h public/images/qara-hero-consulta*`

Expected: all variants decode correctly, widths match their suffixes, and no variant is larger than the PNG source.

### Task 3: Integrate the responsive hero

**Files:**
- Modify: `app/page.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: the three WebP variants.
- Produces: responsive hero markup using `src`, `srcSet`, `sizes`, explicit dimensions, fetch priority, and objective Portuguese alt text.

- [ ] **Step 1: Add the failing rendered-markup test**

Assert that homepage HTML includes `qara-hero-consulta.webp`, its 640/1024 `srcSet` variants, `fetchpriority="high"`, and an alt describing a dermatological consultation.

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test`

Expected: FAIL because the current hero still references the previous image.

- [ ] **Step 3: Replace only the hero image markup**

Keep the existing `.hero-image` wrapper and all adjacent copy. Point the image to the new responsive assets and use `sizes="(max-width: 860px) 100vw, 55vw"`.

- [ ] **Step 4: Run the complete test suite**

Run: `npm test`

Expected: build succeeds and all Node tests pass.

### Task 4: Final verification

**Files:**
- Modify only if defects are found: `app/page.tsx`, responsive image files, `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: a publishable homepage hero change.

- [ ] **Step 1: Check repository hygiene**

Run: `git diff --check && git status --short`

Expected: no whitespace errors and only the approved hero image, markup, tests, and documentation changes.

- [ ] **Step 2: Commit the implementation**

```bash
git add app/page.tsx tests/rendered-html.test.mjs public/images/qara-hero-consulta* docs/superpowers/plans/2026-07-19-homepage-hero-image.md
git commit -m "Add premium consultation hero image"
```
