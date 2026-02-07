"use client"

import Link from "next/link"
import { FadeIn } from "@/components/features/motion/FadeIn" // Optional animation
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react"
import { EcossistemaBackground } from "@/components/features/EcossistemaBackground"

export function Footer() {
    return (
        <footer className="relative bg-[#111C33] text-white py-16 border-t border-white/10 overflow-hidden">
            <EcossistemaBackground />
            <div className="container relative z-10 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
                            Integra Suite.
                        </h3>
                        <p className="text-blue-100/70 text-sm leading-relaxed mb-6">
                            O sistema operacional completo para empresas de serviços que querem crescer com ordem.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-orange-500 hover:text-white transition-all text-blue-200/60">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-orange-500 hover:text-white transition-all text-blue-200/60">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold mb-6 text-orange-400">Sobre</h4>
                        <ul className="space-y-4 text-sm text-blue-100/70">
                            <li><Link href="/" className="hover:text-white transition-colors">A Integra</Link></li>
                            <li><Link href="#features" className="hover:text-white transition-colors">Funcionalidades</Link></li>
                            <li><Link href="#testimonials" className="hover:text-white transition-colors">Depoimentos</Link></li>
                            <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-orange-400">Produto</h4>
                        <ul className="space-y-4 text-sm text-blue-100/70">
                            <li><Link href="/modules/hub" className="hover:text-white transition-colors">Integra Hub</Link></li>
                            <li><Link href="/modules/vendas" className="hover:text-white transition-colors">Integra Vendas</Link></li>
                            <li><Link href="/modules/fin" className="hover:text-white transition-colors">Integra Fin</Link></li>
                            <li><Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-orange-400">Legal</h4>
                        <ul className="space-y-4 text-sm text-blue-100/70">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacidade</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                            <li><Link href="/security" className="hover:text-white transition-colors">Segurança</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contato</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-neutral-500">
                        &copy; {new Date().getFullYear()} Integra Suite Tecnologia Ltda. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <span>Feito com <span className="text-orange-500">⚡️</span> no Brasil.</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
