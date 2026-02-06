# Brand Identity & Visual Guidelines — Integra Suite

> **Status:** Active (v1)  
> **Last Updated:** 2026-02-06  
> **Working Name:** Integra Suite

## 1. Core Identity
**Mission:** Conectar rapidamente frentes da operação (processos, pessoas, documentos e pagamentos) para dar visão do todo, reduzir fricção e aumentar controle.

**Target Audience (ICP):**
*   **Quem:** Gestor(a) de Operações / Financeiro(a) de PMEs.
*   **Dor Principal:** Caos operacional (planilhas + WhatsApp + sistemas desconectados) gerando retrabalho e falta de visão.
*   **Desejo:** Sair do operacional manual e ganhar previsibilidade/status claro.

**Primary Conversion Goal (PLG):**
*   **Ação Principal:** "Começar Grátis" / "Criar conta grátis" (Start Trial).
*   **Fallback:** "Falar com Vendas" (Apenas para Enterprise/Requisitos complexos).

## 2. Key Messaging & Copy Strategy (Approved)

### Hero Section
*   **Headline (A Dor):** "Pare de gerenciar sua empresa pelo WhatsApp e planilhas."
*   **Subheadline:** "A Integra Suite conecta seu financeiro, processos e time em um único painel. Tenha visão total da operação sem precisar cobrar status de ninguém."

### Call to Action (Microcopy)
*   **Primary Button:** `Criar conta grátis`
*   **Secondary Button:** `Ver como funciona`
*   **Trust/Risk Reversal:** "Sem cartão de crédito. Cancele quando quiser."

### Landing Page Narrative Structure
1.  **Hero:** Promessa de alívio imediato (Fim do caos).
2.  **Social Proof:** Logos/Depoimentos ("Não sou cobaia").
3.  **Problem Agitation:** O custo do caos (Planilhas desatualizadas, erros, falta de visão).
4.  **Solution Showcase:** Telas do produto ("Visão numa tela só"). **Show, don't just tell.**
5.  **Objection Handling (FAQ):** Perguntas sobre instalação, preço e segurança.
6.  **Final CTA:** Convite final com risco zero.

## 3. Voice & Tone
- **Direto, confiável e prático** (sem hype)
- **Operacional e claro** (foco em “visão do todo” + “menos trabalho manual”)
- **Profissional, mas acessível** (linguagem simples, sem juridiquês)
- **Promessas demonstráveis** (evitar números e superlativos sem prova)

**Do (regras de escrita)**
- Frases curtas.
- 1 promessa por seção.
- Benefícios em linguagem do dia a dia: “menos retrabalho”, “status claro”, “recorrência rodando”.

**Don’t (proibidos)**
- “revolucionário”, “mágico”, “IA faz tudo”, “o melhor do mercado”
- prometer porcentagens/ganhos sem dado real
- “99.9% uptime”, “dados criptografados”, “certificação X” sem validação/documento

## 4. Logo Usage
- **Primary Logo:** `/assets/logos/logo-light.svg` (Dark Mode/Hero) | `/assets/logos/logo-dark.svg` (Light Mode)
- **Clear Space:** mínimo 24px de respiro ao redor
- **Don’ts:**
  - não esticar/distorcer
  - não trocar cores fora da paleta
  - não aplicar sombras/efeitos no logo

## 5. Color Palette
### Base (brand)
| Name | Hex | Usage |
|------|-----|-------|
| **Brand Primary (Cobalt)** | `#252244` | Destaques de marca, links importantes, seções de confiança (com moderação) |
| **CTA Primary (Tegra Spark)** | `#FF5D00` | **CTAs primários** (dominante no Dark Mode) |
| **Background Light (Off White)** | `#FAF9F6` | Fundo base em Light Mode |
| **Graphite (neutral)** | `#9E9E9E` | Neutro auxiliar (usar pouco; preferir neutrals abaixo) |

### Neutrals (UI completa)
**Light Mode**
- Background: `#FAF9F6`
- Surface 1: `#FFFFFF`
- Surface 2: `#F3F4F6`
- Border/Subtle: `#E5E7EB`
- Text Primary: `#0B1220`
- Text Secondary: `#334155`
- Text Muted: `#64748B`

**Dark Mode**
- Background: `#0B1220`
- Surface 1: `#0F172A`
- Surface 2: `#111C33`
- Border/Subtle: `#22304A`
- Text Primary: `#E5E7EB`
- Text Secondary: `#CBD5E1`
- Text Muted: `#94A3B8`

### Brand & CTA states (mandatory)
- Brand Hover (UI-friendly cobalt): `#0B5FD9`

**CTA**
- CTA Solid: `#FF5D00`
- CTA Hover: `#FF7A2E`
- CTA Soft (Light highlight): `#FFE6D6`
- CTA Soft (Dark highlight): `rgba(255,93,0,0.18)`

### High Contrast / Accessibility Palette (WCAG AAA)
**Text on White/Light Backgrounds**
- **Text Strong (Headings):** `#0F172A` (Slate 900) - Contrast Ratio 19:1
- **Text Body (Paragraphs):** `#334155` (Slate 700) - Contrast Ratio 9:1 (Avoid lighter grays for body text)
- **Text Muted (Labels/Helper):** `#64748B` (Slate 500) - Contrast Ratio 4.6:1 (Minimum for large text)

**Semantic Accents (Light Mode)**
- **Error Strong:** `#B91C1C` (Red 700) - For text/icons on white.
- **Warning Strong:** `#C2410C` (Orange 700) - For text/icons on white.
- **Success Strong:** `#15803D` (Green 700) - For text/icons on white.

**UI Elements (High Contrast)**
- **Subtitles (Caps):** `#475569` (Slate 600) - Avoid Slate 400 for text.
- **Card Borders:** `#CBD5E1` (Slate 300) - Minimum visibility for borders.
- **Icon Backgrounds:** Use `bg-opacity-15` or darker (Avoid 5%).

**Rule:** `text-red-500` or `text-orange-500` fails accessibility on white. Use **700** or darker.

**Rule (important)**
- **Dark Mode:** CTA primário **sempre laranja** (`#FF5D00`) para máxima clareza de ação.
- Laranja = **ação** (não usar como decoração em excesso).

## 6. Typography
- **Primary Font:** `Satoshi` (usar **apenas Satoshi** — ignorar Poppins)
- **Fallback:** `system-ui`

**Recommended usage**
- Headings: Satoshi **Bold**
- UI labels/buttons: Satoshi **Medium**
- Body: Satoshi **Regular**

**Type scale (suggested)**
- H1: 40–48px / Bold / 120%
- H2: 32px / Bold / 120%
- H3: 24px / Bold / 130%
- Body: 16px / Regular / 160%
- Small: 14px / Regular / 160%
- Buttons/Labels: 14–16px / Medium

## 7. Imagery & Icons
- **Icon style:** outline/stroke (2px). Sugestão: Lucide React.
- **Photography:** ambientes reais e profissionais; evitar “stock genérico esterilizado”.
- **Illustrations:** minimalistas, geométricas, poucos detalhes (se usar).

## 8. UI Components (Visual Rules)
### Buttons
- Primary: `#FF5D00` (texto branco), hover `#FF7A2E`
- Secondary: outline (border do tema) + texto `text`
- **1 CTA primário por seção** (máximo)

### Cards
- Light: surface `#FFFFFF` + border `#E5E7EB`
- Dark: surface `#0F172A` + border `#22304A`

### Forms (states required)
- loading, disabled, error, success, empty

**Microcopy padrão (PT-BR)**
- Erro geral: “Não conseguimos salvar agora. Tente novamente em alguns segundos.”
- Sucesso: “Tudo pronto! Sua cobrança recorrente está criada.”
- Vazio: “Você ainda não cadastrou nenhum cliente. Adicione o primeiro para começar.”
