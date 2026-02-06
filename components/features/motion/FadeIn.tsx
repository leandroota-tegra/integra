"use client"

import { motion } from "framer-motion"

const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: delay,
            ease: "easeOut"
        }
    })
}

export function FadeIn({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
    return (
        <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={delay}
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
