# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`tools.su-u.dev` is a collection of browser-based developer utilities (encoding, text manipulation, JSON tools, date/time conversion, hashing, UUID/image generation). All logic runs client-side in the browser — there is no backend. The UI is in Japanese. Deployed on Vercel; live at https://tools.su-u.dev/.

## Commands

```bash
npm run dev          # Next.js dev server at http://localhost:3000
npm run build        # Production build
npm test             # Run all Jest tests
npm test path/to/file.test.ts   # Run a single test file
npm run lint         # next lint
npm run lint-fix     # next lint --fix
npm run format       # Prettier on all .ts/.tsx
```

Node version is pinned to `22.22.1` (see `.tool-versions`). Use `npm` (a `package-lock.json` is committed). Note: `.npmrc` sets `legacy-peer-deps=true` to tolerate the eslint 9 / eslint-config-next 14 peer-dependency conflict.

Note: ESLint errors do **not** fail the production build (`ignoreDuringBuilds: true` in `.eslintrc.js`), and `tsconfig.json` has `strict: false`. Run `npm run lint` and `npm test` explicitly to catch problems.

## Architecture

Next.js 14 App Router. Each tool is a self-contained directory under `src/app/<tool_name>/` following a consistent 3-file pattern:

- **`page.tsx`** — server component. Exports `metadata` (page `<title>`) and a default-exported page that renders the feature component. Keep it thin.
- **`<Feature>.tsx`** — `'use client'` component. Wraps everything in `<FormProvider {...methods}><AppLayout>...`. Uses rsuite `Grid/Row/Col/Panel` for layout and `react-hook-form` `Controller` to bind inputs.
- **`use<Feature>.ts`** — the hook holding all state/logic. Returns `{ methods, output, ... }`. This is where the actual tool logic lives.

Pure, testable logic is extracted into a separate `*Lib.ts` file (e.g. `json_formatter/jsonFormatterLib.ts` with a colocated `jsonFormatterLib.test.ts`). Tests live next to the code they test.

### Forms and state (the central pattern)

All tools manage input state through `react-hook-form`:

1. The hook calls `useCustomForm<FormType>({ defaultValues })` (`src/components/common/Form/useCustomForm.ts`) — a thin wrapper that sets `mode: 'onChange'`.
2. Output is derived from form values via `watch()` + `useEffect`, stored in local `useState`.
3. `useFormPersistence(featureName, methods, setCallback)` (`src/hooks/useFormPersistence.ts`) persists form data to `localStorage` under the key `devtools.formData.<featureName>` and restores it on mount via the `setCallback`. Every tool calls this with a unique `featureName`.

When adding a new tool, replicate this pattern: define a `FormType` and `DEFAULT_VALUES`, wire `useCustomForm`, call `useFormPersistence` with a unique name, and derive output in a `useEffect`.

### Registering a new tool

A tool is not visible until it's added to the `features` array in `src/components/common/Features.tsx`. This single array is the source of truth for the sidebar navigation (`SideNavBar.tsx`) and the home page cards (`src/app/home/`). Add an item (`key`, `title`, `path`, optional `shortTitle`/`description`) under the appropriate group. The `path` must match the App Router directory route.

### Shared building blocks

- **`src/Layout/App.tsx`** — `AppLayout` renders the `Provider` + `SideNavBar` + content shell. Every feature component wraps its body in `AppLayout`.
- **`src/app/Provider.tsx`** — sets up rsuite `CustomProvider` (dark theme) and antd `ConfigProvider` (dark algorithm, Japanese locale). Dark theme is hardcoded app-wide.
- **`src/components/common/`** — reusable UI: `PageTitle`, `PanelHeader`, `Editor` (CodeMirror wrapper, exports `ex` for extensions like `lineWrapping`), and `Form/` (form-aware `Input`, `TextArea`, `Select`, `DatePicker`, `CopyButton`, `ClearButton`, etc. — these read from the surrounding `FormProvider` context).
- **`src/lib/`** — pure helpers: `encoding.ts`, `hashAlgorithms.ts`, `dayjs.ts` (configured dayjs instance — import from here), `gtag.ts`.
- **`src/hooks/`** — `useFormPersistence`, `useCopy`.

### Conventions

- **UI libraries**: primarily **rsuite** for layout/components, with **antd** also available. **Emotion** (`@emotion/styled`) for styled components.
- **Imports**: use the `@/*` path alias (maps to `src/*`). ESLint enforces alphabetized import order (`import/order`).
- **Prettier**: single quotes, semicolons, trailing commas, 100-char width, 2-space tabs.
- Client components that use hooks/state must start with `'use client'`.
