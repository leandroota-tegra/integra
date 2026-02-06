# SITEMAP — Integra Suite (MVP Enxuto)

Status: v1 (enxuto)  
Última atualização: 2026-02-05  
Working name: Integra Suite

> Objetivo do MVP: **converter para trial** (Comece grátis → Pagamentos) e explicar a tese **“visão do todo + modularidade”** sem confundir.

---

## 1) Navegação (Top Nav)
- Produto (Suíte)
- Módulos
- Planos
- FAQ
- **Comece grátis** (CTA primário)
- Entrar (link utilitário)
- Falar com vendas (secundário — pode ficar no footer e em seções específicas)

---

## 2) Páginas (MVP)
1) **Home** (`/`)
2) **Pagamentos** — Landing Page (`/pagamentos`)
3) **Planos** (`/planos`)
4) **Trial / Onboarding Pagamentos** (`/app/trial` ou rota equivalente no produto)

> Páginas futuras (não-MVP): Workflow, Talentos, Vault, Segurança detalhada, Sobre, Carreiras, Blog.

---

## 3) Estrutura — Home (`/`)
### Hero
- Headline: conexão + visão do todo
- Subheadline: modularidade + implementação rápida
- CTA primário: **Comece grátis** (leva para trial Pagamentos)
- CTA secundário: Ver módulos / Ver planos (não competir)

### Por que escolher
- 4 cards: Começa rápido / Cresce por módulos / Visão do todo / Suporte que resolve
- (Opcional) CTA: Comece grátis

### Módulos / Ecossistema
- Grid de módulos
- Pagamentos como destaque (entrada)
- CTA primário: Comece grátis (por Pagamentos)
- CTA secundário: Ver planos

### Prova / Resultados (sem números não validados)
- bullets de resultados observáveis
- placeholder de depoimentos (se não houver)

### FAQ
- 6–8 perguntas (inclui Comece grátis, segurança, modularidade)

### Final CTA
- reforço de valor + Comece grátis

---

## 4) Estrutura — Pagamentos (`/pagamentos`)
### Hero
- promessa: recorrência rodando em minutos + controle
- CTA primário: Comece grátis
- CTA secundário: Ver planos / Falar com vendas

### Como funciona (3 passos)
- criar cobrança / adicionar cliente / acompanhar status
- (Opcional) CTA: Comece grátis

### Caso âncora
- mensalidade/serviço recorrente (exemplo prático)

### Benefícios
- 4–6 cards (menos manual, status, previsibilidade, modularidade)

### Confiança (bullets)
- controle de acesso, rastreabilidade, consistência
- (Itens técnicos só se comprováveis)

### Ponte “Visão do todo”
- Pagamentos como começo → conectar módulos → visão única

### FAQ
- 7–9 perguntas (inclui trial, cancelamento, segurança, suporte)

### Final CTA
- Comece grátis

---

## 5) Estrutura — Planos (`/planos`)
### Hero
- “comece simples e escale”
- CTA primário: Comece grátis
- CTA secundário: Falar com vendas

### Como escolher
- 3 cards (Entrada / Crescimento / Enterprise)

### Tabela de planos (3 tiers)
- Essencial / Profissional / Enterprise
- placeholders para preço/limites até validação do CEO
- CTA: Comece grátis (Essencial/Profissional)
- CTA: Falar com vendas (Enterprise)

### FAQ de planos
- trial, upgrade, módulos, enterprise

### Final CTA
- Comece grátis

---

## 6) Trial / Onboarding Pagamentos (produto)
> Rota pode variar. O importante é manter o fluxo.

### Fluxo (3 telas)
1) Boas-vindas + objetivo (Leva ~3 minutos)
2) Setup da cobrança (valor/frequência/vencimento) + validação inline
3) Sucesso + próximos passos (Adicionar cliente / Ver planos)

### Estados obrigatórios
- loading / disabled / error (retry) / success / empty

---

## 7) Regras de roteamento (CTA)
- “Comece grátis” (header, hero, final CTA) → **Trial Pagamentos**
- “Ver planos” → `/planos`
- “Ver módulos” → âncora seção módulos (Home) ou página futura `/modulos`
- “Falar com vendas” → canal definido (form/WhatsApp/email) (a definir)

---

## 8) Checklist (DoD do sitemap)
- [ ] 4 páginas MVP listadas e com estrutura definida
- [ ] CTAs roteados (Comece grátis → Trial Pagamentos)
- [ ] Seções essenciais presentes (3 passos, confiança, FAQ)
- [ ] Sem claims não validados (números e certificações)
