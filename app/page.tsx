import { Hero } from "@/components/features/Hero"
import { SocialProof } from "@/components/features/SocialProof"
import { ProblemSolution } from "@/components/features/ProblemSolution"
import { ModulesBento } from "@/components/features/ModulesBento"
import { BenefitsSection } from "@/components/features/BenefitsSection"
import { TestimonialsSection } from "@/components/features/TestimonialsSection"
import { FAQSection } from "@/components/features/FAQSection"
import { FinalCTA } from "@/components/features/FinalCTA"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="bg-brand">
      <Hero />
      <SocialProof />
      <ProblemSolution />
      <ModulesBento />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
