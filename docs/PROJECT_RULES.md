# Project Architecture & Development Protocols

## 1. Tech Stack (Non-Negotiable)
*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn/UI (based on Radix UI)
*   **Icons:** Lucide React

## 2. Best Practices & Principles
*   **Mobile First:** Always design and code for mobile breakpoints first, then scale up (`sm:`, `md:`, `lg:`).
*   **Accessibility (a11y):** All interactive elements must be accessible via keyboard and screen readers. Use Radix UI primitives to ensure this.
*   **Composition:** Use smaller, reusable components over large monolithic files.
*   **Server Components:** Use React Server Components (RSC) by default. Use `'use client'` only when interaction (state, hooks, event listeners) is strictly necessary.

## 3. Folder Structure
The project follows a strict Atomic-inspired structure:

```
/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── layout.tsx        # Root Layout
│   ├── page.tsx          # Home Page
│   └── (features)/       # Grouped Feature Routes
├── components/           # React Components
│   ├── ui/               # Atomic Primitives (Buttons, Inputs, Cards) - Shadcn/UI lives here
│   ├── layout/           # Structural components (Header, Footer, Sidebar)
│   └── features/         # Complex business-logic components (e.g., UserDashboard, PricingTable)
├── lib/                  # Utilities & Helpers
│   ├── utils.ts          # cn() helper and class mergers
│   └── constants.ts      # Global constants
├── styles/               # Global styles (if needed beyond Tailwind)
│   └── globals.css       # Tailwind directives
└── public/               # Static Assets (Images, Fonts)
```

## 4. Component Rules
### Naming Convention
*   **Files:** `PascalCase.tsx` (e.g., `Button.tsx`, `HeroSection.tsx`)
*   **Folders:** `kebab-case` (e.g., `components/ui`, `app/marketing-page`)

### UI Library Usage
*   Do **NOT** reinvent the wheel. If a component exists in Shadcn/UI (e.g., Select, Dialog, Sheet), `npx shadcn-ui@latest add [component]` and use it.
*   Customize styles via `tailwind.config.js` or the component file itself, do not break the accessible structure.

## 5. Git Workflow
*   **Commits:** Use conventional commits (e.g., `feat: add hero section`, `fix: mobile padding issue`).
