"use client"

import { FadeIn } from "@/components/features/motion/FadeIn"
import {
    ScanEye,
    Rocket,
    ShieldCheck,
    Check
} from "lucide-react"

// BRAND GUIDELINES (LIGHT MODE)
// Background: #FAF9F6
// Surface: #FFFFFF
// Text Strong: #0F172A (Slate 900)
// Text Body: #334155 (Slate 700)
// Accents (WCAG AAA): 700 series

const benefits = [
    {
        title: "Visão de Raio-X",
        subtitle: "Controle Total",
        desc: "Pare de dirigir no escuro. DRE automático, fluxo de caixa e margem real por projeto em tempo real.",
        icon: ScanEye,
        color: "text-blue-700", // Stronger for light bg
        bg: "bg-blue-50",
        border: "border-blue-200",
        points: ["DRE Gerencial", "Conciliação Bancária", "Margem por Projeto"]
    },
    {
        title: "Ritmo de Crescimento",
        subtitle: "Máquina de Vendas",
        desc: "Uma operação que vende e entrega como um relógio. CRM conectado ao estoque e financeiro.",
        icon: Rocket,
        color: "text-orange-700", // Stronger for light bg
        bg: "bg-orange-50",
        border: "border-orange-200",
        points: ["Funil de Vendas", "Propostas em 1-Click", "Automação de Follow-up"]
    },
    {
        title: "Paz Mental",
        subtitle: "Blindagem Fiscal",
        desc: "Durma tranquilo. Emissão de notas e cálculo de impostos automático, sem erro humano.",
        icon: ShieldCheck,
        color: "text-emerald-700", // Stronger for light bg
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        points: ["NFS-e Automática", "Cálculo de Impostos", "Homologado em +2000 Cidades"]
    }
]

export function BenefitsSection() {
    return (
        <section id="beneficios" className="py-32 bg-white relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Não é só software. <br />
                            <span className="text-orange-600">É o fim do "Apagar Incêndio".</span>
                        </h2>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">
                            Troque a correria operacional por uma gestão previsível e estratégica.
                        </p>
                    </FadeIn>
                </div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((item, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className={`
                                h-full p-8 rounded-3xl border bg-slate-50 shadow-sm
                                transition-all duration-500 hover:-translate-y-2 hover:shadow-xl
                                group flex flex-col
                                ${item.border}
                            `}>
                                {/* Icon */}
                                <div className={`
                                    w-14 h-14 rounded-2xl flex items-center justify-center mb-8
                                    ${item.bg} group-hover:scale-110 transition-transform duration-300
                                `}>
                                    <item.icon className={`w-7 h-7 ${item.color}`} />
                                </div>

                                {/* Content */}
                                <div className="mb-8">
                                    <span className={`text-xs font-bold uppercase tracking-widest mb-2 block ${item.color}`}>
                                        {item.subtitle}
                                    </span>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 font-medium leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Checklist */}
                                <div className="mt-auto space-y-3">
                                    {item.points.map((point, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className={`p-1 rounded-full ${item.bg}`}>
                                                <Check className={`w-3 h-3 ${item.color}`} />
                                            </div>
                                            <span className="text-sm text-slate-600 font-medium">
                                                {point}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

            </div>
        </section>
    )
}
