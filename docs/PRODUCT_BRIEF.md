# PRODUCT_BRIEF — Integra Suite (V3)

Status: v2 (com “Understanding Lock”)  
Última atualização: 2026-02-05  
Working name: Integra Suite

---

## 0) Understanding Lock (trava de entendimento)
### Persona primária (quem está “cego” hoje)
**Gestor(a) de Operações / Financeiro(a)** (em PMEs e negócios com recorrência) — a pessoa que:
- sofre com informações espalhadas (planilhas, WhatsApp, sistemas soltos)
- precisa de status claro de “o que está acontecendo” (pendências, responsáveis, prazos)
- é cobrada por previsibilidade (caixa, cobranças, execução)

**Persona secundária (influenciador/decisor)**
CEO/Founder (quer visão do todo e controle, mas não quer “projeto de ERP”).

### Conversão primária do site (única ação principal)
**B) Criar uma conta / “Comece grátis” (Self-service)**  
➡️ sempre iniciando pelo **Trial Pagamentos** (porta de entrada).

### Conversão secundária (fallback)
“Falar com vendas” (Enterprise / casos com exigências específicas).

### Sucesso (definição objetiva)
- Sucesso do site: aumentar **trial_started** a partir de tráfego qualificado.
- Sucesso do produto (ativação): **payment_setup_completed** (primeira cobrança criada).

---

## 1) O que é
Integra Suite é uma plataforma modular para **conectar frentes da operação** (processos, pessoas, documentos e pagamentos) e dar uma **visão do todo** — com implementação rápida e expansão por módulos.

---

## 2) Problema central (root pain)
A operação está fragmentada (planilhas + WhatsApp + ferramentas separadas). Isso gera:
- retrabalho e duplicidade de informação
- falta de rastreabilidade (quem fez o quê / status / prazos)
- decisões lentas por falta de visão consolidada
- risco operacional (erros, acessos soltos, dados espalhados)
- dificuldade de escala (cada novo cliente/projeto vira caos)

Frase âncora:
> “A empresa perde ritmo porque a operação está desconectada.”

---

## 3) Proposta de valor (guarda-chuva)
**Uma visão do todo. Menos fricção. Mais controle.**

Tese:
- Conecta frentes sem exigir um “projeto de ERP” para começar
- Modular: entra por dor específica e expande quando precisar
- Clareza e rastreabilidade como padrão

---

## 4) Estratégia de entrada (freemium)
**Comece grátis → Trial iniciando por Pagamentos (Recorrência)**

Motivo:
- Pagamentos tem alto time-to-value (valor rápido)
- Facilita ativação e aprendizado do produto
- Abre caminho para conectar módulos e evoluir para a suíte

---

## 5) ICPs (prioridade)
### ICP A — Entrada (Pagamentos / Recorrência)
- Quem: negócios com cobrança recorrente (mensalidades/serviços/assinaturas) com operação enxuta
- Campeão interno: Operações/Financeiro
- Dor: inadimplência, cobrança manual, falta de previsibilidade, status disperso
- JTBD: “Quero rodar recorrência e acompanhar recebimentos sem caos”
- Ativação (primeiro valor): **criar a primeira cobrança recorrente** e estar pronto para adicionar clientes/enviar links

### ICP B — Suíte (upsell)
- Quem: software houses / consultorias tech (ou operações multi-frente) que precisam conectar projetos, pessoas e financeiro
- Dor: informação espalhada, baixa governança, retrabalho, pouca visibilidade consolidada
- JTBD: “Quero uma visão única da operação e processos rastreáveis”

---

## 6) Objetivo do site
Primário:
- **Converter para trial** (Comece grátis → onboarding Pagamentos)

Secundário:
- Explicar a suíte e a lógica modular (visão do todo)
- Capturar intenção Enterprise via “Falar com vendas”

---

## 7) Funil do site (MVP)
Home → LP Pagamentos → Comece grátis → Onboarding trial (3 telas) → Ativação

---

## 8) Regras de conversão (CRO)
- 1 CTA primário por seção
- CTA primário padrão: **“Comece grátis”**
- Dark Mode: CTA primário sempre laranja (Tegra Spark)
- Sempre incluir na LP: **3 passos**, **confiança (bullets)** e **FAQ**
- Claims sempre demonstráveis (sem números inventados)

---

## 9) Onboarding (3 telas) — mínimo viável
Objetivo: chegar ao primeiro valor em minutos (setup de recorrência)

1) Boas-vindas + objetivo (“Leva ~3 minutos”)
2) Setup da cobrança (valor/frequência/vencimento) + validação inline
3) Sucesso + próximos passos (Adicionar cliente / Ver planos)

Estados obrigatórios:
loading / disabled / error (retry) / success / empty

---

## 10) Métricas e tracking (mínimo)
North Star:
- `payment_setup_completed`

Eventos mínimos:
- `page_viewed` (page_name, utm_*, referrer)
- `cta_start_trial_clicked` (page_name, cta_location)
- `trial_started` (entry_product='payments', session_id)
- `onboarding_step_completed` (step_number)
- `payment_setup_completed` (time_to_complete)

---

## 11) Guardrails (o que NÃO afirmar sem prova)
Não publicar sem validação:
- “reduz inadimplência em X%”
- “mais barato que…”
- “certificação X”
- “integra com tudo” (listar integrações reais)

---

## 12) Termos (consistência)
- “Módulos” = capacidades específicas que podem ter vida própria
- “Suíte” = conjunto integrado com visão do todo
- “Comece grátis” = trial self-serve iniciando por Pagamentos
- “Ativação” = usuário conclui setup da primeira cobrança recorrente
