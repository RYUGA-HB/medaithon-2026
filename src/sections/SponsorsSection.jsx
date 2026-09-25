import React from 'react'
import { sponsors } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const SponsorsSection = () => {
  useGSAP(() => {
    const split = new SplitText('.sponsor-title', { type: 'chars' })
    gsap.set(split.chars, { yPercent: 120, rotateX: -80, opacity: 0 })
    gsap.to(split.chars, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      stagger: { amount: 0.6, ease: 'power3.inOut' },
      ease: 'expo.out',
      duration: 1.2,
      scrollTrigger: {
        trigger: '.sponsor-title',
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    })

    gsap.fromTo('.tier-label',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sponsors-container',
          start: 'top 80%',
        }
      }
    )

    gsap.fromTo('.sponsor-card',
      { opacity: 0, y: 40, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        ease: 'expo.out',
        duration: 1,
        scrollTrigger: {
          trigger: '.sponsors-container',
          start: 'top 75%',
        }
      }
    )

    gsap.fromTo('.sponsor-cta',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sponsor-cta',
          start: 'top 95%',
        }
      }
    )

    gsap.to('.sponsor-bg-element', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.sponsors-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  })

  return (
    <section id="sponsors" className="sponsors-section relative bg-[#1a1a2e] py-32 overflow-hidden">
      <div className="sponsor-bg-element absolute top-1/4 left-10 w-64 h-64 bg-[#f59e0b]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="sponsor-bg-element absolute bottom-1/4 right-10 w-96 h-96 bg-[#dc2626]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <p className="text-[#f59e0b] font-[Inter] tracking-[0.2em] mb-4">同盟</p>
          <h2 className="sponsor-title general-title text-[#f0e6d3] text-6xl md:text-8xl font-['Bebas_Neue'] uppercase" style={{ perspective: '1000px' }}>
            THE ALLIANCE
          </h2>
          <p className="text-[#a8a29e] font-[Inter] mt-6 max-w-2xl mx-auto text-lg">
            Powered by visionaries who believe in the future of healthcare innovation.
          </p>
        </div>

        <div className="sponsors-container flex flex-col gap-16">
          {sponsors?.title?.length > 0 && (
            <div className="tier-group">
              <h3 className="tier-label text-[#f0e6d3] font-['Bebas_Neue'] text-3xl tracking-widest text-center mb-8">Title Sponsors</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {sponsors.title.map((sponsor, i) => (
                  <div key={i} className="sponsor-card bg-[#0a0a0f] border border-[#f59e0b]/30 rounded-2xl p-12 w-full md:w-[48%] flex items-center justify-center flex-col aspect-video">
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.name} className="max-h-24 object-contain" />
                    ) : (
                      <div className="text-[#f59e0b] font-['Bebas_Neue'] text-5xl">{sponsor.name}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {sponsors?.gold?.length > 0 && (
            <div className="tier-group">
              <h3 className="tier-label text-[#f59e0b] font-['Bebas_Neue'] text-3xl tracking-widest text-center mb-8 flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-[#f59e0b]/40" />
                <span>Incubation Support</span>
                <span className="w-8 h-px bg-[#f59e0b]/40" />
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {sponsors.gold.map((sponsor, i) => (
                  <div 
                    key={i} 
                    className="sponsor-card bg-gradient-to-b from-[#0a0a0f]/90 to-[#11111a]/95 border border-[#f59e0b]/30 rounded-2xl p-6 md:p-8 w-full sm:w-[80%] md:w-[45%] flex items-center justify-center flex-col backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:border-[#f59e0b] group"
                  >
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.name} className="max-h-28 md:max-h-36 w-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-105" />
                    ) : (
                      <div className="text-[#f59e0b] font-['Bebas_Neue'] text-3xl text-center">{sponsor.name}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {sponsors?.silver?.length > 0 && (
            <div className="tier-group">
              <h3 className="tier-label text-[#f0e6d3] font-['Bebas_Neue'] text-2xl tracking-widest text-center mb-8 flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-white/20" />
                <span>Institutional Support</span>
                <span className="w-8 h-px bg-white/20" />
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {sponsors.silver.map((sponsor, i) => (
                  <div 
                    key={i} 
                    className="sponsor-card bg-[#0a0a0f]/80 border border-white/10 rounded-2xl p-4 sm:p-6 w-full sm:w-[47%] md:w-[30%] lg:w-[18%] flex items-center justify-center backdrop-blur-xl shadow-lg transition-all duration-300 hover:scale-105 hover:border-white/30 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] group"
                  >
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.name} className="max-h-20 md:max-h-24 w-auto object-contain bg-white rounded-xl p-3 shadow-md transition-transform duration-300 group-hover:scale-105" />
                    ) : (
                      <div className="text-[#f0e6d3] font-['Bebas_Neue'] text-xl text-center">{sponsor.name}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SponsorsSection
