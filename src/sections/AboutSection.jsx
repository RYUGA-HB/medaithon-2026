import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'
import StatsCounter from '../components/StatsCounter'

gsap.registerPlugin(SplitText, ScrollTrigger)

const AboutSection = () => {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create('.first-message', { type: 'words' })
    const secondMsgSplit = SplitText.create('.second-message', { type: 'words' })
    const paragraphSplit = SplitText.create('.about-para', {
      type: 'words, lines',
      linesClass: 'paragraph-line',
    })

    // First line — word-by-word color fill
    gsap.to(firstMsgSplit.words, {
      color: '#f0e6d3',
      ease: 'power1.in',
      stagger: 1,
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top center',
        end: '30% center',
        scrub: 0.5,
      },
    })

    // Second line — word-by-word color fill
    gsap.to(secondMsgSplit.words, {
      color: '#f0e6d3',
      ease: 'power1.in',
      stagger: 1,
      scrollTrigger: {
        trigger: '.second-message',
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
      },
    })

    // Badge reveal
    gsap.to('.about-text-scroll', {
      duration: 0.8,
      clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.about-text-scroll',
        start: 'top 65%',
        end: 'bottom 60%',
        scrub: true,
      },
    })

    // Badge shimmer
    gsap.fromTo(
      '.about-badge-shimmer',
      { x: '-120%' },
      {
        x: '120%',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.about-text-scroll',
          start: 'top 60%',
        },
      }
    )

    // Paragraph words - smooth reveal that stays visible
    gsap.from(paragraphSplit.words, {
      y: 20,
      opacity: 0,
      ease: 'power2.out',
      duration: 0.8,
      stagger: 0.015,
      scrollTrigger: {
        trigger: '.about-para',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    // Decorative line element
    gsap.from('.about-divider', {
      scaleX: 0,
      duration: 1.4,
      ease: 'expo.out',
      transformOrigin: 'center',
      scrollTrigger: { trigger: '.about-divider', start: 'top 90%' },
    })

    // Subtle section background movement
    gsap.to('.about-bg-orb', {
      x: 60,
      y: -40,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })

  return (
    <section className="about-content relative overflow-hidden" style={{ backgroundColor: '#1a1a2e', color: '#f0e6d3' }}>
      {/* Ambient orb */}
      <div
        className="about-bg-orb absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #dc2626, transparent 40%, #f59e0b 80%, transparent 100%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="container mx-auto flex justify-center py-28 relative z-10 px-5">
        <div className="w-full h-full max-w-5xl">
          {/* Main message block */}
          <div className="about-wrapper text-center md:text-left flex flex-col items-center justify-center space-y-4">
            <h1 className="first-message text-4xl md:text-6xl lg:text-7xl font-bebas font-bold uppercase tracking-wider text-center max-w-4xl" style={{ color: 'rgba(240,230,211,0.06)', fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1.1 }}>
              50 hours of relentless innovation where warriors of code
            </h1>

            {/* Badge */}
            <div
              style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', position: 'relative', overflow: 'hidden', transform: 'rotate(-3deg)' }}
              className="about-text-scroll my-6"
            >
              <div className="bg-[#f59e0b] md:py-4 py-3 px-8 relative border-2 border-[#f0e6d3]/20 shadow-xl">
                <div
                  className="about-badge-shimmer absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                  }}
                />
                <h2 className="text-[#0a0a0f] text-3xl md:text-5xl font-bold uppercase tracking-widest relative z-20 m-0 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  FORGE THE FUTURE
                </h2>
              </div>
            </div>

            <h1 className="second-message text-4xl md:text-6xl lg:text-7xl font-bebas font-bold uppercase tracking-wider text-center max-w-4xl" style={{ color: 'rgba(240,230,211,0.06)', fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1.1 }}>
              of medicine one line of code at a time
            </h1>
          </div>

          {/* Divider */}
          <div
            className="about-divider w-48 h-[2px] mx-auto mt-16 opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, #dc2626, transparent)' }}
          />

          {/* Paragraph */}
          <div className="flex justify-center mt-12 md:mt-16">
            <div className="max-w-3xl px-5 flex justify-center">
              <p className="about-para text-center leading-relaxed text-[#a8a29e] text-lg md:text-xl font-inter" style={{ fontFamily: "'Inter', sans-serif" }}>
                MEDAITHON'26 is where medicine meets technology in an epic 50-hour battle of innovation. Assemble your team, choose your path, and build solutions that could save lives. Fueled by ramen, mentored by legends, judged by the council.
              </p>
            </div>
          </div>

          {/* Stats Component */}
          <div className="mt-20 w-full">
            <StatsCounter />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
