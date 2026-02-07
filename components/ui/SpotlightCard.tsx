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

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#15213d]/50 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl ${className}`}
        >
            {/* Spotlight Glow Background */}
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
                        ([x, y]) => `radial-gradient(150px circle at ${x}px ${y}px, rgba(255,255,255,0.2), transparent 80%)`
                    ),
                    maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                    maskClip: "content-box, border-box",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "source-out",
                    padding: "1px" // The "width" of the spotlight border
                }}
            />

            <div className="relative z-20">
                {children}
            </div>
        </div>
    )
}
