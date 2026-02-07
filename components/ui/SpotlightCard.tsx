"use client"

import React, { MouseEvent } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

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
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Relative position from center (-0.5 to 0.5)
    const relX = useMotionValue(0)
    const relY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const x = clientX - left
        const y = clientY - top
        mouseX.set(x)
        mouseY.set(y)
        relX.set((x / width) - 0.5)
        relY.set((y / height) - 0.5)
    }

    // Mapping for top-left (TL) and bottom-right (BR) highlights
    // Inversion logic: As mouse moves to TL corner, TL highlight gets brighter, BR dimmer.
    const tlOpacity = useTransform([relX, relY], ([rx, ry]: any) => {
        // Distance-based intensity for Top-Left corner (-0.5, -0.5)
        const intensity = Math.max(0, (-rx - ry + 0.5) / 1.5)
        return intensity * 0.6 // Opacity multiplier
    })

    const brOpacity = useTransform([relX, relY], ([rx, ry]: any) => {
        // Distance-based intensity for Bottom-Right corner (0.5, 0.5)
        const intensity = Math.max(0, (rx + ry + 0.5) / 1.5)
        return intensity * 0.6 // Opacity multiplier
    })

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                relX.set(0)
                relY.set(0)
            }}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#15213d]/50 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl ${className}`}
        >
            {/* Primary Spotlight Glow (Cursor following) */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(${size}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`
                    ),
                }}
            />

            {/* Sharp Border Spotlight (Apple Style Highlight) */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(150px circle at ${x}px ${y}px, rgba(255,255,255,0.25), transparent 80%)`
                    ),
                    maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                    maskClip: "content-box, border-box",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "source-out",
                    padding: "1px"
                }}
            />

            {/* Corner Highlight: Top-Left (Orange Glow) */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl z-10"
                style={{
                    opacity: tlOpacity,
                    background: `linear-gradient(135deg, rgba(255,107,0,0.3) 0%, transparent 40%)`,
                    maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                    maskClip: "content-box, border-box",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "source-out",
                    padding: "1.5px"
                }}
            />

            {/* Corner Highlight: Bottom-Right (White/Blue Glow) */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl z-10"
                style={{
                    opacity: brOpacity,
                    background: `linear-gradient(315deg, rgba(255,255,255,0.2) 0%, transparent 40%)`,
                    maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                    maskClip: "content-box, border-box",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "source-out",
                    padding: "1.5px"
                }}
            />

            <div className="relative z-20">
                {children}
            </div>
        </div>
    )
}
