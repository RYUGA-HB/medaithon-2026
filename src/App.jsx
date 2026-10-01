import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import AboutSection from './sections/AboutSection'
import TracksSection from './sections/TracksSection'
import ProblemStatementsSection from './sections/ProblemStatementsSection'
import TemplateSection from './sections/TemplateSection'
import { useGSAP } from '@gsap/react'
import PrizesSection from './sections/PrizesSection'
import JudgesSection from './sections/JudgesSection'
import SponsorsSection from './sections/SponsorsSection'
import FAQSection from './sections/FAQSection'
import FooterSection from './sections/FooterSection'
import NotificationBanner from './components/NotificationBanner'
import RegistrationModal from './components/RegistrationModal'
import Preloader from './components/Preloader'
import MoltenMetal from './components/MoltenMetal'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [prefilledProblem, setPrefilledProblem] = useState(null)
  const [showBanner, setShowBanner] = useState(true)

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1.2,
      effects: true,
    })
    
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)
    return () => clearTimeout(timer)
  })

  const handlePreloaderComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }

  const handleRegisterWithProblem = (problem) => {
    if (problem) {
      setPrefilledProblem(problem)
    }
    setIsRegistrationOpen(true)
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden font-['Inter']">
      {/* Background 3D Molten Metal Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
        <MoltenMetal
          color1="#000000"
          color2="#666666"
          color3="#ffffff"
          speed={0.3}
          scale={3.5}
          detail={4}
          glow={1.8}
          coreSize={0.08}
          swirl={1.2}
          fold={-0.25}
          blackPoint={0.05}
          brightness={1.25}
          colorMode="molten"
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseStrength={0.3}
          opacity={0.8}
        />
      </div>

      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <NotificationBanner visible={showBanner} onClose={() => setShowBanner(false)} />
      <Navbar hasBanner={showBanner} onRegisterClick={() => setIsRegistrationOpen(true)} />
      
      <div id="smooth-wrapper" className="relative z-10">
        <div id="smooth-content">
          <HeroSection onRegisterClick={() => setIsRegistrationOpen(true)} />
          <AboutSection />
          <TracksSection />
          <ProblemStatementsSection onRegisterClick={handleRegisterWithProblem} />
          <TemplateSection />
          <div>
            <PrizesSection />
            <JudgesSection />
          </div>
          <SponsorsSection />
          <FAQSection />
          <FooterSection onRegisterClick={() => setIsRegistrationOpen(true)} />
        </div>
      </div>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        prefilledProblem={prefilledProblem}
      />
    </main>
  )
}

export default App
