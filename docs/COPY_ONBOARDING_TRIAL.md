# COPY_ONBOARDING_TRIAL — Integra Suite (Trial Pagamentos) (v1)
Status: Ready to implement  
Idioma: PT-BR  
Objetivo: Ativação rápida (primeiro valor) → **criar a primeira cobrança recorrente**

> Regras:
> - Fluxo curto: 3 telas (máximo)
> - Linguagem simples e operacional (sem hype)
> - Estados obrigatórios: loading / disabled / error (retry) / success / empty
> - CTAs consistentes com o resto do site

---

## VISÃO GERAL DO FLUXO
**Entrada:** CTA “Comece grátis” (Home / Pagamentos / Planos)  
**Saída (ativação):** cobrança recorrente criada + próximo passo (adicionar cliente)

### North Star (ativação)
- Usuário conclui setup da cobrança: `payment_setup_completed`

---

## TELA 1 — BOAS-VINDAS (Start)
### Objetivo da tela
Contextualizar e reduzir fricção: “em poucos minutos você chega ao primeiro valor”.

### Título
### Título
Faltam 3 minutos para você parar de cobrar manual

### Subtítulo
Leva ~3 minutos. Você pode ajustar depois.

### Campos (mínimos)
> **Assunção:** se o produto já tem autenticação/cadastro padrão, essa tela pode ser “criar conta” ou pode ser pulada para usuários logados.

- Nome
- E-mail
- Empresa (opcional, se não for necessário)

### CTA
- **Primário:** Começar
- **Secundário (link):** Prefiro falar com vendas

### Microcopy auxiliar (opcional)
- “Sem instalação. É tudo web.”

### Estados
- **Disabled:** botão “Começar” desativado até e-mail válido (se houver validação)
- **Error (inline):**
  - E-mail inválido: “Digite um e-mail válido.”
- **Error (global):**
  - “Não conseguimos criar sua conta agora. Tente novamente.”

---

## TELA 2 — SETUP DA COBRANÇA (First Value)
### Objetivo da tela
Criar a primeira cobrança recorrente com o mínimo de campos.

### Título
Crie sua primeira cobrança

### Subtítulo
Defina o essencial para colocar a recorrência para rodar.

### Campos (mínimos)
- Nome da cobrança (ex.: “Mensalidade”)
- Valor
- Frequência (padrão: Mensal)
- Vencimento (dia do mês)

### Defaults recomendados
- Frequência pré-selecionada: **Mensal**
- Nome sugerido (placeholder): “Mensalidade”
- Vencimento sugerido (placeholder): “Dia 10”

### CTA
- **Primário:** Concluir e criar
- **Secundário (link):** Voltar

### Validações (inline)
- Campo obrigatório: “Preencha este campo para continuar.”
- Valor inválido: “Digite um valor válido.”
- Dia inválido: “Escolha um dia entre 1 e 28.”

### Estados
- **Disabled:** “Concluir e criar” desativado até todos campos válidos
- **Loading:** “Criando cobrança…” (spinner)
- **Error (global com retry):**
  - “Não conseguimos criar sua cobrança agora. Tente novamente.”
  - Botões: “Tentar novamente” | “Voltar”

---

## TELA 3 — SUCESSO + PRÓXIMOS PASSOS (Activation)
### Objetivo da tela
Confirmar valor entregue e conduzir para a próxima ação.

### Título
Tudo pronto! Sua cobrança recorrente está criada.

### Subtítulo
Agora você pode adicionar clientes e começar a cobrar.

### Cards (próximos passos)
1) **Adicionar primeiro cliente**  
Cadastre um cliente para iniciar a cobrança.

2) **Importar lista** *(se existir)*  
Traga seus clientes de uma planilha.

3) **Ver planos**  
Veja opções para evoluir por módulos conforme a operação cresce.

### CTA
- **Primário:** Adicionar primeiro cliente
- **Secundário:** Ver planos
- **Link (opcional):** Ir para o painel

### Estado “Empty” (pós-setup, se necessário)
- Título: “Você ainda não cadastrou nenhum cliente.”
- Texto: “Adicione o primeiro para começar.”
- CTA: “Adicionar cliente”

---

## EVENTOS (TRACKING MÍNIMO)
> Enviar apenas os mínimos já definidos no PRODUCT_BRIEF.

- `trial_started` (quando o usuário entra no fluxo e inicia sessão)
- `onboarding_step_completed` (step_number = 1, 2, 3)
- `payment_setup_completed` (time_to_complete)
- `cta_start_trial_clicked` (page_name, cta_location) — vem do site

---

## CHECKLIST (DEFINITION OF DONE)
- [ ] Fluxo navegável com 3 telas
- [ ] Validações inline definidas (campos mínimos)
- [ ] Estados: loading / disabled / error (retry) / success / empty
- [ ] Microcopy consistente com o resto do site
- [ ] CTAs padronizados (Começar / Concluir e criar / Adicionar primeiro cliente)
