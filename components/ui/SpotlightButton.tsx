"use client"

import React, { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

interface SpotlightButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    spotlightColor?: string
    spotlightSize?: number
}

export function SpotlightButton({
    children,
    className,
    variant,
    size,
    asChild = false,
    spotlightColor = "rgba(255, 255, 255, 0.25)",
    spotlightSize = 100,
    ...props
}: SpotlightButtonProps) {
    const containerRef = useRef<HTMLElement>(null)

    // Position of the relative "closest point" on the border
    const borderX = useSpring(0, { stiffness: 100, damping: 30 })
    const borderY = useSpring(0, { stiffness: 100, damping: 30 })
    const borderOpacity = useSpring(0, { stiffness: 100, damping: 30 })

    // Internal spotlight still follows mouse exactly if hovered
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const isHovered = useMotionValue(0)

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()

            // 1. Calculate local coordinates
            const localX = e.clientX - rect.left
            const localY = e.clientY - rect.top

            // 2. Clamp coordinates to boundaries
            const clampedX = Math.max(0, Math.min(localX, rect.width))
            const clampedY = Math.max(0, Math.min(localY, rect.height))

            borderX.set(clampedX)
            borderY.set(clampedY)

            // 3. Distance-based intensity falloff
            const dx = e.clientX - (rect.left + rect.width / 2)
            const dy = e.clientY - (rect.top + rect.height / 2)
            const dist = Math.sqrt(dx * dx + dy * dy)
            const maxDist = Math.max(window.innerWidth, window.innerHeight) / 3 // Localized effect

            // Keep highlights visible but make them "glance" as the mouse moves away
            const intensity = Math.max(0, 0.5 - dist / maxDist)
            borderOpacity.set(intensity)

            mouseX.set(localX)
            mouseY.set(localY)
        }

        window.addEventListener("mousemove", handleGlobalMouseMove)
        return () => window.removeEventListener("mousemove", handleGlobalMouseMove)
    }, [borderX, borderY, borderOpacity, mouseX, mouseY])

    const borderGradient = useTransform(
        [borderX, borderY, borderOpacity],
        ([x, y, opacity]: any) =>
            `radial-gradient(150px circle at ${x}px ${y}px, rgba(255,255,255,${opacity}), transparent 100%)`
    )

    const Comp = asChild ? Slot : "button"
    const MotionComp = motion(Comp as any)

    return (
        <MotionComp
            ref={containerRef}
            onMouseEnter={() => isHovered.set(1)}
            onMouseLeave={() => isHovered.set(0)}
            className={cn(
                buttonVariants({ variant, size, className }),
                "relative overflow-hidden group bg-opacity-90 transition-all duration-300"
            )}
            {...(props as any)}
        >
            {/* 1. Internal Spotlight Glow (Follows cursor inside) */}
            <motion.div
                className="pointer-events-none absolute -inset-px transition duration-500 opacity-0 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`
                    ),
                }}
            />

            {/* 2. Closest Point Border Highlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px z-10"
                style={{
                    background: borderGradient,
                    WebkitMaskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                    WebkitMaskClip: "content-box, border-box",
                    WebkitMaskComposite: "source-out",
                    maskComposite: "exclude",
                    padding: "1.5px", // Thin precise border
                }}
            />

            <span className="relative z-20 flex items-center justify-center gap-2">
                {children}
            </span>
        </MotionComp>
    )
}
