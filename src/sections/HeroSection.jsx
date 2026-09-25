import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import ParticleField from '../components/ParticleField'
import CountdownTimer from '../components/CountdownTimer'

gsap.registerPlugin(SplitText, ScrollTrigger)
const HeroSection = ({ onRegisterClick }) => {
  const buttonRef = useRef()
  const outlineButtonRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Hero content base reveal
    tl.to('.hero-content', {
      opacity: 1,
      y: 0,
      ease: 'expo.out',
      duration: 0.8,
    })

      // Header Japanese Badge
      .from(
        '.hero-badge',
        {
          scale: 0.85,
          opacity: 0,
          y: -15,
          ease: 'back.out(1.7)',
          duration: 0.6,
        },
        '-=0.4'
      )

      // Logo fade and scale in
      .from(
        '.hero-main-logo',
        {
          scale: 0.9,
          opacity: 0,
          y: 20,
          ease: 'expo.out',
          duration: 0.9,
        },
        '-=0.4'
      )

      // Hero description & pills
      .from(
        '.hero-description',
        { opacity: 0, y: 15, duration: 0.6, ease: 'expo.out' },
        '-=0.4'
      )
      .from(
        '.hero-pill-badge',
        {
          opacity: 0,
          y: 12,
          scale: 0.9,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.5)',
        },
        '-=0.3'
      )
      .from(
        '.hero-button',
        { opacity: 0, scale: 0.85, duration: 0.5, ease: 'back.out(2)', stagger: 0.1 },
        '-=0.3'
      )

    // Scroll-driven tilt + scale out (Desktop only to prevent mobile overflow)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    if (!isMobile) {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-container',
          start: '1% top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })

      heroTl.to('.hero-container', {
        rotate: 7,
        scale: 0.88,
        yPercent: 32,
        ease: 'none',
      })
    }

    // Floating dragon image
    gsap.to('.hero-dragon-img', {
      y: -18,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // CTA button continual glow pulse
    gsap.to(buttonRef.current, {
      boxShadow: '0 0 40px 10px rgba(220, 38, 38, 0.4)',
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5,
    })
  })

  const handleLearnMore = (e) => {
    e.preventDefault()
    const target = document.getElementById('about')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = '#about'
    }
  }

  return (
    <section className="bg-[#0a0a0f] text-[#f0e6d3] relative overflow-hidden min-h-screen md:h-screen w-full flex items-center justify-center pt-28 pb-12 sm:py-24 md:pt-16 md:pb-0">

      {/* Background ParticleField */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(10,10,15,0.2) 0%, rgba(10,10,15,0.92) 75%)' }}></div>

      <div className="hero-container relative z-10 w-full flex flex-col items-center justify-center pt-6 sm:pt-8 md:pt-16 h-full max-w-6xl mx-auto px-4 sm:px-6">

        {/* Dragon Graphic */}
        <img
          src='/images/dragon.png'
          alt='dragon spirit'
          className='hero-dragon-img absolute bottom-0 md:bottom-16 right-0 md:right-10 w-36 sm:w-60 md:w-[450px] object-contain z-0 opacity-10 sm:opacity-20 md:opacity-80 pointer-events-none filter drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]'
          onError={(e) => e.target.style.display = 'none'}
        />

        <div className="hero-content opacity-0 relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto" style={{ transform: 'translateY(20px)' }}>
          
          {/* Glowing Crimson Sun Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] md:w-[540px] md:h-[540px] bg-gradient-to-tr from-[#dc2626] to-[#991b1b] rounded-full blur-[80px] sm:blur-[120px] md:blur-[160px] opacity-30 pointer-events-none animate-pulse"></div>

          {/* Top Japanese Style Badge (Mobile Only) */}
          <div className="hero-badge md:hidden mb-2.5 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-red-950/70 via-red-900/50 to-red-950/70 border border-red-500/30 backdrop-blur-md text-red-300 text-[9px] sm:text-xs font-mono font-semibold tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 shadow-[0_0_20px_rgba(220,38,38,0.25)] max-w-[90vw]">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-ping shrink-0"></span>
            <span className="truncate">医療AIハッカソン • 50-HOUR WARRIOR SPRINT</span>
          </div>
          
          {/* Main Logo Image */}
          <div className="hero-main-logo w-full max-w-[240px] sm:max-w-md md:max-w-2xl mb-2 sm:mb-4 md:mb-5 px-2 relative z-10">
            <img src="/medaithon-logo.png" alt="Medaithon" className="w-full h-auto object-contain drop-shadow-[0_10px_35px_rgba(220,38,38,0.3)] mx-auto" />
          </div>

          {/* Tagline / Sub-description */}
          <h2 className="hero-description max-w-xl text-[11px] sm:text-sm md:text-base text-[#c5beb3] mb-3 sm:mb-5 leading-relaxed font-inter px-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            Where code meets the way of the dragon. 50 hours of relentless innovation forging the future of medicine.
          </h2>

          {/* Interactive Feature Pills (2x2 Grid on Mobile, Flex on Desktop) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-7 max-w-lg sm:max-w-2xl px-2 w-full">
            <div className="hero-pill-badge px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-red-950/20 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-[#f0e6d3] flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 shadow-sm">
              <span>⚡</span> <span>50 Hours</span>
            </div>
            <div className="hero-pill-badge px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-amber-950/20 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-amber-300 flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 shadow-sm">
              <span>🏆</span> <span>₹1L+ Prizes</span>
            </div>
            <div className="hero-pill-badge px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-950/20 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 shadow-sm">
              <span>🐉</span> <span>200+ Hackers</span>
            </div>
            <div className="hero-pill-badge px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-950/20 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-cyan-300 flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 shadow-sm">
              <span>🩺</span> <span>1 ENG + 1 MED</span>
            </div>
          </div>

          {/* Countdown */}
          <div className="mb-2 sm:mb-4 md:mb-5 w-full max-w-md sm:max-w-lg px-2">
            <CountdownTimer />
          </div>

          {/* CTAs */}
          <div className="relative z-30 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto px-2">
            
            {/* Register Now Primary Button */}
            <button
              ref={buttonRef}
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (typeof onRegisterClick === 'function') {
                  onRegisterClick()
                }
              }}
              className="hero-button group relative w-full sm:w-auto cursor-pointer bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white px-8 py-3.5 rounded-full font-bold tracking-widest uppercase text-xs sm:text-sm font-inter transition-all duration-300 shadow-[0_4px_25px_rgba(220,38,38,0.55)] hover:shadow-[0_4px_35px_rgba(220,38,38,0.8)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 border border-white/20 overflow-hidden shrink-0"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {/* Shimmer sweep effect */}
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Live status dot */}
              <span className="relative flex h-2 w-2 shrink-0 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>

              <span className="pointer-events-none whitespace-nowrap">Register Now</span>

              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

            {/* PPT Template Button */}
            <a
              href="/ppt_template/MEDAITHON_Team_Template-2.pptx"
              download="MEDAITHON_Team_Template-2.pptx"
              className="hero-button relative group w-full sm:w-auto cursor-pointer bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#fbbf24] hover:to-[#f59e0b] text-[#0a0a0f] px-7 py-3.5 rounded-full font-bold tracking-widest uppercase text-xs sm:text-sm font-inter transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.35)] hover:shadow-[0_4px_28px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-amber-300/30 whitespace-nowrap"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="absolute -top-2 -right-1 bg-[#dc2626] text-white text-[9px] font-black font-['Bebas_Neue'] tracking-wider px-2 py-0.5 rounded-full border border-white/40 shadow-sm animate-bounce">
                NEW v2
              </span>
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>PPT Template v2</span>
            </a>

            {/* Rulebook Download Button */}
            <a
              href="/MED_AI_THON_2026_Rulebook.pdf"
              download="MED_AI_THON_2026_Rulebook.pdf"
              className="hero-button w-full sm:w-auto cursor-pointer bg-white/10 hover:bg-white/20 text-[#f0e6d3] hover:text-white px-6 py-3.5 rounded-full font-bold tracking-widest uppercase text-xs sm:text-sm font-inter transition-all duration-300 border border-white/20 hover:border-[#f59e0b] backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <svg className="w-4 h-4 shrink-0 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Rulebook PDF</span>
            </a>

            {/* Learn More Button */}
            <a
              href="#about"
              onClick={handleLearnMore}
              className="hero-button w-full sm:w-auto cursor-pointer border border-[#f0e6d3]/30 hover:border-[#f59e0b] text-[#f0e6d3] hover:text-[#f59e0b] hover:bg-[#f0e6d3]/5 transition-all duration-300 px-7 py-3.5 rounded-full font-bold tracking-widest uppercase text-xs sm:text-sm font-inter backdrop-blur-sm hover:scale-105 active:scale-95 flex items-center justify-center no-underline whitespace-nowrap"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>Learn More</span>
            </a>

          </div>
        </div>
        
        {/* Floating Register Button (Visible on mobile & desktop) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (typeof onRegisterClick === 'function') {
              onRegisterClick()
            }
          }}
          className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 group flex items-center gap-2 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#ef4444] hover:to-[#dc2626] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold tracking-widest uppercase text-[10px] sm:text-xs font-inter transition-all duration-300 shadow-[0_4px_20px_rgba(220,38,38,0.6)] hover:scale-105 active:scale-95 border border-white/20 backdrop-blur-md"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span>Register Now</span>
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default HeroSection