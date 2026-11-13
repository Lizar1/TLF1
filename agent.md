# AI Agent Guidelines & Architecture Rules

This document defines mandatory development rules for any AI agent or contributor working on the **TLF (Technology Leaders of the Future)** codebase.

---

## 🚨 Non-Negotiable Core Directives

1. **Strict Component Reuse:** Always reuse existing components. Never reinvent, re-implement, or duplicate existing UI primitives or layout structures.
2. **Design & Architectural Consistency:** When creating anything new, strictly conform to established project conventions, design tokens, and directory patterns.

---

## 1. Strict Component Reuse

### A. Check Before You Build
Before creating any new component, template, or writing raw UI elements, **always inspect**:
- `src/components/ui/` for core primitives (Button, Badge, Card, Dialog, Input, etc.).
- `src/components/` (and subdirectories like `src/components/assistant-ui/`) for feature and domain components.
- `src/layouts/` (`AppLayout.jsx`, `PublicLayout.jsx`) for page shells and navigation patterns.
- Existing pages in `src/pages/` for existing usage examples.

### B. Prohibited Anti-Patterns
- **NO raw HTML form/button elements:** Never write `<button className="...">`, `<input className="...">`, or custom card wrappers when a designated primitive exists.
  - Use `<Button>` from `@/components/ui/button`.
  - Use `<Badge>` from `@/components/ui/badge`.
  - Use `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<CardContent>`, `<CardFooter>` from `@/components/ui/card`.
  - Use `<Dialog>`, `<DialogTrigger>`, `<DialogContent>`, `<DialogHeader>`, etc. from `@/components/ui/dialog`.
  - Use `<Input>` from `@/components/ui/input`.
- **NO duplicate components:** Do not create parallel components (e.g. `CustomButton.jsx`, `Modal.jsx`, `Tag.jsx`, `PrimaryCard.jsx`).
- **NO inline mockups of pre-existing functionality:** If a feature or layout element is already provided by a layout or component, reuse it.

### C. Extend, Don't Duplicate
If an existing component lacks a desired style or variation:
1. Extend its `cva` (class-variance-authority) configuration or props within the existing component file (e.g., adding a new variant or size to `src/components/ui/button.jsx`).
2. Keep modifications backwards-compatible with existing call sites.

### D. Adding Missing UI Primitives
If a standard primitive is needed that is not yet installed (e.g. `dropdown-menu`, `tabs`, `avatar`, `select`):
- Install the official shadcn component via the CLI or add it adhering strictly to `components.json`:
  ```bash
  npx shadcn@latest add <component-name>
  ```
- Do **not** write a divergent custom version when a shadcn/Radix primitive exists.

---

## 2. Consistency Rules When Adding New Code

Whenever new components, pages, hooks, or utilities are added, adhere strictly to the following standards:

### A. Directory & File Organization
```
src/
├── assets/                  # Static assets (SVG logos, illustrations)
├── components/
│   ├── ui/                  # Atomic primitives (shadcn, Radix-based, CVA)
│   └── <feature>/           # Feature-specific composite components
├── hooks/                   # Reusable React hooks (use*.js)
├── layouts/                 # Page wrappers (AppLayout, PublicLayout)
├── lib/
│   └── utils.js             # Shared helpers (cn)
└── pages/                   # Route-level page components (*Page.jsx)
```
- **File naming:**
  - UI primitives in `src/components/ui/`: lowercase kebab-case (e.g., `button.jsx`, `badge.jsx`, `dialog.jsx`).
  - React components / pages: PascalCase (e.g., `DashboardPage.jsx`, `AssistantChat.jsx`).
  - Utilities and hooks: camelCase (e.g., `utils.js`, `useDebounce.js`).
- **Path aliases:** Always use configured aliases from `jsconfig.json`:
  - `@/components/*`
  - `@/components/ui/*`
  - `@/lib/*`
  - `@/layouts/*`
  - `@/pages/*`
  - `@/hooks/*`

### B. Styling & Design Tokens (Tailwind CSS v4)
- **Use Semantic CSS Variables:** Always use semantic tokens declared in `src/index.css`.
  - Backgrounds: `bg-background`, `bg-card`, `bg-muted`, `bg-popover`
  - Foreground / Text: `text-foreground`, `text-muted-foreground`, `text-card-foreground`, `text-primary-foreground`
  - Borders & Rings: `border-border`, `ring-ring`
  - Brand & States: `bg-primary`, `bg-secondary`, `bg-accent`, `bg-destructive`
- **Never Hardcode Colors:**
  - ❌ Do NOT use raw hex values: `bg-[#0f172a]`, `text-[#6b7280]`
  - ❌ Do NOT use hardcoded static palette colors for core UI: `bg-slate-900`, `text-gray-500` (these break dark mode support and theme consistency)
  - ✅ Use theme tokens: `bg-card`, `text-muted-foreground`, `border-border`
- **Border Radii & Spacing:**
  - Use standardized radius tokens: `rounded-md`, `rounded-lg`, `rounded-xl`.
  - Maintain rhythm with standard Tailwind spacing units (`gap-2`, `gap-3`, `gap-4`, `gap-6`, `p-4`, `p-6`).

### C. Class Merging & Props Handling
- Always use the `cn()` utility (`@/lib/utils`) to merge Tailwind classes and enable prop-level style overrides:
  ```jsx
  import { cn } from "@/lib/utils"

  export function CustomWidget({ className, ...props }) {
    return (
      <div className={cn("rounded-lg border border-border bg-card p-4", className)} {...props} />
    )
  }
  ```
- Support standard accessibility attributes and DOM passthrough (`...props`).
- Support composition via Radix `Slot` (`asChild` pattern) where applicable.

### D. Iconography
- Exclusively use `lucide-react` for icons.
- Keep sizing uniform (`h-4 w-4` for button/inline icons, `h-5 w-5` or `h-6 w-6` for headers/features).
- Always pair icons with accessible text, `aria-label`, or title when used as icon-only buttons.

### E. Code Quality & Linting
- Follow React 19 functional component standards.
- Run `npm run lint` and ensure zero errors or warnings before completing any task.
- Ensure the build succeeds cleanly (`npm run build`).

---

## 3. Agent Execution Checklist

Before finishing any task, run through this mental checklist:

- [ ] **Did I search `src/components/ui/` and `src/components/` first?**
- [ ] **Did I reuse existing primitives (`Button`, `Card`, `Badge`, `Dialog`, `Input`) instead of writing raw HTML?**
- [ ] **Are all colors, borders, and backgrounds using semantic theme tokens instead of hardcoded colors?**
- [ ] **Is the new code placed in the correct directory following established naming conventions?**
- [ ] **Are Lucide icons used consistently?**
- [ ] **Does `npm run lint` pass without errors?**
