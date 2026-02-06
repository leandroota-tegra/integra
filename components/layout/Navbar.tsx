"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "A Integra", href: "#solucao" },
        { name: "Módulos", href: "#modulos" },
        { name: "Benefícios", href: "#beneficios" },
        { name: "Depoimentos", href: "#depoimentos" },
        { name: "FAQ", href: "#faq" },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-brand/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-brand/20 backdrop-blur-sm border-b border-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative w-32 h-8 md:w-40 md:h-10">
                        <Image
                            src="/assets/logos/logo-light.svg"
                            alt="Integra Suite"
                            fill
                            className="object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm font-medium text-white hover:text-white/80 transition-colors">
                                Entrar
                            </Link>
                            <Button className="rounded-full bg-cta hover:bg-cta-hover text-white font-medium px-6 h-9 text-sm shadow-lg shadow-cta/20 border-0">
                                Começar Grátis
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-brand/95 backdrop-blur-xl md:hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                            <Link href="/" onClick={() => setIsOpen(false)} className="relative w-32 h-8">
                                <Image
                                    src="/assets/logos/logo-light.svg"
                                    alt="Integra Suite"
                                    fill
                                    className="object-contain"
                                />
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col p-6 gap-8 h-full">
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-medium text-white hover:text-cta transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto flex flex-col gap-4">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-3 text-white border border-white/20 rounded-full font-medium"
                                >
                                    Entrar
                                </Link>
                                <Button className="w-full rounded-full bg-cta hover:bg-cta-hover text-white font-bold text-lg h-14 shadow-lg shadow-cta/20 border-0">
                                    Começar Grátis
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
