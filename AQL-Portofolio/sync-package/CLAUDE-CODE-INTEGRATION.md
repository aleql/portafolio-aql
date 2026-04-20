# RA2 Command Console — Integration Guide

You are Claude Code, running inside the local clone of `portofoloio-final`.
Your job is to integrate the files in this `sync-package/` folder into the
real Vite + React + TypeScript codebase. This doc tells you exactly what to
do. Follow it top-to-bottom. Do **not** improvise.

## Context

The user has an existing portfolio repo (Vite + React 18 + TS + Tailwind,
HashRouter, `framer-motion`, `lucide-react`). They built a high-fidelity
design prototype separately (plain HTML + Babel-in-browser) that now needs
to land in the real codebase.

The prototype's aesthetic is a **Red Alert 2 / command console** theme:
riveted steel chassis, curved CRT radar, beveled side buttons, amber +
phosphor-teal accents on bone-white text, dark by default with a light
variant that looks like a sand-colored field console.

The decisions the user already made about this port:

| Decision | Value |
|---|---|
| Navigation | **RA2 vertical command menu** on the hero. Top `Navigation.tsx` is **removed** from `HomePage`. |
| Project briefings | **Replace `ProjectDetailPage.tsx` entirely.** Briefing IS the project page. Router-based URLs: `/#/project/<slug>`. |
| Tailwind | **Rip out.** Pure CSS everywhere. |
| Data source | New file `src/data/briefings.ts` — typed, separate from `portfolio.ts`. |
| Theme toggle | Keep existing `useDarkMode` hook, **add RA2 light variant** via `data-theme` attribute on `<html>`. |
| Radar | **Replace `TacticalHero.tsx` entirely.** Canvas-based radar with sweep + blips. |

## What is in this folder

```
sync-package/
├── CLAUDE-CODE-INTEGRATION.md   (this file)
├── src/
│   ├── styles/
│   │   ├── ra2-theme.css
│   │   ├── ra2-layout.css
│   │   └── ra2-briefing.css
│   ├── components/
│   │   ├── TacticalHero.tsx
│   │   ├── hero/
│   │   │   ├── Radar.tsx
│   │   │   └── Rivet.tsx
│   │   ├── Summary.tsx
│   │   ├── Projects.tsx           (hosts modal-on-desktop, route-on-mobile)
│   │   ├── BriefingModal.tsx      (desktop overlay)
│   │   ├── BriefingContent.tsx    (shared dossier body)
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   ├── Footer.tsx
│   │   └── common/
│   │       └── SectionHead.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── ProjectDetailPage.tsx
│   └── data/
│       └── briefings.ts
```

All paths inside the package mirror the final locations under
`portofoloio-final/`. You can copy the tree directly.

---

## Integration steps

### 1. Dependencies

Nothing new to install. The port **drops** these runtime deps:

- `framer-motion` — not used by the new code
- `react-intersection-observer` — not used
- `tailwindcss`, `postcss`, `autoprefixer` — no longer needed

Keep `lucide-react` (still used), `react-router-dom`, and the React core.

Run:

```bash
npm uninstall framer-motion react-intersection-observer tailwindcss postcss autoprefixer
```

Delete these files (Tailwind rip-out):

- `tailwind.config.js`
- `postcss.config.js`
- `src/styles/globals.css` (replaced — see step 3)

---

### 2. Copy the RA2 files into the repo

Copy every file from `sync-package/src/` to `src/` in the repo, preserving
paths. Overwrite existing files where the paths match.

Files that **replace** existing ones:

- `src/components/TacticalHero.tsx`
- `src/components/Summary.tsx`
- `src/components/Projects.tsx`
- `src/components/Experience.tsx`
- `src/components/Skills.tsx`
- `src/components/Education.tsx`
- `src/components/Footer.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/ProjectDetailPage.tsx`

Files that are **new**:

- `src/styles/ra2-theme.css`
- `src/styles/ra2-layout.css`
- `src/styles/ra2-briefing.css`
- `src/components/hero/Radar.tsx`
- `src/components/hero/Rivet.tsx`
- `src/components/common/SectionHead.tsx`
- `src/components/BriefingModal.tsx`
- `src/components/BriefingContent.tsx`
- `src/data/briefings.ts`

**Briefing behavior:** `Projects.tsx` opens the dossier as an **in-page
modal on desktop (≥900px)** and **routes to `/#/project/<slug>` on mobile**.
Both paths render the exact same `BriefingContent` body — only the outer
chrome differs. `ProjectDetailPage.tsx` is now a thin wrapper around
`BriefingContent`.

**Project images:** `Projects.tsx` reads `images[0]`, then falls back to
`image`, `thumbnail`, `cover`, `heroImage`, and finally
`/projects/<slug>/gallery-1.png`. No change needed to `portfolio.ts`.

Files to **delete** (no longer needed):

- `src/components/Navigation.tsx` — hero now has its own command menu; top
  nav is gone from the home page.
- `src/components/Hero.tsx` if it exists alongside `TacticalHero.tsx`.
- Any old `src/components/common/ImageGallery.tsx`, `Badge.tsx`, `Card.tsx`
  if they were only used by the old `ProjectDetailPage.tsx`. Verify with
  grep first before deleting — `GameCVPage.tsx` may still import them.

---

### 3. Global styles

Replace `src/styles/globals.css` with just this:

```css
@import './ra2-theme.css';
@import './ra2-layout.css';
@import './ra2-briefing.css';
```

That's it. No Tailwind layers, no custom scanline/grid utilities — those
all live inside the RA2 files now.

Confirm that `src/main.tsx` imports `./styles/globals.css` (or change the
import to the new files directly). If `main.tsx` does not import globals,
add:

```ts
import './styles/globals.css';
```

---

### 4. Fonts

The RA2 theme uses **Orbitron** (headlines) + **JetBrains Mono** (body).
Your `index.html` already loads Inter + JetBrains Mono + Orbitron via
Google Fonts — leave that block alone. The new CSS references the
right families.

---

### 5. Dark-mode hook — add `data-theme`

The existing `src/hooks/useDarkMode.ts` toggles a `.dark` class on
`<html>`. The new CSS reads `[data-theme="light"]` instead. Update the
hook so it sets **both** the class (for any legacy reads) **and** the
attribute:

```ts
// src/hooks/useDarkMode.ts
import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

  return [isDark, setIsDark] as const;
}
```

---

### 6. Router

`src/App.tsx` does not change — the routes are the same:

```tsx
<Route path="/" element={<HomePage />} />
<Route path="/project/:slug" element={<ProjectDetailPage />} />
<Route path="/aleql-gamedev" element={<GameCVPage />} />
```

The new `ProjectDetailPage.tsx` drops into the existing slot. Make sure
your existing links use `/#/project/<slug>` (HashRouter) — they already
do.

---

### 7. GameCVPage

`src/pages/GameCVPage.tsx` is **not** part of this port and can stay
as-is. If it imports Tailwind classes, you have two options:

a. **Leave it Tailwind.** Keep `tailwindcss` installed and keep
   `tailwind.config.js`, scoped only to that one page. In that case, do
   **not** uninstall Tailwind in step 1.

b. **Port it.** Out of scope for this package — do that yourself later.

Decide based on how quickly the user wants to ship. If unsure, take
option (a): keep Tailwind for `GameCVPage` only.

---

### 8. Data alignment — briefings

`src/data/briefings.ts` is keyed by the same `slug` values your
`src/data/portfolio.ts` already uses:

- `eye-search`, `readright`, `coaniquem`, `alerce`, `sinapp`, `mdv`,
  `education-platform`
- plus `bit-heroes` (not in `portfolio.ts` — see below)

**If `portfolio.ts` does not have a `bit-heroes` project**, either:
- add one to `portfolio.ts` so the card shows on the home page; or
- remove the `bit-heroes` entry from `briefings.ts`.

`src/data/briefings.ts` also exports `getBriefing(slug, project)` — a
fallback builder for projects without a hand-written dossier. The new
`ProjectDetailPage.tsx` uses it.

---

### 9. Images

The prototype referenced `assets/projects/<slug>/gallery-{1,2,3}.png`.
Your repo uses `public/projects/<slug>/...` served from `/projects/...`.
The components in this package already use `/projects/<slug>/...` —
no action needed as long as your public folder already has those files.

If a project's `images[]` is empty in `portfolio.ts`, the briefing
gallery section will hide itself gracefully.

---

### 10. Verify

```bash
npm run dev
```

Checklist:

- [ ] Home page loads — chassis hero with live radar, command menu on the
      right, no top nav.
- [ ] Clicking a command button scrolls to its section.
- [ ] Radar sweep pings blips; active feed populates on the right panel.
- [ ] Theme toggle (power icon, top-right of hero) flips to sand / light
      mode and back.
- [ ] Clicking **Briefing** on any project card navigates to
      `/#/project/<slug>` and renders the full dossier page.
- [ ] Back arrow on the briefing returns to `#projects` on the home page.
- [ ] No Tailwind class warnings in the console.
- [ ] `npm run build` succeeds.

If any item fails, read the corresponding file in this package and
diff against the checked-in version. Do not invent new CSS classes or
palette colors — the system is closed.

---

### 11. Commit

Suggested commit message:

```
Port RA2 command-console design from prototype

- Replace TacticalHero with canvas-based radar hero
- Replace ProjectDetailPage with briefing dossier view
- Drop Tailwind; pure CSS via src/styles/ra2-*.css
- Add src/data/briefings.ts with long-form dossiers
- Remove Navigation.tsx (hero has its own command menu)
- Update useDarkMode to also set data-theme on <html>
```

---

## Design system reference

If the user asks for tweaks, these are the only things to touch.

**Palette (CSS custom properties on `:root` / `[data-theme="light"]`):**

- `--chassis-*` — steel housing
- `--bezel-*` — beveled button faces
- `--screen-bg` / `--screen-bg-2` — CRT phosphor background
- `--phosphor` `#44d4c2` — CRT text/accent
- `--amber` `#ffb347` — warning / label accent
- `--alert` `#ff4d4d` — danger / classified stamp
- `--bone` / `--bone-dim` — primary text / secondary text
- `--font-head` Orbitron, `--font-mono` JetBrains Mono

**Never invent new colors.** If a request needs a new accent, extend
the custom-property set in `ra2-theme.css` — don't hard-code.

End.
