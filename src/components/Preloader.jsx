import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

const LOADING_STEPS = [
  '[01/04] INITIALIZING DRAGON CORE...',
  '[02/04] CONNECTING MEDICINE & TECHNOLOGY...',
  '[03/04] PREPARING 50-HOUR WARRIOR SPRINT...',
  '[04/04] SYSTEM READY. ENTER THE ARENA.'
]

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const loaderRef = useRef(null)
  const logoRef = useRef(null)
  const ecgPathRef = useRef(null)

  useEffect(() => {
    // Progress counter animation
    let current = 0
    const interval = setInterval(() => {
      // Non-linear progress increment for realistic loading feel
      const increment = Math.floor(Math.random() * 8) + 3
      current = Math.min(current + increment, 100)
      setProgress(current)

      if (current < 25) setStepIndex(0)
      else if (current < 60) setStepIndex(1)
      else if (current < 90) setStepIndex(2)
      else setStepIndex(3)

      if (current >= 100) {
        clearInterval(interval)
        
        // GSAP curtain exit animation
        const tl = gsap.timeline({
          delay: 0.3,
          onComplete: () => {
            if (typeof onComplete === 'function') {
              onComplete()
            }
          }
        })

        tl.to(logoRef.current, {
          scale: 1.1,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in'
        })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'expo.inOut'
        })
      }
    }, 40)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[#0a0a0f] text-[#f0e6d3] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Background Ambient Crimson Sun Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#dc2626] rounded-full blur-[140px] opacity-25 pointer-events-none animate-pulse" />

      {/* Cyber Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px]" />

      <div ref={logoRef} className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
        
        {/* Japanese Top Tag */}
        <div className="mb-4 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[10px] sm:text-xs font-mono tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>医療AIハッカソン • MEDAITHON 2026</span>
        </div>

        {/* Dragon Spirit & Logo Graphic */}
        <div className="relative mb-6">
          <img
            src="/images/dragon.png"
            alt="Dragon Spirit"
            className="w-32 sm:w-44 h-auto object-contain mx-auto filter drop-shadow-[0_0_25px_rgba(220,38,38,0.6)] animate-bounce"
            style={{ animationDuration: '3s' }}
            onError={(e) => e.target.style.display = 'none'}
          />
          <img
            src="/medaithon-logo.png"
            alt="Medaithon 2026"
            className="w-56 sm:w-72 h-auto object-contain mx-auto mt-2 filter drop-shadow-[0_4px_20px_rgba(220,38,38,0.4)]"
          />
        </div>

        {/* ECG Pulse Wave SVG */}
        <div className="w-full h-12 my-2 relative flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full stroke-red-500 fill-none" viewBox="0 0 300 50">
            <path
              ref={ecgPathRef}
              d="M0 25 L80 25 L90 10 L100 40 L110 5 L120 45 L130 25 L210 25 L220 15 L225 35 L230 25 L300 25"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: 300 - (progress / 100) * 300,
                transition: 'stroke-dashoffset 0.1s linear'
              }}
            />
          </svg>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-4 border border-white/10 relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#dc2626] via-[#f59e0b] to-[#dc2626] transition-all duration-100 ease-out rounded-full shadow-[0_0_12px_rgba(220,38,38,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="flex items-center justify-between w-full font-mono text-xs text-[#a8a29e] mb-2 px-1">
          <span className="text-red-400 font-bold tracking-wider">{LOADING_STEPS[stepIndex]}</span>
          <span className="font-['Bebas_Neue'] text-xl text-[#f0e6d3] tracking-wider">{progress}%</span>
        </div>

        {/* Medical & Engineering Alliance Badge */}
        <div className="mt-3 text-[10px] text-stone-500 font-mono tracking-widest uppercase">
          WHERE MEDICINE MEETS TECHNOLOGY • 50 HOURS OF INNOVATION
        </div>

      </div>
    </div>
  )
}

export default Preloader
