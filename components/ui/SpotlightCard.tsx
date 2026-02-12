"use client"

import React, { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useMousePosition } from "@/components/context/MousePositionContext"

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
    const { x: mouseX, y: mouseY } = useMousePosition()

    // Position of the relative "closest point" on the border
    const borderX = useSpring(0, { stiffness: 100, damping: 30 })
    const borderY = useSpring(0, { stiffness: 100, damping: 30 })
    const borderOpacity = useSpring(0.3, { stiffness: 100, damping: 30 })

    // Internal spotlight still follows mouse exactly if hovered
    const localMouseX = useMotionValue(0)
    const localMouseY = useMotionValue(0)
    const isHovered = useMotionValue(0)

    // Cached offset to avoid layout thrashing
    const offset = useRef({ left: 0, top: 0, width: 0, height: 0 })

    useEffect(() => {
        const updateOffset = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const scrollX = window.scrollX
                const scrollY = window.scrollY
                offset.current = {
                    left: rect.left + scrollX,
                    top: rect.top + scrollY,
                    width: rect.width,
                    height: rect.height
                }
            }
        }

        updateOffset()

        // Re-calculate on resize
        window.addEventListener("resize", updateOffset)
        return () => window.removeEventListener("resize", updateOffset)
    }, [])

    useEffect(() => {
        // Subscribe to global mouse changes
        const unsubscribeX = mouseX.on("change", (currentX) => {
            if (!offset.current.width) return

            const localX = currentX - offset.current.left


            // Clamp coordinates for border
            const clampedX = Math.max(0, Math.min(localX, offset.current.width))
            borderX.set(clampedX)

            // Inner glow
            localMouseX.set(localX)

            // Opacity calculation
            const dx = currentX - (offset.current.left + offset.current.width / 2)
            const dy = mouseY.get() - (offset.current.top + offset.current.height / 2)
            const dist = Math.sqrt(dx * dx + dy * dy)
            const maxDist = Math.max(window.innerWidth, window.innerHeight) / 1.5
            const intensity = Math.max(0.1, 0.6 - dist / maxDist)
            borderOpacity.set(intensity)
        })

        const unsubscribeY = mouseY.on("change", (currentY) => {
            if (!offset.current.height) return

            const localY = currentY - offset.current.top
            // We can duplicate logic or just rely on X update if they happen together? 
            // Mouse events usually update both. But to be safe:
            const clampedY = Math.max(0, Math.min(localY, offset.current.height))
            borderY.set(clampedY)
            localMouseY.set(localY)
        })

        return () => {
            unsubscribeX()
            unsubscribeY()
        }
    }, [mouseX, mouseY, borderX, borderY, borderOpacity, localMouseX, localMouseY])

    const borderGradient = useTransform(
        [borderX, borderY, borderOpacity],
        ([x, y, opacity]: number[]) =>
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
                        [localMouseX, localMouseY],
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
