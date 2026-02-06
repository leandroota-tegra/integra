"use client"

import { FadeIn } from "@/components/features/motion/FadeIn"
import { Wallet, Users, Package, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"

const modules = [
    {
        title: "Financeiro Inteligente",
        desc: "DRE, Fluxo de Caixa e emissão de notas em um clique. Adeus planilhas manuais.",
        icon: Wallet,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-100",
        hoverBorder: "hover:border-blue-300",
        size: "col-span-1 md:col-span-1"
    },
    {
        title: "CRM & Vendas",
        desc: "Pipeline visual. Acompanhe cada lead desde o primeiro contato até o fechamento.",
        icon: Users,
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-100",
        hoverBorder: "hover:border-orange-300",
        size: "col-span-1 md:col-span-1"
    },
    {
        title: "Estoque & Logística",
        desc: "Controle de entrada e saída vinculado direto às vendas. Sem furos no inventário.",
        icon: Package,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        hoverBorder: "hover:border-emerald-300",
        size: "col-span-1 md:col-span-1"
    },
    {
        title: "Gestão & Metas",
        desc: "Painéis de performance para seu time. Saiba quem está batendo a meta em tempo real.",
        icon: Trophy,
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-100",
        hoverBorder: "hover:border-purple-300",
        size: "col-span-1 md:col-span-1"
    }
]

export function ModulesGrid() {
    return (
        <section className="py-32 bg-neutral-50 border-t border-neutral-200">
            <div className="container px-4 md:px-6">

                {/* Section Header */}
                <div className="mb-20 max-w-3xl">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6 tracking-tight">
                            Um sistema único para <br /> <span className="text-brand">toda sua empresa.</span>
                        </h2>
                        <p className="text-lg text-neutral-600 font-medium max-w-2xl leading-relaxed">
                            Chega de pagar 5 ferramentas diferentes. A Integra Suite centraliza tudo o que você precisa para crescer com controle.
                        </p>
                    </FadeIn>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {modules.map((item, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className={`
                                group relative overflow-hidden rounded-3xl p-8 md:p-10 transition-all duration-300
                                border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1
                                ${item.border} ${item.hoverBorder}
                            `}>
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${item.bg}`}>
                                    <item.icon className={`w-7 h-7 ${item.color}`} />
                                </div>

                                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-brand-dark transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-neutral-600 font-medium leading-relaxed mb-8">
                                    {item.desc}
                                </p>

                                {/* Fake 'Link' Interaction */}
                                <div className="flex items-center text-sm font-bold text-neutral-900 group-hover:text-brand transition-colors">
                                    Explorar Módulo <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Bottom CTA */}
                <FadeIn delay={0.4} className="mt-20 text-center">
                    <Link
                        href="/features"
                        className="inline-flex h-14 items-center justify-center rounded-full bg-brand px-10 text-lg font-bold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-hover hover:scale-105 active:scale-95"
                    >
                        Ver todos os recursos
                    </Link>
                </FadeIn>

            </div>
        </section>
    )
}
