"use client"

import React, { MouseEvent, useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

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
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth relative motion for corner highlights
    const relX = useSpring(0, { stiffness: 100, damping: 20 })
    const relY = useSpring(0, { stiffness: 100, damping: 20 })

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const x = clientX - left
        const y = clientY - top

        mouseX.set(x)
        mouseY.set(y)

        if (width > 0 && height > 0) {
            relX.set((x / width) - 0.5)
            relY.set((y / height) - 0.5)
        }
    }

    // Mathematical Mapping for Corner Highlights
    // TL (Top-Left): Brightest when rx < 0 and ry < 0
    const tlOpacity = useTransform([relX, relY], ([rx, ry]: any) => {
        const intensity = Math.max(0, -rx - ry) // Simple diagonal gradient
        return intensity * 1.0 // Increased for visibility
    })

    // BR (Bottom-Right): Brightest when rx > 0 and ry > 0
    const brOpacity = useTransform([relX, relY], ([rx, ry]: any) => {
        const intensity = Math.max(0, rx + ry) // Simple diagonal gradient
        return intensity * 1.0 // Increased for visibility
    })

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                relX.set(0)
                relY.set(0)
            }}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#15213d]/50 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl ${className}`}
        >
            {/* 1. Base Glow (Background) */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(${size}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`
                    ),
                }}
            />

            {/* 2. Interactive Border Highlight (Mouse follow) */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(150px circle at ${x}px ${y}px, rgba(255,255,255,0.4), transparent 80%)`
                    ),
                    WebkitMaskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                    WebkitMaskClip: "content-box, border-box",
                    WebkitMaskComposite: "source-out",
                    maskComposite: "exclude",
                    padding: "1px"
                }}
            />

            {/* 3. Corner Highlight: Top-Left (Orange) - Placed ON TOP (z-30) */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl z-30"
                style={{
                    opacity: tlOpacity,
                    background: `linear-gradient(135deg, rgba(255,107,0,0.6) 0%, transparent 40%)`,
                    WebkitMaskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                    WebkitMaskClip: "content-box, border-box",
                    WebkitMaskComposite: "source-out",
                    maskComposite: "exclude",
                    padding: "1.5px"
                }}
            />

            {/* 4. Corner Highlight: Bottom-Right (White) - Placed ON TOP (z-30) */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl z-30"
                style={{
                    opacity: brOpacity,
                    background: `linear-gradient(315deg, rgba(255,255,255,0.5) 0%, transparent 40%)`,
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
