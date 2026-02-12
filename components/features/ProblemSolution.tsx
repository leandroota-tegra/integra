"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FadeIn } from "@/components/features/motion/FadeIn"
import { AlertCircle, FileX, MessageSquareWarning, CheckCircle2, Zap, BarChart3 } from "lucide-react"

// Data for the 'Chaos' State - GRAYSCALE / LIFELESS
const chaosItems = [
    {
        title: "Dados no Escuro",
        desc: "Você descobre o prejuízo só no fim do mês.",
        icon: FileX,
        color: "text-neutral-500", // Dull Gray
        border: "border-neutral-200",
        bg: "bg-neutral-50",
        iconBg: "bg-neutral-200"
    },
    {
        title: "Cobrança Manual",
        desc: "Seu time perde 4h/dia cobrando no WhatsApp.",
        icon: MessageSquareWarning,
        color: "text-neutral-500",
        border: "border-neutral-200",
        bg: "bg-neutral-50",
        iconBg: "bg-neutral-200"
    },
    {
        title: "Processos Soltos",
        desc: "Cada um faz de um jeito. Erros são constantes.",
        icon: AlertCircle,
        color: "text-neutral-500",
        border: "border-neutral-200",
        bg: "bg-neutral-50",
        iconBg: "bg-neutral-200"
    }
]

// Data for the 'Order' State (Integra) - VIBRANT / ALIVE
const orderItems = [
    {
        title: "Painel em Tempo Real",
        desc: "Faturamento, caixa e metas na palma da mão.",
        icon: BarChart3,
        color: "text-blue-600", // Vibrant Blue
        border: "border-blue-200",
        bg: "bg-white",
        iconBg: "bg-blue-100"
    },
    {
        title: "Automação Total",
        desc: "Cobranças e notas fiscais enviadas sozinhas.",
        icon: Zap,
        color: "text-orange-600", // Vibrant Orange
        border: "border-orange-200",
        bg: "bg-white",
        iconBg: "bg-orange-100"
    },
    {
        title: "Processo Padrão",
        desc: "Playbooks definidos. O sistema guia o time.",
        icon: CheckCircle2,
        color: "text-emerald-600", // Vibrant Green
        border: "border-emerald-200",
        bg: "bg-white",
        iconBg: "bg-emerald-100"
    }
]

interface CardProps {
    item: {
        title: string
        desc: string
        icon: React.ElementType | any
        color: string
        border: string
        bg: string
        iconBg: string
    }
    isChaos: boolean
}

function Card({ item, isChaos }: CardProps) {
    return (
        <div className={`p-6 rounded-2xl border transition-all duration-300 group ${isChaos
            ? `border-neutral-200 bg-neutral-50 hover:border-neutral-300` // Gray/Dull
            : `border-brand/10 bg-white hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 shadow-sm` // Clean/Vibrant
            }`}>

            {/* Icon Container */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${item.iconBg}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>

            {/* Title */}
            <h3 className={`text-xl font-bold mb-2 ${isChaos ? "text-neutral-600" : "text-brand-dark"}`}>
                {item.title}
            </h3>

            {/* Description */}
            <p className={`leading-relaxed font-medium ${isChaos ? "text-neutral-500" : "text-neutral-700"}`}>
                {item.desc}
            </p>
        </div>
    )
}

export function ProblemSolution() {
    const containerRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const heightLine = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

    return (
        <section id="solucao" ref={containerRef} className="relative py-32 bg-white overflow-hidden">

            {/* Background Element - Subtle Grid */}
            <div className="absolute inset-0 z-0 opacity-30 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            <div className="container relative z-10 px-4 md:px-6">

                {/* Header */}
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight">
                            Por que é tão difícil <br /> <span className="text-orange-600">escalar sua operação?</span>
                        </h2>
                        <p className="text-lg text-neutral-600 font-medium">
                            O método tradicional depende de esforço humano heroico. <br />
                            A Integra Suite depende de <span className="text-brand font-bold">inteligência sistêmica</span>.
                        </p>
                    </FadeIn>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">

                    {/* The Center Line Visual */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 hidden md:block -translate-x-1/2">
                        <motion.div
                            style={{ height: heightLine }}
                            className="w-full bg-gradient-to-b from-transparent via-brand to-transparent"
                        />
                    </div>

                    {/* Left: Chaos (Legacy) - GRAYSCALE */}
                    <div className="space-y-8 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="text-center md:text-right mb-8">
                            <h3 className="text-2xl font-black text-neutral-400 uppercase tracking-widest font-mono">O Jeito Antigo</h3>
                            <p className="text-neutral-500 font-bold text-sm mt-2">Manual e Lento</p>
                        </div>
                        {chaosItems.map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1} direction="right">
                                <Card item={item} isChaos={true} />
                            </FadeIn>
                        ))}
                    </div>

                    {/* Right: Order (Integra) - COLORFUL */}
                    <div className="space-y-8">
                        <div className="text-center md:text-left mb-8">
                            <h3 className="text-2xl font-black text-brand uppercase tracking-widest font-mono">O Jeito Integra</h3>
                            <p className="text-cta font-bold text-sm mt-2">Automático e Rápido</p>
                        </div>
                        {orderItems.map((item, i) => (
                            <FadeIn key={i} delay={0.3 + (i * 0.1)} direction="left">
                                <Card item={item} isChaos={false} />
                            </FadeIn>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
