# PROJECT_RULES_ADDON — Integra Suite (v2)
Status: Active (enforce)  
Idioma: PT-BR  
Objetivo: garantir consistência estratégica e de conteúdo ao gerar páginas no Antigravity.

> Complementa o `PROJECT_RULES.md` (técnico).  
> Aqui ficam as **travas estratégicas** + regras de conteúdo para o agente não “inventar”.

---

## 0) Understanding Lock (obrigatório)
### Persona primária (quem o site atende primeiro)
**Gestor(a) de Operações / Financeiro(a)** em PMEs com recorrência e/ou múltiplas frentes desconectadas.

### Ação principal (conversão primária)
**B) “Comece grátis” (self-service)**  
- Sempre inicia por **Trial Pagamentos**
- É o CTA primário do site inteiro

### Ação secundária (fallback)
- **Falar com vendas** (Enterprise / requisitos específicos)

### Definição de sucesso
- Sucesso do site: aumentar `trial_started` com tráfego qualificado
- Sucesso do produto: `payment_setup_completed`

---

## 1) Regras de promessa (anti-hype)
- Priorizar **clareza** e **benefício prático**.
- Proibidos: “revolucionário”, “mágico”, “o melhor do mercado”, “IA faz tudo”.
- **Não publicar números/claims** sem fonte aprovada pelo CEO:
  - ex.: “reduz inadimplência em X%”, “+34% produtividade”, “99.9% uptime”, “certificação X”

---

## 2) Regras de CTA (conversão)
- **1 CTA primário por seção** (máximo).
- CTA primário padrão: **“Comece grátis”**.
- “Comece grátis” sempre roteia para **Trial Pagamentos**.
- CTAs secundários permitidos:
  - “Ver planos”
  - “Ver módulos”
  - “Falar com vendas”
- **Dark Mode:** CTA primário deve ser **laranja** (token `cta`).

---

## 3) Mensagem guarda-chuva (sempre presente)
Toda página deve reforçar pelo menos **um** desses pontos:
- “conectar frentes”
- “visão do todo”
- “menos fricção / menos retrabalho”
- “mais controle / rastreabilidade”

Pagamentos deve aparecer como:
- **entrada** (time-to-value alto)
- ponte para expandir para a suíte

---

## 4) Estrutura mínima por tipo de página
### Home
- Hero + CTA
- Por que escolher (3–4 cards)
- Módulos (grid) com Pagamentos em destaque
- Prova (sem números não validados)
- FAQ
- CTA final

### LP Pagamentos
- Hero + CTA
- Como funciona (3 passos)
- Caso âncora
- Benefícios
- Confiança (bullets)
- Ponte para visão do todo (suite)
- FAQ
- CTA final

### Planos
- Hero + CTA
- Como escolher
- Tabela 3 tiers (placeholders ok)
- FAQ
- CTA final

---

## 5) Regras de microcopy (consistência)
Usar sempre que necessário:
- Erro geral: “Não conseguimos salvar agora. Tente novamente em alguns segundos.”
- Sucesso: “Tudo pronto! Sua cobrança recorrente está criada.”
- Vazio: “Você ainda não cadastrou nenhum cliente. Adicione o primeiro para começar.”

---

## 6) Termos padronizados (não variar)
- “Módulos” (capacidades)
- “Suíte” (visão integrada)
- “Comece grátis” (trial self-serve)
- “Ativação” (setup da primeira cobrança concluído)

---

## 7) Checklist final (antes de publicar)
- [ ] Persona primária refletida no hero (operação/financeiro)
- [ ] CTA primário por seção (sem competição)
- [ ] “Comece grátis” roteia para Trial Pagamentos
- [ ] Sem números/claims técnicos não validados
- [ ] Mensagem guarda-chuva aparece (visão do todo + conexão)
- [ ] FAQ presente (quando aplicável)
- [ ] Contraste e foco ok em Light/Dark
