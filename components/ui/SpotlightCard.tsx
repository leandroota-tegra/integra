"use client"

import React, { useRef, useState, useEffect } from "react"
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

    // Local mouse (for internal spotlight override if needed)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const isHovered = useMotionValue(0)

    // Global angle and intensity for the light source
    const lightAngle = useSpring(135, { stiffness: 60, damping: 20 })
    const lightIntensity = useSpring(0.3, { stiffness: 60, damping: 20 })

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            // Calculate angle from card center to mouse
            const dx = e.clientX - centerX
            const dy = e.clientY - centerY

            // Convert to degrees for CSS linear-gradient
            // Math.atan2 returns radians from -PI to PI
            let angle = (Math.atan2(dy, dx) * 180) / Math.PI
            // Adjust to CSS gradient angle (where 0deg is top, 90deg is right)
            angle = (angle + 90) % 360

            lightAngle.set(angle)

            // Calculate distance for intensity (closer mouse = stronger edge highlight)
            const dist = Math.sqrt(dx * dx + dy * dy)
            const maxDist = Math.max(window.innerWidth, window.innerHeight)
            const intensity = Math.max(0.2, 1 - dist / maxDist)
            lightIntensity.set(intensity)

            // Local coordinates for internal spotlight
            mouseX.set(e.clientX - rect.left)
            mouseY.set(e.clientY - rect.top)
        }

        window.addEventListener("mousemove", handleGlobalMouseMove)
        return () => window.removeEventListener("mousemove", handleGlobalMouseMove)
    }, [lightAngle, lightIntensity, mouseX, mouseY])

    const gradientBackground = useTransform(
        [lightAngle, lightIntensity],
        ([angle, intensity]: any) =>
            `linear-gradient(${angle}deg, rgba(255,255,255,${0.4 * intensity}) 0%, transparent 60%)`
    )

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => isHovered.set(1)}
            onMouseLeave={() => isHovered.set(0)}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#15213d]/50 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl ${className}`}
        >
            {/* 1. Internal Spotlight Glow (Follows cursor, intensifies on hover) */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl transition duration-500"
                style={{
                    opacity: useTransform(isHovered, [0, 1], [0.3, 1]), // Always slightly visibile, stronger on hover
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(${size}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`
                    ),
                }}
            />

            {/* 2. Global Directional Border Highlight (Always apparent, reacts to global mouse) */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl z-30"
                style={{
                    background: gradientBackground,
                    WebkitMaskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                    WebkitMaskClip: "content-box, border-box",
                    WebkitMaskComposite: "source-out",
                    maskComposite: "exclude",
                    padding: "1.5px"
                }}
            />

            <div className="relative z-20">
                {children}
            </div>
        </div>
    )
}
