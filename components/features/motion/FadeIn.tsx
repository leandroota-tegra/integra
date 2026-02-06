"use client"

import { motion } from "framer-motion"

const fadeInVariants = {
    hidden: ({ direction }: { direction: string }) => ({
        opacity: 0,
        y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
        x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
    }),
    visible: ({ delay }: { delay: number }) => ({
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            duration: 0.5,
            delay: delay,
            ease: "easeOut"
        }
    })
}

export function FadeIn({
    children,
    delay = 0,
    direction = "up",
    className
}: {
    children: React.ReactNode,
    delay?: number,
    direction?: "up" | "down" | "left" | "right",
    className?: string
}) {
    return (
        <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={{ delay, direction }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function FadeInStagger({ children, className, faster = false }: { children: React.ReactNode, className?: string, faster?: boolean }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
