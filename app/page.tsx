import { Hero } from "@/components/features/Hero"
import { SocialProof } from "@/components/features/SocialProof"
import { ProblemSolution } from "@/components/features/ProblemSolution"
import dynamic from 'next/dynamic'

// Lazy load below-the-fold components
const ModulesBento = dynamic(() => import("@/components/features/ModulesBento").then(mod => mod.ModulesBento))
const BenefitsSection = dynamic(() => import("@/components/features/BenefitsSection").then(mod => mod.BenefitsSection))
const TestimonialsSection = dynamic(() => import("@/components/features/TestimonialsSection").then(mod => mod.TestimonialsSection))
const FAQSection = dynamic(() => import("@/components/features/FAQSection").then(mod => mod.FAQSection))
const FinalCTA = dynamic(() => import("@/components/features/FinalCTA").then(mod => mod.FinalCTA))
const Footer = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer))

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
