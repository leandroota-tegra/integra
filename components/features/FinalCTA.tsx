"use client"

import { FadeIn } from "@/components/features/motion/FadeIn"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10 text-center">
                <FadeIn>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight max-w-4xl mx-auto">
                        Sua operação merece rodar no <br className="hidden md:block" />
                        <span className="text-orange-600">piloto automático.</span>
                    </h2>

                    <p className="text-xl text-slate-600 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        Junte-se a gestores que trocaram o caos das planilhas pela previsibilidade da Integra Suite.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            href="/teste-gratis"
                            className="inline-flex h-16 items-center justify-center rounded-full bg-cta px-10 text-xl font-bold text-white shadow-xl shadow-cta/20 transition-all hover:bg-cta-hover hover:scale-105 active:scale-95 w-full md:w-auto"
                        >
                            Começar teste grátis
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>

                        <Link
                            href="/demo"
                            className="inline-flex h-16 items-center justify-center rounded-full border-2 border-slate-200 bg-white px-10 text-xl font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 w-full md:w-auto"
                        >
                            Ver demonstração
                        </Link>
                    </div>

                    <p className="mt-8 text-sm text-slate-400 font-medium">
                        Setup em 7 dias • Sem fidelidade • Cancelamento fácil
                    </p>
                </FadeIn>
            </div>
        </section>
    )
}
