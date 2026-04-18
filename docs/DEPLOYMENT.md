# Deployment Guide - Integra

Este documento descreve o processo de deploy do projeto Integra da fase local até produção.

## Overview

```
Local Development
    ↓ (npm run dev)
Verify Changes
    ↓
Git Commit & Push
    ↓
GitHub (main branch)
    ↓
Vercel Auto-Deploy
    ↓
Production (integra-two.vercel.app)
```

---

## 1. Desenvolvimento Local

### Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

- Servidor rodará em: `http://localhost:3000` (ou próxima porta disponível)
- Hot reload habilitado - mudanças refletem instantaneamente
- Verifique todas as alterações visualmente antes de commitar

### Verificar Build Local

```bash
npm run build
npm run start
```

Simula exatamente como será em produção. Faça isso antes de enviar.

### Verificar Qualidade do Código

```bash
npm run check-types    # TypeScript
npm run lint          # ESLint
```

Fixe qualquer erro antes de fazer commit.

---

## 2. Git Workflow

### Padrão de Commits

Use conventional commits:

```
feat(ui): increase logo size for better prominence
fix(navbar): correct mobile menu alignment
chore: update dependencies
docs(deployment): add deployment guide
```

### Fazer Commit

```bash
git add <arquivos>
git commit -m "tipo(escopo): descrição"
```

**Hooks automáticos:**
- ESLint auto-fix
- Prettier formatting
- CommitLint validation

### Push para Main

```bash
git push origin main
```

Ou se estiver em outra branch:
```bash
git push origin feature-branch:main
```

---

## 3. Deploy na Vercel

### Automático (Recomendado)

Vercel detecta push para `main` e faz deploy automaticamente:
1. Build inicia automaticamente
2. Build leva ~2-3 minutos
3. Site atualiza em produção

**Nenhuma ação manual necessária!**

### Manual (Se Necessário)

Se o deploy não iniciar ou você quer forçar redeploy:

1. **Acesse:** https://vercel.com/tegramax/integra/settings
2. **Vá em "Deployments"**
3. **Clique no deploy mais recente**
4. **Clique "Redeploy"**

Aguarde 2-3 minutos.

### Verificar Status

- **Painel:** https://vercel.com/tegramax/integra/deployments
- **Site ao vivo:** https://integra-two.vercel.app/

---

## 4. Repositórios

### GitHub

- **Principal:** https://github.com/leandroota-tegra/integra
- **Backup:** https://github.com/leandroota/Integra-Suite-V3

### Vercel

- **Conta:** tegramax
- **Projeto:** integra
- **URL:** https://integra-two.vercel.app/

---

## 5. Assets & Recursos

### Logos

Localizados em: `public/assets/logos/`

- `integra-logo-light.svg` — Usado na navbar (usado em produção)
- `integra-logo-dark.svg` — Disponível para uso futuro
- `Integra-logo-compact-*.svg` — Versões compactas

**Para atualizar logo:**
1. Substitua os arquivos SVG em `public/assets/logos/`
2. Commit e push
3. Vercel faz deploy automático

### Fonts

Localizados em: `public/fonts/`

Precarregadas para performance.

---

## 6. Escala de Medidas (Tailwind)

Padrão do projeto usa Tailwind CSS com base **4px**:

```
w-32 = 128px
w-36 = 144px
w-40 = 160px
w-44 = 176px

h-8 = 32px
h-9 = 36px
h-10 = 40px
h-11 = 44px
```

Mantenha essa escala ao fazer ajustes de tamanho.

---

## 7. Troubleshooting

### Build Falha com TypeScript Error

```bash
npm run check-types
# Fixe os erros
git add .
git commit -m "fix: resolve typescript errors"
git push origin main
```

### Logo não atualiza em produção

1. Limpe cache: **Ctrl+Shift+R** no navegador
2. Se persistir, faça manual redeploy na Vercel
3. Aguarde 2-3 minutos

### Site lento ou com cache antigo

1. Acesse: https://vercel.com/tegramax/integra/settings
2. Vá em **"Deployments"**
3. Clique **"Redeploy"** no deployment mais recente

---

## 8. Checklist Pré-Deploy

Antes de fazer `git push`:

- [ ] Testei localmente com `npm run dev`
- [ ] Verifiquei com `npm run check-types`
- [ ] Executei `npm run lint`
- [ ] Fiz build local: `npm run build`
- [ ] Comitei com mensagem clara (conventional commits)
- [ ] Revisei as mudanças antes do push

---

## 9. Environment

- **Node:** v20+
- **NPM:** v11+
- **Next.js:** 16.1.6
- **React:** 19.2.3
- **Tailwind:** 3.4.19

---

## 10. Resumo Rápido

**Para fazer deploy:**

```bash
# 1. Desenvolva localmente
npm run dev

# 2. Verifique qualidade
npm run check-types
npm run lint
npm run build

# 3. Commit
git add .
git commit -m "feat: sua mudança aqui"

# 4. Push (deployment automático)
git push origin main

# 5. Aguarde 2-3 minutos
# Site atualiza automaticamente em:
# https://integra-two.vercel.app/
```

---

**Suporte:** Veja CLAUDE.md para mais detalhes sobre estrutura, componentes e padrões do projeto.
