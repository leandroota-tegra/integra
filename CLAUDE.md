# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Integra** is a modern landing page built with Next.js 16 + React 19. It's a marketing/product showcase with advanced animations, 3D graphics capabilities, and responsive design.

- **Live (Production):** https://integra-two.vercel.app/
- **GitHub (Main):** https://github.com/leandroota-tegra/integra
- **Vercel Account:** tegramax
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS + Framer Motion
- **3D Graphics:** Three.js (optional, pre-configured)

## Development Workflow

### Branch Strategy

```
local development
    ↓
feature branch → test locally
    ↓
Pull Request → dev branch
    ↓
Review & test on vercel.com
    ↓
Merge to main
    ↓
Deploy to Vercel (integra-two.vercel.app)
```

**Branch naming:**
- Feature: `feature/feature-name`
- Fix: `fix/bug-description`
- Chore: `chore/task-description`

### Common Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000 or auto-assigned port)
npm run build        # Production build
npm run start        # Run production build locally
npm run lint         # Run ESLint
npm run check-types  # TypeScript type checking

# Git/Deployment
git push origin main          # Push to main branch
git push origin feature-name  # Push feature branch (for PR)
```

## Directory Structure

```
app/                    # Next.js App Router (pages & layouts)
├── layout.tsx         # Root layout
└── page.tsx           # Home page

components/            # React components
├── layout/            # Header, navbar, footer
├── features/          # Feature sections (hero, modules, testimonials, etc)
├── ui/                # Reusable UI components (buttons, cards, etc)
└── ...

public/               # Static assets
├── assets/logos/      # Logo files (integra-logo-*.svg)
└── fonts/            # Font files

lib/                  # Utilities & helpers
tailwind.config.ts    # Tailwind configuration
next.config.ts        # Next.js configuration
```

## Key Technologies & Patterns

### Styling
- **Tailwind CSS:** All styles use Tailwind classes. No CSS files needed.
- **Framer Motion:** For animations (fade-in, scroll effects, transitions)
- **CVA (class-variance-authority):** For component variants

### Components
- Functional components with React hooks
- No class components
- Props-based customization
- Server components where possible (App Router default)

### Animations
- Framer Motion for entrance animations
- Scroll-triggered effects via viewport detection
- Smooth transitions on hover/interaction

## Deployment Process

### Prerequisites
- Code committed to `main` branch
- All changes tested locally
- ESLint & TypeScript checks pass

### Deploy to Vercel (tegramax account)

1. **Code is automatically deployed** when merged to `main`
   - Vercel watches the GitHub repository
   - Build takes ~2-3 minutes
   - Auto-triggers on push to main

2. **Manual redeploy** if needed:
   - Access: https://vercel.com/tegramax/integra/settings
   - Go to "Deployments" tab
   - Click latest deployment → "Redeploy"

3. **Check deployment status:**
   - https://vercel.com/tegramax/integra/deployments
   - Live site: https://integra-two.vercel.app/

### Logo Management

Logo files are stored in `public/assets/logos/`:
- `integra-logo-light.svg` — Used in navbar (light mode)
- `integra-logo-dark.svg` — Available for dark backgrounds
- `Integra-logo-compact-*.svg` — Compact versions (if needed)

To update logos:
1. Replace SVG files in `public/assets/logos/`
2. Verify locally: `npm run dev`
3. Commit & push to main
4. Vercel auto-deploys

## Git Hooks & Code Quality

**Husky + CommitLint** are configured to enforce:
- Conventional commit messages (feat:, fix:, chore:, etc)
- ESLint auto-fix on staged files
- Prettier formatting on staged files

Commit messages follow this pattern:
```
<type>(<scope>): <subject>

Example:
feat(ui): add spotlight button effect
fix(navbar): correct logo sizing on mobile
chore: update dependencies
```

## Build & Type Checking

```bash
# Before pushing, run:
npm run check-types   # Verify TypeScript
npm run lint         # Check ESLint
npm run build        # Test production build
```

TypeScript errors must be resolved before commit/push.

## Environment Variables

Currently no `.env` variables are required for the landing page. If needed in future:
- Add to `.env.local` (not tracked by git)
- Reference in code as `process.env.NEXT_PUBLIC_*` (for client-side)

## Performance Notes

- **Turbopack** is enabled for faster builds (Next.js 16)
- Images are optimized via Next.js `Image` component
- Fonts are preloaded for performance
- Static generation where possible (static pages)

## Troubleshooting

**Port 3000 already in use:**
- Dev server auto-assigns next available port
- Check `.claude/launch.json` for autoPort setting

**Logo not updating on Vercel:**
- Trigger manual redeploy in Vercel dashboard
- Clear browser cache (Ctrl+Shift+R)

**Build fails with TypeScript errors:**
- Run `npm run check-types` locally
- Fix errors before pushing

## Related Resources

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion/
- Vercel Dashboard: https://vercel.com/tegramax/integra
