"use client"

import { FadeIn } from "@/components/features/motion/FadeIn"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useIsMobile } from "@/components/hooks/useMobile"

// Dynamic import for 3D component (Client-side only, no SSR)
const HeroCube = dynamic(() => import("@/components/features/3d/HeroCube").then(mod => mod.HeroCube), {
    ssr: false,
    loading: () => <div className="w-full h-full" />
})

export function Hero() {
    const isMobile = useIsMobile()
    const [isAssembling, setIsAssembling] = useState(false)
    const containerRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    return (
        <section ref={containerRef} className="relative min-h-[75vh] w-full flex items-center bg-brand overflow-hidden">
            {/* 1. Industrial Noise Texture (CSS Generated) */}
            <div className="absolute inset-0 z-[2] opacity-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* 2. Parallax Gradient Background */}
            <motion.div
                style={{ y: yBackground }}
                className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_#332F5A_0%,_#252244_100%)] opacity-80"
            />

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

            {/* 3. 3D Cube Scene (Desktop Only) */}
            {/* pointer-events-none ensures we can click through, but we pass mouse coords via shared context or tracking in global window inside the component */}
            {!isMobile && (
                <div className="absolute inset-0 z-[5]">
                    <HeroCube isAssembling={isAssembling} />
                </div>
            )}

            {/* Mobile Fallback */}
            {isMobile && (
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_30%,_rgba(11,95,217,0.2)_0%,_transparent_50%)]" />
            )}

            <div className="container px-4 md:px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
                {/* Left Column: Copy - Acts as Trigger Zone */}
                <motion.div
                    style={{ y: yText }}
                    className="text-left max-w-2xl group" // Added group for potential hover effects
                    onMouseEnter={() => setIsAssembling(true)}
                    onMouseLeave={() => setIsAssembling(false)}
                >
                    <FadeIn delay={0.2}>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-white cursor-default transition-opacity duration-300">
                            Pare de operar <br />
                            <span className="text-white/50 italic">no escuro.</span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-light tracking-wide max-w-lg cursor-default">
                            A Integra Suite conecta financeiro, processos e time em um único painel. <br className="hidden md:block" />
                            Automatize o "trabalho chato" e pare de cobrar status pelo WhatsApp.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <div className="flex flex-col items-start gap-6">
                            <div className="flex flex-col sm:flex-row gap-5">
                                <Button size="lg" className="rounded-full bg-cta hover:bg-cta-hover text-white font-bold px-10 text-lg h-16 border-0 shadow-[0_0_40px_-10px_rgba(255,93,0,0.5)] transition-shadow duration-500 hover:shadow-[0_0_60px_-10px_rgba(255,93,0,0.7)]">
                                    Começar Grátis
                                </Button>
                                <Button size="lg" variant="outline" className="group rounded-full border-white/10 text-white bg-white/5 hover:bg-white/10 px-8 text-lg h-16 backdrop-blur-sm transition-all hover:border-orange-500 hover:text-orange-500">
                                    Ver como funciona
                                    <ArrowRight className="ml-2 w-5 h-5 opacity-70 group-hover:text-orange-500 group-hover:opacity-100 transition-all" />
                                </Button>
                            </div>
                            <p className="text-xs font-mono text-white/30 uppercase tracking-widest pl-1">Sem cartão de crédito • Cancelamento a qualquer momento</p>
                        </div>
                    </FadeIn>
                </motion.div>

                {/* Right Column: Empty space for 3D Cube */}
                <div className="hidden md:block"></div>
            </div>
        </section>
    )
}
