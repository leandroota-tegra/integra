"use client"

import { FadeIn } from "@/components/features/motion/FadeIn"
import { Quote, Star, CheckCircle2 } from "lucide-react"

const testimonials = [
    {
        quote: "O impacto no fluxo de caixa foi imediato. Parei de perder dinheiro com esquecimentos de cobrança e tenho previsibilidade real.",
        author: "Fernanda L.",
        role: "Diretora Financeira",
        company: "Logística Express",
        stats: "+30% Receita Recuperada"
    },
    {
        quote: "Antes era um caos de planilhas e prints de WhatsApp. Hoje a operação roda sozinha e eu consigo focar em crescer o negócio.",
        author: "Ricardo M.",
        role: "CEO & Fundador",
        company: "Agência Vértice",
        stats: "Rotina 100% Automatizada" // Changed from "0 Horas..."
    },
    {
        quote: "A equipe de vendas e o financeiro finalmente falam a mesma língua. O fim das reuniões de alinhamento intermináveis.",
        author: "Juliana S.",
        role: "Head de Operações",
        company: "TechSolutions",
        stats: "Processo Sem Gargalos"
    }
]

export function TestimonialsSection() {
    return (
        <section id="depoimentos" className="py-32 bg-white relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-neutral-50 to-transparent pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <FadeIn>
                        <div className="flex items-center justify-center gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-orange-500 fill-orange-500" />
                            ))}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Resultados reais de quem <br />
                            <span className="text-orange-600">eliminou o caos.</span>
                        </h2>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">
                            Veja como líderes operacionais transformaram suas rotinas.
                        </p>
                    </FadeIn>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((item, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className="h-full p-8 rounded-3xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group flex flex-col">

                                {/* Quote Icon - Moved to background/watermark style to avoid overlap */}
                                <Quote className="w-12 h-12 text-slate-100 absolute top-6 right-6 -z-0 pointer-events-none" />

                                <div className="mb-8 relative z-10">
                                    <p className="text-lg text-slate-700 font-medium leading-relaxed">
                                        &quot;{item.quote}&quot;
                                    </p>
                                </div>

                                <div className="mt-auto pt-8 border-t border-slate-100 relative z-10">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg">{item.author}</h4>
                                            <p className="text-sm text-slate-500 mb-1">{item.role}</p>
                                            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">{item.company}</p>
                                        </div>
                                    </div>

                                    {/* Stat Badge */}
                                    <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100">
                                        <CheckCircle2 className="w-4 h-4 text-orange-600" />
                                        <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
                                            {item.stats}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

            </div>
        </section>
    )
}
