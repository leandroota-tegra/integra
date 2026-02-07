"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/features/motion/FadeIn"
import { Plus, Minus } from "lucide-react"
import { EcossistemaBackground } from "@/components/features/EcossistemaBackground"

const faqs = [
    {
        question: "Quanto tempo demora para implantar?",
        answer: "Nossa média é de 7 a 14 dias úteis. Como a Integra Suite conecta sistemas que você já usa, não precisamos migrar banco de dados nem treinar sua equipe do zero."
    },
    {
        question: "Preciso trocar meu ERP ou CRM atual?",
        answer: "Não! A Integra Suite funciona como uma camada de inteligência acima dos seus sistemas atuais (Omie, ContaAzul, Pipedrive, etc). Nós organizamos o caos sem quebrar o que já funciona."
    },
    {
        question: "Existe fidelidade ou multa de cancelamento?",
        answer: "Zero. Acreditamos na nossa entrega de valor constante. Você tem total liberdade para cancelar sua assinatura a qualquer momento, sem letras miúdas."
    },
    {
        question: "Meus dados financeiros estão seguros?",
        answer: "Segurança bancária. Utilizamos criptografia de ponta a ponta (AES-256) e servidores AWS com backups diários automáticos. Seus dados são seus e de mais ninguém."
    }
]

function AccordionItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={onClick}
                className="flex items-center justify-between w-full py-6 text-left focus:outline-none group"
            >
                <span className={`text-lg font-bold transition-colors ${isOpen ? "text-orange-400" : "text-white group-hover:text-blue-100"}`}>
                    {question}
                </span>
                <div className={`p-2 rounded-full transition-colors ${isOpen ? "bg-orange-500/20 text-orange-400" : "bg-white/5 text-white/50 group-hover:bg-white/10"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-blue-100/70 font-medium leading-relaxed pr-8">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section id="faq" className="py-24 bg-[#111C33] relative overflow-hidden">
            <EcossistemaBackground />

            <div className="container px-4 md:px-6 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left: Headline */}
                    <FadeIn>
                        <div className="sticky top-24">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                Dúvidas frequentes <br />
                                <span className="text-orange-400">sobre a Integra.</span>
                            </h2>
                            <p className="text-lg text-blue-100/70 font-medium leading-relaxed mb-8">
                                Tudo o que você precisa saber antes de dar o próximo passo para organizar sua operação.
                            </p>

                            {/* Secondary CTA */}
                            <div className="hidden lg:block">
                                <a href="mailto:contato@integrasuite.com.br" className="text-white font-bold underline decoration-orange-500/30 hover:decoration-orange-500 transition-all hover:text-blue-100">
                                    Ainda tenho outra dúvida &rarr;
                                </a>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Right: Accordion */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
                        {faqs.map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <AccordionItem
                                    question={item.question}
                                    answer={item.answer}
                                    isOpen={openIndex === i}
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                />
                            </FadeIn>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    )
}
