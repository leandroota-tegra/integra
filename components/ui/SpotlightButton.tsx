"use client"

import React, { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { VariantProps } from "class-variance-authority"
import Link from "next/link"
import { useMousePosition } from "@/components/context/MousePositionContext"

interface SpotlightButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    href?: string
    spotlightColor?: string
    spotlightSize?: number
    borderColor?: string
}

// ... imports same ...

// ... imports same ...

const MotionLink = motion(Link)
const MotionButton = motion.button

// Forward ref to support Next.js Link behavior and animations
export const SpotlightButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, SpotlightButtonProps>(
    ({ children, className, variant, size, href, spotlightColor = "rgba(255, 255, 255, 0.25)", spotlightSize = 250, borderColor = "white", ...props }, ref) => {
        const MotionComponent = (href ? MotionLink : MotionButton) as React.ElementType
        const localRef = useRef<HTMLElement>(null)
        const { x: mouseX, y: mouseY } = useMousePosition()

        // Merge refs (local for bounds, external for props)
        const contentRef = (node: HTMLElement | null) => {
            localRef.current = node
            if (typeof ref === "function") {
                ref(node as HTMLButtonElement | HTMLAnchorElement)
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLElement | null>).current = node
            }
        }

        // Position of the relative "closest point" on the border
        const borderX = useSpring(0, { stiffness: 100, damping: 30 })
        const borderY = useSpring(0, { stiffness: 100, damping: 30 })
        const borderOpacity = useSpring(0, { stiffness: 100, damping: 30 })

        // Internal spotlight still follows mouse exactly if hovered
        const localMouseX = useMotionValue(0)
        const localMouseY = useMotionValue(0)
        const isHovered = useMotionValue(0)

        // Cached offset to avoid layout thrashing
        const offset = useRef({ left: 0, top: 0, width: 0, height: 0 })

        useEffect(() => {
            const updateOffset = () => {
                if (localRef.current) {
                    const rect = localRef.current.getBoundingClientRect()
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
                // For layout thrashing optimization, we read values from motion value, not DOM

                // Clamp coordinates to boundaries
                const clampedX = Math.max(0, Math.min(localX, offset.current.width))
                borderX.set(clampedX)

                localMouseX.set(localX)

                // Distance-based intensity falloff
                const dx = currentX - (offset.current.left + offset.current.width / 2)
                const dy = mouseY.get() - (offset.current.top + offset.current.height / 2)
                const dist = Math.sqrt(dx * dx + dy * dy)
                const maxDist = Math.max(window.innerWidth, window.innerHeight) / 1.5

                // Keep highlights visible but make them "glance" as the mouse moves away
                const intensity = Math.max(0.15, 0.8 - dist / maxDist)
                borderOpacity.set(intensity)
            })

            const unsubscribeY = mouseY.on("change", (currentY) => {
                if (!offset.current.height) return
                const localY = currentY - offset.current.top
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
            [borderX, borderY],
            ([x, y]: number[]) =>
                `radial-gradient(150px circle at ${x}px ${y}px, ${borderColor}, transparent 100%)`
        )

        return (
            <MotionComponent
                ref={contentRef}
                href={href || undefined}
                onMouseEnter={() => isHovered.set(1)}
                onMouseLeave={() => isHovered.set(0)}
                className={cn(
                    buttonVariants({ variant, size }), // Base variants
                    "relative overflow-hidden group transition-all duration-300",
                    className // User overrides (bg-cta, etc.) apply LAST
                )}
                {...props}
            >
                {/* 1. Internal Spotlight Glow (Follows cursor inside) */}
                <motion.div
                    className="pointer-events-none absolute -inset-px transition duration-500 opacity-0 group-hover:opacity-100 rounded-[inherit]"
                    style={{
                        background: useTransform(
                            [localMouseX, localMouseY],
                            ([x, y]) => `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`
                        ),
                    }}
                />

                {/* 2. Closest Point Border Highlight */}
                <motion.div
                    className="pointer-events-none absolute -inset-px z-30 rounded-[inherit]"
                    style={{
                        background: borderGradient,
                        opacity: borderOpacity,
                        WebkitMaskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                        WebkitMaskClip: "content-box, border-box",
                        WebkitMaskComposite: "source-out",
                        maskComposite: "exclude",
                        padding: "2px", // Thicker border like Cards
                    }}
                />

                <span className="relative z-20 flex items-center justify-center gap-2">
                    {children}
                </span>
            </MotionComponent>
        )
    }
)
SpotlightButton.displayName = "SpotlightButton"
