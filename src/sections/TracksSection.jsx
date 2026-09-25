import React, { useRef, useState, useEffect } from 'react'
import { tracks } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(SplitText, ScrollTrigger)

const TracksSection = () => {
    const sectionRef = useRef()
    const containerRef = useRef()
    const sliderRef = useRef()
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
    const [activeIndex, setActiveIndex] = useState(0)

    useGSAP(() => {
        // Safe SplitText animations
        try {
            const firstTitle = sectionRef.current?.querySelector(".first-text-split h1")
            const secondTitle = sectionRef.current?.querySelector(".second-text-split h1")
            
            if (firstTitle && !firstTitle.dataset.split) {
                firstTitle.dataset.split = "true"
                const firstTextSplit = SplitText.create(firstTitle, { type: "chars" })
                gsap.from(firstTextSplit.chars, {
                    yPercent: 120,
                    opacity: 0,
                    stagger: 0.02,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                })
            }

            if (secondTitle && !secondTitle.dataset.split) {
                secondTitle.dataset.split = "true"
                const secondTextSplit = SplitText.create(secondTitle, { type: "chars" })
                gsap.from(secondTextSplit.chars, {
                    yPercent: 120,
                    opacity: 0,
                    stagger: 0.02,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                })
            }
        } catch (err) {
            console.warn("SplitText initialization warning:", err)
        }

        // Badge reveal
        gsap.to(".tracks-text-scroll", {
            duration: 0.8,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            }
        })

        // GSAP Horizontal Scroll Pinning for Desktop
        if (!isTablet && sliderRef.current && containerRef.current) {
            const getScrollAmount = () => {
                if (!sliderRef.current || !containerRef.current) return 0
                const sliderWidth = sliderRef.current.scrollWidth
                const containerWidth = containerRef.current.offsetWidth
                return Math.max(0, sliderWidth - containerWidth + 220)
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${getScrollAmount()}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const index = Math.min(
                            tracks.length - 1,
                            Math.floor(self.progress * tracks.length)
                        )
                        setActiveIndex(index)
                    }
                }
            })

            tl.to(sliderRef.current, {
                x: () => -getScrollAmount(),
                ease: "none",
            })
        }

        // Refresh ScrollTrigger after layout render
        const refreshTimer1 = setTimeout(() => {
            ScrollTrigger.refresh()
        }, 300)
        const refreshTimer2 = setTimeout(() => {
            ScrollTrigger.refresh()
        }, 700)

        return () => {
            clearTimeout(refreshTimer1)
            clearTimeout(refreshTimer2)
        }
    }, { scope: sectionRef, dependencies: [isTablet] })

    // Manual navigation (Arrows / Dots)
    const scrollToTrack = (targetIndex) => {
        const clampedIndex = Math.max(0, Math.min(tracks.length - 1, targetIndex))
        setActiveIndex(clampedIndex)

        if (!isTablet && sectionRef.current && sliderRef.current && containerRef.current) {
            const sliderWidth = sliderRef.current.scrollWidth
            const containerWidth = containerRef.current.offsetWidth
            const getScrollAmount = Math.max(0, sliderWidth - containerWidth + 80)
            
            const startScroll = sectionRef.current.offsetTop
            const progress = clampedIndex / (tracks.length - 1)
            const targetY = startScroll + progress * getScrollAmount

            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            })
        } else if (containerRef.current) {
            const cardWidth = containerRef.current.scrollWidth / tracks.length
            containerRef.current.scrollTo({
                left: clampedIndex * cardWidth,
                behavior: 'smooth'
            })
        }
    }

    // Sync mobile scroll position with active index
    const handleMobileScroll = (e) => {
        if (!isTablet) return
        const container = e.target
        const cardWidth = container.scrollWidth / tracks.length
        const newIndex = Math.round(container.scrollLeft / cardWidth)
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < tracks.length) {
            setActiveIndex(newIndex)
        }
    }

    // Navigate to Problem Statements section filtered by track
    const handleTrackSelect = (track) => {
        const trackMap = {
            'Hardware / IoT Track': 'Hardware',
            'AI / Software Track': 'Software & Automation',
            'HealthTech / Interoperability Track': 'Wearable Computing',
            'Advanced / Hybrid Track': 'AI in Diagnostics',
            'DragonForge Open': 'All'
        }
        const category = trackMap[track.name] || 'All'
        
        window.dispatchEvent(new CustomEvent('select-ps-track', { detail: category }))
        
        const psElement = document.getElementById('problems')
        if (psElement) {
            psElement.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section 
            id="tracks" 
            ref={sectionRef} 
            className="tracks-section relative w-full bg-[#0a0a0f] min-h-screen pt-20 lg:pt-0 overflow-hidden flex items-center justify-center"
        >
            <div className={`tracks-section-inner w-full flex ${isTablet ? 'flex-col px-4 sm:px-6 pt-12 pb-16' : 'flex-row items-center justify-between h-screen'}`}>

                {/* Left Side: Stationary Title & Active Track Info */}
                <div className={`general-title flex flex-col items-center justify-center text-center ${isTablet ? 'w-full mb-6' : 'lg:h-screen lg:w-[350px] xl:w-[400px] flex-shrink-0 gap-4 py-4 z-20 pt-16 lg:pt-0 lg:pl-8'}`}>
                    
                    <div className="overflow-hidden first-text-split text-[#f0e6d3]">
                        <h1 className="uppercase font-['Bebas_Neue'] text-4xl sm:text-6xl md:text-7xl tracking-wider m-0 leading-none">
                            CHOOSE YOUR
                        </h1>
                    </div>

                    <div
                        style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                        className="tracks-text-scroll my-0.5"
                    >
                        <div className="bg-[#f59e0b] py-2 px-6 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                            <h2 className="text-[#0a0a0f] uppercase font-['Bebas_Neue'] text-3xl sm:text-5xl md:text-6xl m-0 leading-none">
                                PATH
                            </h2>
                        </div>
                    </div>

                    <div className="overflow-hidden second-text-split text-[#f0e6d3]">
                        <h1 className="uppercase font-['Bebas_Neue'] text-4xl sm:text-6xl md:text-7xl tracking-wider m-0 leading-none">
                            五道
                        </h1>
                    </div>

                    {/* Active Track Counter & Navigation Controls */}
                    <div className="mt-2 flex flex-col items-center gap-3">
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                            <span className="text-[#f59e0b] font-bold text-xs sm:text-sm font-['Bebas_Neue'] tracking-widest">
                                TRACK 0{activeIndex + 1} / 0{tracks.length}
                            </span>
                            <div className="w-10 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-[#f59e0b] to-red-500 transition-all duration-300 rounded-full"
                                    style={{ width: `${((activeIndex + 1) / tracks.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Prev / Next Arrow Controls */}
                        <div className="flex items-center gap-3 z-30 mt-1">
                            <button 
                                onClick={() => scrollToTrack(activeIndex - 1)}
                                disabled={activeIndex === 0}
                                className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all ${
                                    activeIndex === 0 
                                        ? 'opacity-30 cursor-not-allowed bg-white/5 text-white/40' 
                                        : 'bg-white/10 hover:bg-[#f59e0b] hover:text-[#0a0a0f] text-white hover:border-[#f59e0b] active:scale-95 shadow-lg'
                                }`}
                                aria-label="Previous Track"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            
                            {/* Track Dots */}
                            <div className="flex items-center gap-1.5 px-1">
                                {tracks.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => scrollToTrack(idx)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            activeIndex === idx 
                                                ? 'w-7 bg-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.6)]' 
                                                : 'w-2 bg-white/20 hover:bg-white/50'
                                        }`}
                                        aria-label={`Go to Track ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            <button 
                                onClick={() => scrollToTrack(activeIndex + 1)}
                                disabled={activeIndex === tracks.length - 1}
                                className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all ${
                                    activeIndex === tracks.length - 1 
                                        ? 'opacity-30 cursor-not-allowed bg-white/5 text-white/40' 
                                        : 'bg-white/10 hover:bg-[#f59e0b] hover:text-[#0a0a0f] text-white hover:border-[#f59e0b] active:scale-95 shadow-lg'
                                }`}
                                aria-label="Next Track"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Side: Horizontal Cards Wrapper */}
                <div 
                    ref={containerRef} 
                    onScroll={handleMobileScroll}
                    className={`relative ${
                        isTablet 
                            ? 'w-full overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 px-2' 
                            : 'flex-1 lg:w-[calc(100vw-360px)] xl:w-[calc(100vw-420px)] h-screen flex items-center overflow-hidden pt-12 pr-8'
                    }`}
                >
                    <div 
                        ref={sliderRef} 
                        className={`tracks flex ${
                            isTablet 
                                ? 'flex-row gap-5 w-max min-w-full' 
                                : 'flex-row flex-nowrap w-max gap-8 pr-20 pl-2'
                        }`}
                    >
                        {tracks && tracks.map((track, i) => {
                            const isActive = activeIndex === i
                            return (
                                <div
                                    key={track.name || i}
                                    onClick={() => handleTrackSelect(track)}
                                    className={`relative z-30 transition-all duration-500 rounded-3xl p-6 sm:p-7 flex flex-col justify-between items-center text-center border cursor-pointer group ${
                                        isTablet 
                                            ? 'w-[85vw] sm:w-[400px] snap-center flex-none min-h-[380px]' 
                                            : 'w-[360px] sm:w-[400px] lg:w-[440px] xl:w-[480px] flex-none h-[52vh] min-h-[380px] max-h-[480px] hover:scale-[1.02]'
                                    } ${
                                        isActive 
                                            ? 'border-[#f59e0b]/60 shadow-[0_0_40px_rgba(245,158,11,0.25)] scale-[1.01]' 
                                            : 'border-white/10 hover:border-white/30 opacity-90'
                                    }`}
                                    style={{ 
                                      background: `linear-gradient(135deg, ${track.color || '#1a1a2e'}ee 0%, #0a0a0f 100%)`,
                                      backdropFilter: 'blur(20px)',
                                    }}
                                >
                                    {/* Top Badge */}
                                    <div className="w-full flex justify-between items-center mb-1">
                                        <span className="text-[11px] font-bold font-['Bebas_Neue'] tracking-widest px-3 py-1 rounded-full bg-black/40 text-[#f59e0b] border border-[#f59e0b]/30">
                                            TRACK 0{i + 1}
                                        </span>
                                        <div 
                                            className="w-3 h-3 rounded-full transition-all duration-300"
                                            style={{ 
                                                backgroundColor: track.color || '#f59e0b',
                                                boxShadow: isActive ? `0 0 12px ${track.color || '#f59e0b'}` : 'none'
                                            }}
                                        />
                                    </div>

                                    {/* Main Icon & Titles */}
                                    <div className="flex flex-col items-center justify-center my-auto py-1">
                                        <div className="text-5xl sm:text-6xl md:text-7xl mb-3 drop-shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                                            {track.icon}
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0e6d3] uppercase font-['Bebas_Neue'] mb-2 tracking-wider leading-tight">
                                            {track.name}
                                        </h3>
                                        <p className="text-[#a8a29e] font-['Inter'] text-xs sm:text-sm md:text-base max-w-sm leading-relaxed line-clamp-3">
                                            {track.description}
                                        </p>
                                    </div>

                                    {/* Bottom CTA Action Button */}
                                    <div className="w-full pt-3 border-t border-white/10">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleTrackSelect(track)
                                            }}
                                            className="w-full py-2.5 px-4 rounded-2xl bg-white/10 group-hover:bg-[#f59e0b] group-hover:text-[#0a0a0f] text-[#f0e6d3] text-xs font-bold font-['Inter'] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-white/15 group-hover:border-[#f59e0b] shadow-md"
                                        >
                                            <span>View Problem Statements</span>
                                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default TracksSection
