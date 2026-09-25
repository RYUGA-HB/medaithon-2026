import React, { useState, useEffect, useRef } from 'react'
import { judges } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const JudgesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [viewMode, setViewMode] = useState('coverflow') // 'coverflow' | 'marquee' | 'grid'
  const [isMobile, setIsMobile] = useState(false)
  
  const timerRef = useRef(null)
  const touchStartX = useRef(null)
  const galleryData = judges || []
  const total = galleryData.length

  // Track window resize for mobile 3D positioning
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Automatic scrolling loop (advances every 3 seconds)
  useEffect(() => {
    if (isPlaying && viewMode === 'coverflow') {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % total)
      }, 3000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, viewMode, total])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % total)
        if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + total) % total)
        if (e.key === 'Escape') setLightboxIndex(null)
      } else if (viewMode === 'coverflow') {
        if (e.key === 'ArrowRight') handleNext()
        if (e.key === 'ArrowLeft') handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, viewMode, total])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 35) {
      handleNext()
    } else if (diff < -35) {
      handlePrev()
    }
    touchStartX.current = null
  }

  // Calculate 3D position offset relative to active card
  const getCardStyle = (index) => {
    let diff = index - activeIndex
    // Handle wrapping around infinite loop
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    const absDiff = Math.abs(diff)

    // Hide cards far from active focus
    if (absDiff > (isMobile ? 2 : 3)) {
      return { opacity: 0, transform: 'scale(0.3) translateZ(-400px)', zIndex: 0, pointerEvents: 'none' }
    }

    const translateX = diff * (isMobile ? 120 : 210) // compact horizontal spacing on mobile
    const translateZ = -absDiff * (isMobile ? 90 : 160)
    const rotateY = diff * (isMobile ? -16 : -25)
    const scale = 1 - absDiff * (isMobile ? 0.14 : 0.18)
    const opacity = 1 - absDiff * (isMobile ? 0.45 : 0.35)
    const zIndex = 50 - absDiff * 10

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(0, opacity),
      zIndex,
      filter: diff === 0 ? 'none' : 'brightness(0.6) blur(0.5px)',
      pointerEvents: 'auto',
    }
  }

  return (
    <section id="gallery" className="relative bg-[#0a0a0f] py-20 sm:py-28 md:py-32 text-[#f0e6d3] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#dc2626]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#f59e0b]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[#f59e0b] font-['Inter'] tracking-[0.25em] mb-2 text-xs md:text-sm uppercase font-semibold">
            過去のハイライト • MEDAITHON 2025
          </p>
          <h2 className="text-[#f0e6d3] font-['Bebas_Neue'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider leading-none m-0">
            MEDAITHON 2025 SNAPSHOTS
          </h2>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 sm:mt-6">
            <button
              onClick={() => setViewMode('coverflow')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold font-['Bebas_Neue'] tracking-widest uppercase transition-all duration-300 ${
                viewMode === 'coverflow'
                  ? 'bg-[#f59e0b] text-[#0a0a0f] shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                  : 'bg-white/5 text-[#a8a29e] hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              🎡 3D Carousel
            </button>

            <button
              onClick={() => setViewMode('marquee')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold font-['Bebas_Neue'] tracking-widest uppercase transition-all duration-300 ${
                viewMode === 'marquee'
                  ? 'bg-[#f59e0b] text-[#0a0a0f] shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                  : 'bg-white/5 text-[#a8a29e] hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              🎬 Continuous Ribbon
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold font-['Bebas_Neue'] tracking-widest uppercase transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-[#f59e0b] text-[#0a0a0f] shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                  : 'bg-white/5 text-[#a8a29e] hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              🖼️ Photo Grid
            </button>
          </div>
        </div>

        {/* ── MODE 1: 3D COVERFLOW CAROUSEL ────────────────────────────────────────── */}
        {viewMode === 'coverflow' && (
          <div className="relative py-4 sm:py-8">
            
            {/* 3D Perspective Stage Container */}
            <div 
              className="relative h-[240px] sm:h-[380px] md:h-[460px] w-full flex items-center justify-center select-none touch-pan-y"
              style={{ perspective: isMobile ? '800px' : '1200px' }}
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {galleryData.map((item, idx) => {
                const isCurrent = idx === activeIndex
                const styleObj = getCardStyle(idx)

                return (
                  <div
                    key={item.id || idx}
                    onClick={() => {
                      if (isCurrent) {
                        setLightboxIndex(idx)
                      } else {
                        setActiveIndex(idx)
                      }
                    }}
                    className={`absolute w-[240px] sm:w-[360px] md:w-[460px] h-[160px] sm:h-[240px] md:h-[310px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out border shadow-2xl ${
                      isCurrent
                        ? 'border-[#f59e0b] shadow-[0_10px_40px_rgba(245,158,11,0.35)]'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                    style={styleObj}
                  >
                    {/* Image */}
                    <img
                      src={item.img}
                      alt={`MEDAITHON 2025 Snapshot ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-black/20 opacity-80" />

                    {/* Top Index Badge */}
                    <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 bg-black/70 backdrop-blur-md border border-[#f59e0b]/40 text-[#f59e0b] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider">
                      MEDAITHON 2025 • #{String(idx + 1).padStart(2, '0')}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 flex items-center justify-between backdrop-blur-sm bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent">
                      <span className="text-[10px] sm:text-xs font-mono text-[#a8a29e] tracking-wider">
                        SNAPSHOT {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                      </span>

                      {isCurrent && (
                        <span className="text-[10px] sm:text-xs bg-[#f59e0b] text-[#0a0a0f] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider shrink-0 shadow-md">
                          View Snapshot ↗
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Carousel Navigation Controls */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6">
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/5 border border-white/10 hover:border-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#0a0a0f] text-white flex items-center justify-center text-lg sm:text-xl transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
              >
                ←
              </button>

              {/* Slide Counter Indicator */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 border border-white/10 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full backdrop-blur-md">
                <span className="text-sm sm:text-lg font-bold font-mono text-[#f59e0b]">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-xs text-[#a8a29e] font-mono">/</span>
                <span className="text-xs text-[#a8a29e] font-mono">
                  {String(total).padStart(2, '0')}
                </span>
              </div>

              {/* Play / Pause Auto-play button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause Auto-play' : 'Start Auto-play'}
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#f59e0b] text-[#f0e6d3] flex items-center justify-center text-xs sm:text-sm transition-all duration-300 hover:scale-110 cursor-pointer"
                title={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/5 border border-white/10 hover:border-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#0a0a0f] text-white flex items-center justify-center text-lg sm:text-xl transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
              >
                →
              </button>
            </div>

            {/* Pagination Thumbnail Dots */}
            <div className="flex justify-center items-center gap-1 sm:gap-1.5 mt-4 sm:mt-6 flex-wrap px-4">
              {galleryData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-6 sm:w-8 bg-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                      : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

          </div>
        )}

        {/* ── MODE 2: CONTINUOUS INFINITE RIBBON (MARQUEE) ───────────────────────── */}
        {viewMode === 'marquee' && (
          <div className="space-y-4 sm:space-y-6 py-4 sm:py-6">
            
            {/* Top Row: Scrolling Left */}
            <div className="relative overflow-hidden w-full group py-1 sm:py-2">
              <div className="flex gap-4 sm:gap-6 animate-[marquee_35s_linear_infinite] group-hover:[animation-play-state:paused] w-max">
                {[...galleryData, ...galleryData].map((item, idx) => (
                  <div
                    key={`r1-${idx}`}
                    onClick={() => setLightboxIndex(idx % total)}
                    className="w-[220px] sm:w-[300px] h-[140px] sm:h-[190px] rounded-xl sm:rounded-2xl overflow-hidden relative border border-white/10 hover:border-[#f59e0b] shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg group/card"
                  >
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity" />
                    <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 text-left">
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#f59e0b] block uppercase font-semibold">
                        MEDAITHON 2025 • #{String((idx % total) + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Scrolling Right */}
            <div className="relative overflow-hidden w-full group py-1 sm:py-2">
              <div className="flex gap-4 sm:gap-6 animate-[marquee-reverse_40s_linear_infinite] group-hover:[animation-play-state:paused] w-max">
                {[...galleryData.slice().reverse(), ...galleryData.slice().reverse()].map((item, idx) => (
                  <div
                    key={`r2-${idx}`}
                    onClick={() => setLightboxIndex(idx % total)}
                    className="w-[220px] sm:w-[300px] h-[140px] sm:h-[190px] rounded-xl sm:rounded-2xl overflow-hidden relative border border-white/10 hover:border-[#f59e0b] shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg group/card"
                  >
                    <img src={item.img} alt={`MEDAITHON 2025 Snapshot ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity" />
                    <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 text-left">
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#f59e0b] block uppercase font-semibold">
                        MEDAITHON 2025 • #{String((idx % total) + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ── MODE 3: PHOTO GRID ─────────────────────────────────────────────────── */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 py-4 sm:py-6">
            {galleryData.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-[#f59e0b] bg-[#161626] aspect-video cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_25px_rgba(245,158,11,0.25)]"
              >
                <img src={item.img} alt={`MEDAITHON 2025 Snapshot ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/60 border border-white/10 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono text-[#f59e0b]">
                  #{String(idx + 1).padStart(2, '0')}
                </div>
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                  <p className="text-[11px] sm:text-xs font-mono text-white/80 m-0 truncate">
                    MEDAITHON 2025
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── LIGHTBOX MODAL PREVIEW ─────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-6 animate-in fade-in duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#11111a] border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center p-2.5 sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="w-full flex items-center justify-between pb-2.5 sm:pb-3 px-1 sm:px-2 border-b border-white/10 mb-2.5 sm:mb-3">
              <div className="overflow-hidden">
                <span className="text-[10px] sm:text-xs font-mono text-[#f59e0b] block uppercase">
                  MEDAITHON 2025 GALLERY
                </span>
                <h3 className="text-sm sm:text-lg font-bold font-['Bebas_Neue'] tracking-wider text-white m-0">
                  SNAPSHOT #{String(lightboxIndex + 1).padStart(2, '0')}
                </h3>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className="text-[10px] sm:text-xs font-mono bg-white/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-white">
                  {String(lightboxIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-7 sm:w-9 h-7 sm:h-9 rounded-full bg-white/10 text-white hover:bg-[#dc2626] transition-colors flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Lightbox Photo */}
            <div className="relative w-full flex items-center justify-center bg-black/40 rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src={galleryData[lightboxIndex].img}
                alt={galleryData[lightboxIndex].name}
                className="max-h-[68vh] sm:max-h-[72vh] w-auto object-contain rounded-lg sm:rounded-xl shadow-2xl"
              />

              {/* Prev Button */}
              <button
                onClick={() => setLightboxIndex((lightboxIndex - 1 + total) % total)}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 sm:w-12 h-9 sm:h-12 rounded-full bg-black/70 hover:bg-[#f59e0b] hover:text-[#0a0a0f] text-white flex items-center justify-center text-base sm:text-xl border border-white/20 transition-all shadow-2xl cursor-pointer"
                aria-label="Previous Image"
              >
                ←
              </button>

              {/* Next Button */}
              <button
                onClick={() => setLightboxIndex((lightboxIndex + 1) % total)}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 sm:w-12 h-9 sm:h-12 rounded-full bg-black/70 hover:bg-[#f59e0b] hover:text-[#0a0a0f] text-white flex items-center justify-center text-base sm:text-xl border border-white/20 transition-all shadow-2xl cursor-pointer"
                aria-label="Next Image"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Marquee Animation CSS Keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>

    </section>
  )
}

export default JudgesSection
