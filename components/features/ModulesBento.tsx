"use client"

import { FadeIn } from "@/components/features/motion/FadeIn"
import {
    LayoutDashboard,
    Clock,
    FileText,
    GitPullRequest,
    Users,
    ShieldAlert,
    Wallet,
    TrendingUp,
    CreditCard,
    MessageCircle,
    ArrowUpRight
} from "lucide-react"
import Link from "next/link"
import { EcossistemaBackground } from "./EcossistemaBackground"

// Standardized Card Component for absolute consistency
function BentoCard({ title, desc, icon: Icon, size, bg = "bg-white/10", iconColor = "text-white" }: any) {
    return (
        <div className={`
            ${size} group relative overflow-hidden rounded-3xl border border-white/10 p-8 
            transition-all duration-300 hover:border-white/20 hover:bg-white/15 hover:shadow-2xl hover:-translate-y-1
            flex flex-col justify-between ${bg} backdrop-blur-xl
        `}>
            {/* Hover Glow */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/5 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />

            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-2xl ring-1 ring-white/10">
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>

                <div className="flex items-center gap-2">
                    {/* Hover Arrow */}
                    <div className="p-2 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-100 transition-colors">
                    {title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-blue-100/60 max-w-[90%]">
                    {desc}
                </p>
            </div>
        </div>
    )
}



export function ModulesBento() {
    return (
        <section id="modulos" className="relative py-24 bg-[#111C33] overflow-hidden">
            <EcossistemaBackground />
            <div className="container relative z-10 px-4 md:px-6">

                {/* Clean Header */}
                <div className="mb-16 md:mb-20">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                            O Ecossistema <span className="text-cta">Integra.</span>
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-cta to-transparent rounded-full mb-6" />
                        <p className="text-lg text-blue-100/70 font-medium max-w-2xl leading-relaxed">
                            Um sistema operacional completo. 10 módulos desenhados para falar a mesma língua e eliminar a fragmentação da sua empresa.
                        </p>
                    </FadeIn>
                </div>

                {/* STRICT GRID SYSTEM: 4 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(220px,auto)]">

                    {/* --- ROW 1 (Left Heavy) --- */}

                    {/* 1. HUB (Span 2) */}
                    <FadeIn className="col-span-1 md:col-span-2">
                        <BentoCard
                            title="Integra Hub"
                            desc="O centro da operação. Visão consolidada de clientes, projetos e tarefas."
                            icon={LayoutDashboard}
                            size="h-full"
                            bg="bg-gradient-to-br from-white/15 to-white/10"
                            iconColor="text-cta" // Orange Acccent for Core
                        />
                    </FadeIn>

                    {/* 2. TEMPO (Span 1) */}
                    <FadeIn delay={0.1} className="col-span-1">
                        <BentoCard
                            title="Integra Tempo"
                            desc="Timesheet real. Menos 'achismo' na gestão de esforço."
                            icon={Clock}
                            size="h-full"
                        />
                    </FadeIn>

                    {/* 3. FIN (Span 1) */}
                    <FadeIn delay={0.15} className="col-span-1">
                        <BentoCard
                            title="Integra Fin"
                            desc="Caixa, DRE e Conciliação em uma tela só."
                            icon={Wallet}
                            size="h-full"
                            iconColor="text-emerald-400"
                        />
                    </FadeIn>


                    {/* --- ROW 2 (Right Heavy - Staggered) --- */}

                    {/* 4. TALENTOS (Span 1) */}
                    <FadeIn delay={0.2} className="col-span-1">
                        <BentoCard
                            title="Integra Talentos"
                            desc="Recrutamento e seleção organizados."
                            icon={Users}
                            size="h-full"
                        />
                    </FadeIn>

                    {/* 5. PAY (Span 1) */}
                    <FadeIn delay={0.25} className="col-span-1">
                        <BentoCard
                            title="Integra Pay"
                            desc="Régua de cobrança automática."
                            icon={CreditCard}
                            size="h-full"
                        />
                    </FadeIn>

                    {/* 6. VENDAS (Span 2 - Moved Right) */}
                    <FadeIn delay={0.3} className="col-span-1 md:col-span-2">
                        <BentoCard
                            title="Integra Vendas"
                            desc="CRM conectado à operação. Do lead ao contrato sem perder contexto."
                            icon={TrendingUp}
                            size="h-full"
                            iconColor="text-orange-400"
                        />
                    </FadeIn>


                    {/* --- ROW 3 (Balanced) --- */}

                    {/* 7. FLUXO */}
                    <FadeIn delay={0.35} className="col-span-1">
                        <BentoCard
                            title="Integra Fluxo"
                            desc="Workflow e aprovações."
                            icon={GitPullRequest}
                            size="h-full"
                        />
                    </FadeIn>

                    {/* 8. LICITA */}
                    <FadeIn delay={0.4} className="col-span-1">
                        <BentoCard
                            title="Integra Licita"
                            desc="Gestão de licitações e atestados."
                            icon={FileText}
                            size="h-full"
                        />
                    </FadeIn>

                    {/* 9. COFRE */}
                    <FadeIn delay={0.45} className="col-span-1">
                        <BentoCard
                            title="Integra Cofre"
                            desc="Gestão segura de senhas."
                            icon={ShieldAlert}
                            size="h-full"
                        />
                    </FadeIn>

                    {/* 10. ZAP */}
                    <FadeIn delay={0.5} className="col-span-1">
                        <BentoCard
                            title="Integra Zap"
                            desc="Automação via WhatsApp."
                            icon={MessageCircle}
                            size="h-full"
                        />
                    </FadeIn>

                </div>

                {/* Bottom CTA */}
                <FadeIn delay={0.6} className="mt-20 text-center">
                    <Link
                        href="/teste-gratis"
                        className="inline-flex h-14 items-center justify-center rounded-full bg-cta px-10 text-lg font-bold text-white shadow-lg shadow-cta/25 transition-all hover:bg-cta-hover hover:scale-105 active:scale-95"
                    >
                        Começar teste grátis
                    </Link>
                </FadeIn>

            </div>
        </section>
    )
}
