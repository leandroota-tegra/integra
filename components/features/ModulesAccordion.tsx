"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/features/motion/FadeIn"
import { Wallet, Users, Package, Trophy, ArrowRight, FileText, CreditCard } from "lucide-react"
import { SpotlightButton } from "@/components/ui/SpotlightButton"

// STRICT BRAND PALETTE:
// Brand (Cobalt): #252244 -> text-brand
// CTA (Orange): #FF5D00 -> text-cta
// Neutral: text-neutral-900

const modules = [
    {
        id: "finance",
        title: "Financeiro",
        subtitle: "Controle Total",
        desc: "DRE, Fluxo de Caixa e conciliação bancária. Adeus planilhas manuais.",
        icon: Wallet,
        color: "text-brand", // Cobalt
        bg: "bg-brand/5",
        highlight: "bg-brand"
    },
    {
        id: "crm",
        title: "CRM & Vendas",
        subtitle: "Pipeline Visual",
        desc: "Acompanhe cada lead do contato ao fechamento. Nunca mais perca uma venda.",
        icon: Users,
        color: "text-cta", // Orange (Strategic Highlight for Sales)
        bg: "bg-cta/5",
        highlight: "bg-cta"
    },
    {
        id: "stock",
        title: "Estoque",
        subtitle: "Gestão Integrada",
        desc: "Entrada e saída vinculadas ao vendas. Inventário sempre batendo 100%.",
        icon: Package,
        color: "text-brand", // Cobalt
        bg: "bg-brand/5",
        highlight: "bg-brand"
    },
    {
        id: "team",
        title: "Gestão",
        subtitle: "Alta Performance",
        desc: "Metas, comissões e kpis do time em tempo real. Liderança por dados.",
        icon: Trophy,
        color: "text-brand", // Cobalt
        bg: "bg-brand/5",
        highlight: "bg-brand"
    },
    {
        id: "fiscal",
        title: "Fiscal",
        subtitle: "Emissão Rápida",
        desc: "Emita NF-e e NFS-e em 1 clique. Cálculo automático de impostos.",
        icon: FileText,
        color: "text-brand", // Cobalt
        bg: "bg-brand/5",
        highlight: "bg-brand"
    },
    {
        id: "payments",
        title: "Pagamentos",
        subtitle: "Cobrança Auto",
        desc: "Boletos, Pix e Cartão integrados. Régua de cobrança automática.",
        icon: CreditCard,
        color: "text-brand", // Cobalt
        bg: "bg-brand/5",
        highlight: "bg-brand"
    }
]

export function ModulesAccordion() {
    const [activeId, setActiveId] = useState("finance")

    return (
        <section className="py-32 bg-brand overflow-hidden">
            <div className="container px-4 md:px-6">

                {/* Header */}
                <div className="mb-20 max-w-3xl">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                            Um sistema único para <br /> <span className="text-white/50">toda sua empresa.</span>
                        </h2>
                        <p className="text-lg text-blue-200/80 font-medium max-w-2xl leading-relaxed">
                            Chega de pagar 5 ferramentas. Centralize Financeiro, Vendas, Fiscal e Operação.
                        </p>
                    </FadeIn>
                </div>

                {/* Accordion Container */}
                <div className="flex flex-col md:flex-row gap-3 h-[800px] md:h-[550px]">
                    {modules.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            onClick={() => setActiveId(item.id)}
                            onHoverStart={() => setActiveId(item.id)}
                            className={`
                                relative rounded-3xl overflow-hidden cursor-pointer transition-colors duration-500
                                ${activeId === item.id ? 'flex-[4]' : 'flex-[1]'}
                                ${activeId === item.id ? 'bg-white' : 'bg-white/5 hover:bg-white/10'}
                            `}
                        >
                            {/* Inner Content Layout */}
                            <div className="h-full w-full p-6 md:p-8 flex flex-col justify-between relative z-10">

                                {/* Top: Icon */}
                                <div className="flex justify-between items-start">
                                    <div className={`
                                        w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                                        ${activeId === item.id ? item.bg : 'bg-white/10'}
                                    `}>
                                        <item.icon className={`
                                            w-6 h-6 md:w-7 md:h-7 transition-all duration-500
                                            ${activeId === item.id ? item.color : 'text-white/70'}
                                        `} />
                                    </div>

                                    {/* Arrow for active state */}
                                    <div className={`
                                        hidden md:block p-2 rounded-full border transition-all duration-300 
                                        ${activeId === item.id ? 'opacity-100 border-neutral-200 rotate-0' : 'opacity-0 -rotate-45'}
                                    `}>
                                        <ArrowRight className="w-5 h-5 text-neutral-400" />
                                    </div>
                                </div>

                                {/* Bottom: Text Content */}
                                <div>
                                    {/* Subtitle (Only visible when active) */}
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: activeId === item.id ? 1 : 0 }}
                                        className={`text-xs md:text-sm font-bold uppercase tracking-wider mb-2 ${item.color}`}
                                    >
                                        {item.subtitle}
                                    </motion.p>

                                    {/* Title */}
                                    <h3
                                        className={`
                                            text-xl md:text-2xl font-bold mb-4 transition-all duration-300 
                                            ${activeId === item.id ? 'text-neutral-900' : 'text-neutral-400'}
                                            whitespace-nowrap
                                        `}
                                    >
                                        {item.title}
                                    </h3>

                                    {/* Description (Only visible when active) */}
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: activeId === item.id ? 1 : 0, height: activeId === item.id ? 'auto' : 0 }}
                                        className="text-neutral-600 font-medium leading-relaxed max-w-md overflow-hidden text-sm md:text-base"
                                    >
                                        {item.desc}
                                    </motion.p>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <FadeIn delay={0.4} className="mt-20 text-center">
                    <SpotlightButton
                        href="/features"
                        className="inline-flex h-14 items-center justify-center rounded-full bg-cta px-10 text-lg font-bold text-white shadow-lg shadow-cta/25 transition-all hover:bg-cta-hover hover:scale-105 active:scale-95"
                    >
                        Ver todos os recursos
                    </SpotlightButton>
                </FadeIn>

            </div>
        </section>
    )
}
