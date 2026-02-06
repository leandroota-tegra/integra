import { FadeIn, FadeInStagger } from "@/components/features/motion/FadeIn";

export function SocialProof() {
    return (
        <section className="py-12 md:py-24 border-t border-white/10 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <FadeInStagger>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                        {/* Label Column (25%) */}
                        <div className="col-span-1">
                            <FadeIn>
                                <div className="flex flex-col gap-4">
                                    <span className="text-xs font-medium tracking-widest text-cta uppercase">
                                        Por que confiar?
                                    </span>
                                    <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                                        Projetado para operações que buscam eficiência real.
                                    </h2>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Content Column (75%) */}
                        <div className="col-span-1 md:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Item 1 */}
                                <FadeIn>
                                    <div className="flex flex-col gap-4 group">
                                        <div className="w-full h-px bg-white/10 group-hover:bg-cta/50 transition-colors duration-500" />
                                        <h3 className="text-lg font-semibold text-white">Foco em PMEs</h3>
                                        <p className="text-white/60 leading-relaxed text-sm">
                                            Feito para quem não tem tempo (nem orçamento) para ERPs gigantes. Comece pequeno e expanda.
                                        </p>
                                    </div>
                                </FadeIn>

                                {/* Item 2 */}
                                <FadeIn>
                                    <div className="flex flex-col gap-4 group">
                                        <div className="w-full h-px bg-white/10 group-hover:bg-cta/50 transition-colors duration-500" />
                                        <h3 className="text-lg font-semibold text-white">Suporte Próximo</h3>
                                        <p className="text-white/60 leading-relaxed text-sm">
                                            Você fala direto com quem constrói o produto. Sem tickets infinitos ou robôs genéricos.
                                        </p>
                                    </div>
                                </FadeIn>

                                {/* Item 3 */}
                                <FadeIn>
                                    <div className="flex flex-col gap-4 group">
                                        <div className="w-full h-px bg-white/10 group-hover:bg-cta/50 transition-colors duration-500" />
                                        <h3 className="text-lg font-semibold text-white">Evolução Contínua</h3>
                                        <p className="text-white/60 leading-relaxed text-sm">
                                            Módulos novos a cada trimestre, baseados no seu feedback e na necessidade da sua operação.
                                        </p>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </FadeInStagger>
            </div>
        </section>
    );
}
