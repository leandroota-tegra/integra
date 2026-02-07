"use client"

import React, { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface SpotlightCardProps {
    children: React.ReactNode
    className?: string
    spotlightColor?: string
    size?: number
}

export function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(255, 107, 0, 0.15)", // Default to brand orange
    size = 600
}: SpotlightCardProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Position of the relative "closest point" on the border
    const borderX = useSpring(0, { stiffness: 100, damping: 30 })
    const borderY = useSpring(0, { stiffness: 100, damping: 30 })
    const borderOpacity = useSpring(0.3, { stiffness: 100, damping: 30 })

    // Internal spotlight still follows mouse exactly if hovered
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const isHovered = useMotionValue(0)

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()

            // 1. Calculate local coordinates relative to card top-left
            const localX = e.clientX - rect.left
            const localY = e.clientY - rect.top

            // 2. Clamp coordinates to card boundaries to find the "Closest Point" on the edge
            // This is the mathematical "projection" logic for a premium directed beam
            const clampedX = Math.max(0, Math.min(localX, rect.width))
            const clampedY = Math.max(0, Math.min(localY, rect.height))

            borderX.set(clampedX)
            borderY.set(clampedY)

            // 3. Distance-based intensity falloff
            const dx = e.clientX - (rect.left + rect.width / 2)
            const dy = e.clientY - (rect.top + rect.height / 2)
            const dist = Math.sqrt(dx * dx + dy * dy)
            const maxDist = Math.max(window.innerWidth, window.innerHeight) / 1.5

            // Keep highlights visible but make them "glance" as the mouse moves away
            const intensity = Math.max(0.1, 0.6 - dist / maxDist)
            borderOpacity.set(intensity)

            // Local coordinates for the inner glow
            mouseX.set(localX)
            mouseY.set(localY)
        }

        window.addEventListener("mousemove", handleGlobalMouseMove)
        return () => window.removeEventListener("mousemove", handleGlobalMouseMove)
    }, [borderX, borderY, borderOpacity, mouseX, mouseY])

    const borderGradient = useTransform(
        [borderX, borderY, borderOpacity],
        ([x, y, opacity]: any) =>
            `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,${opacity}), transparent 80%)`
    )

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => isHovered.set(1)}
            onMouseLeave={() => isHovered.set(0)}
            className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-[#15213d]/50 backdrop-blur-xl transition-all duration-300 hover:border-white/10 hover:shadow-2xl ${className}`}
        >
            {/* 1. Internal Spotlight Glow (Follows cursor inside) */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl transition duration-500"
                style={{
                    opacity: useTransform(isHovered, [0, 1], [0.2, 0.8]),
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(${size}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`
                    ),
                }}
            />

            {/* 2. REFINED: Closest Point Border Highlight (The "Premium" Directed Beam) */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl z-30"
                style={{
                    background: borderGradient,
                    WebkitMaskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                    WebkitMaskClip: "content-box, border-box",
                    WebkitMaskComposite: "source-out",
                    maskComposite: "exclude",
                    padding: "2px" // Slightly thicker for better "glint"
                }}
            />

            <div className="relative z-20">
                {children}
            </div>
        </div>
    )
}
