"use client"
// Vercel Sync Hash: 2026-02-06-1925

import { FadeIn } from "@/components/features/motion/FadeIn"
import { SpotlightButton } from "@/components/ui/SpotlightButton"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useIsMobile } from "@/components/hooks/useMobile"
import { EcossistemaBackground } from "@/components/features/EcossistemaBackground"


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
        <section ref={containerRef} className="relative min-h-screen md:min-h-[75vh] w-full flex flex-col md:flex-row items-center bg-brand overflow-hidden pt-48 pb-16 md:pt-0 md:pb-0">
            {/* 1. Industrial Noise Texture (CSS Generated) */}
            <div className="absolute inset-0 z-[2] opacity-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* 2. Unified Grid Pulse Background */}
            <EcossistemaBackground />

            {/* 3. 3D Cube Scene (Desktop Only) */}
            {!isMobile && (
                <div className="absolute inset-0 z-[5]">
                    <HeroCube isAssembling={isAssembling} />
                </div>
            )}

            {/* Mobile Fallback */}
            {isMobile && (
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,_rgba(255,107,0,0.15)_0%,_transparent_60%)]" />
            )}

            <div className="container px-4 md:px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Column: Copy - Acts as Trigger Zone */}
                <motion.div
                    style={{ y: yText }}
                    className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl mx-auto md:mx-0 group"
                    onMouseEnter={() => setIsAssembling(true)}
                    onMouseLeave={() => setIsAssembling(false)}
                >
                    <FadeIn delay={0.2}>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-white cursor-default transition-opacity duration-300">
                            Pare de operar <br />
                            <span className="text-white/50 italic">no escuro.</span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-light tracking-wide max-w-lg mx-auto md:mx-0 cursor-default">
                            A Integra Suite conecta financeiro, processos e time em um único painel. <br className="hidden md:block" />
                            Automatize o "trabalho chato" e pare de cobrar status pelo WhatsApp.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <div className="flex flex-col items-center md:items-start gap-6">
                            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                                <SpotlightButton
                                    spotlightColor="rgba(255, 255, 255, 0.2)"
                                    spotlightSize={200}
                                    size="lg"
                                    className="rounded-full bg-cta hover:bg-cta-hover text-white font-bold px-10 text-lg h-16 border-0 shadow-[0_0_40px_-10px_rgba(255,93,0,0.5)] transition-shadow duration-500 hover:shadow-[0_0_60px_-10px_rgba(255,93,0,0.7)] w-full"
                                >
                                    Começar Grátis
                                </SpotlightButton>
                                <SpotlightButton
                                    spotlightColor="rgba(255, 255, 255, 0.1)"
                                    spotlightSize={200}
                                    size="lg"
                                    variant="outline"
                                    className="group rounded-full border-white/10 text-white bg-white/5 hover:bg-white/10 px-8 text-lg h-16 backdrop-blur-sm transition-all hover:border-orange-500 hover:text-orange-500 w-full"
                                >
                                    Ver como funciona
                                    <ArrowRight className="ml-2 w-5 h-5 opacity-70 group-hover:text-orange-500 group-hover:opacity-100 transition-all" />
                                </SpotlightButton>
                            </div>
                            <p className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-widest text-center md:text-left">Sem cartão de crédito • Cancelamento a qualquer momento</p>
                        </div>
                    </FadeIn>
                </motion.div>

                {/* Right Column: Empty space for 3D Cube */}
                <div className="hidden md:block"></div>
            </div>
        </section>
    )
}
