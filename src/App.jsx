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
    <main>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <NotificationBanner visible={showBanner} onClose={() => setShowBanner(false)} />
      <Navbar hasBanner={showBanner} onRegisterClick={() => setIsRegistrationOpen(true)} />
      <div id="smooth-wrapper">
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
