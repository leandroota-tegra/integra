# TRACKING_MINIMO — Integra Suite (v1)
Status: Ready to implement  
Idioma: PT-BR  
Objetivo: medir conversão do site → trial → ativação (Pagamentos)

> Princípios:
> - Tracking mínimo (somente o que vai guiar decisão)
> - Nomes consistentes e propriedades enxutas
> - Evitar PII desnecessária (não enviar e-mail/nome em eventos)

---

## 1) North Star Metric (Ativação)
**North Star:** `payment_setup_completed`  
**Definição:** usuário concluiu o setup da primeira cobrança recorrente.

---

## 2) Eventos (mínimo obrigatório)

### 2.1 `page_viewed`
**Quando dispara:** em cada página do site e no onboarding (se aplicável).  
**Objetivo:** base de funil e origem de tráfego.

**Properties**
- `page_name` (ex.: `home`, `payments_lp`, `pricing`, `trial_step_1`)
- `page_path` (ex.: `/`, `/pagamentos`, `/planos`)
- `referrer` (string)
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (strings opcionais)
- `theme` (`light` | `dark`) (opcional)

---

### 2.2 `cta_start_trial_clicked`
**Quando dispara:** clique no CTA **“Comece grátis”** (header, hero, seções, CTA final).  
**Objetivo:** medir intenção (click-through) por página e posição do CTA.

**Properties**
- `page_name`
- `cta_location` (ex.: `header`, `hero`, `modules_section`, `final_cta`, `pricing_table`)
- `cta_text` (ex.: `Comece grátis`)
- `destination` (ex.: `/app/trial`)

---

### 2.3 `trial_started`
**Quando dispara:** quando o usuário inicia o trial (sessão criada).  
**Objetivo:** separar clique de CTA vs início real do trial (drop-off técnico ou fricção).

**Properties**
- `entry_product` (fixo: `payments`)
- `session_id` (id do trial/onboarding)
- `source_page` (ex.: `home`, `payments_lp`, `pricing`)
- `time_from_click_ms` (opcional)

---

### 2.4 `onboarding_step_completed`
**Quando dispara:** ao concluir cada etapa do onboarding (step 1, 2, 3).  
**Objetivo:** medir onde o usuário está travando.

**Properties**
- `session_id`
- `step_number` (1 | 2 | 3)
- `step_name` (ex.: `welcome`, `payment_setup`, `success`)
- `time_in_step_ms` (opcional)

---

### 2.5 `payment_setup_completed`
**Quando dispara:** quando a cobrança recorrente foi criada com sucesso.  
**Objetivo:** ativação (North Star).

**Properties**
- `session_id`
- `time_to_complete_ms` (tempo total desde `trial_started`)
- `billing_frequency` (ex.: `monthly`) (se existir)
- `had_error_before_success` (boolean) (opcional)

---

## 3) Onde os eventos disparam (mapa de implementação)

### 3.1 Site (Marketing)
**Home (`/`)**
- `page_viewed` (page_name=`home`)
- `cta_start_trial_clicked` (cta_location: `header`, `hero`, `modules_section`, `final_cta`)

**Pagamentos LP (`/pagamentos`)**
- `page_viewed` (page_name=`payments_lp`)
- `cta_start_trial_clicked` (cta_location: `header`, `hero`, `how_it_works`, `final_cta`)

**Planos (`/planos`)**
- `page_viewed` (page_name=`pricing`)
- `cta_start_trial_clicked` (cta_location: `hero`, `pricing_table`, `final_cta`)

### 3.2 Trial / Onboarding (Produto)
**Trial Step 1**
- `page_viewed` (page_name=`trial_step_1`) (opcional se SPA)
- `trial_started` (quando sessão criada)
- `onboarding_step_completed` (step_number=1)

**Trial Step 2**
- `onboarding_step_completed` (step_number=2)

**Trial Step 3**
- `onboarding_step_completed` (step_number=3)
- `payment_setup_completed`

---

## 4) Convenções (para evitar bagunça)
- `page_name` em snake_case e estável:
  - `home`, `payments_lp`, `pricing`, `trial_step_1`, `trial_step_2`, `trial_step_3`
- `cta_location` em snake_case:
  - `header`, `hero`, `modules_section`, `how_it_works`, `pricing_table`, `final_cta`
- Não enviar PII (nome, e-mail, documento) nos eventos
- Se tiver user_id, usar ID interno não identificável

---

## 5) Checklist (DoD tracking)
- [ ] Todos `page_viewed` implementados nas páginas MVP
- [ ] Todos cliques em “Comece grátis” disparam `cta_start_trial_clicked`
- [ ] `trial_started` dispara somente quando a sessão é criada de fato
- [ ] Steps disparam `onboarding_step_completed` corretamente
- [ ] `payment_setup_completed` dispara só em sucesso real
- [ ] Propriedades batem com as convenções
