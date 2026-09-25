import React from 'react'
import { prizes } from '../constants'
import { useGSAP } from '@gsap/react'
import ClipPathTitle from '../components/ClipPathTitle'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ENHANCED_PRIZES = [
  {
    title: '1st Prize',
    japaneseTitle: '1等賞 • 優勝',
    place: '🏆 SUPREME CHAMPION',
    amount: '₹30,000',
    description: 'Awarded to the team displaying peak clinical impact, technical execution, and presentation perfection.',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.3)',
    badgeBg: 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/50',
    borderColor: 'border-[#f59e0b]/50',
    icon: '🏆',
    perks: ['₹30,000 Cash Prize', 'Winner Trophy & Gold Medals', 'Direct Incubation Support'],
    isFeatured: true,
  },
  {
    title: '2nd Prize',
    japaneseTitle: '2等賞 • 準優勝',
    place: '🥈 RUNNER UP',
    amount: '₹20,000',
    description: 'For the team demonstrating outstanding engineering novelty and medical problem solving.',
    color: '#e2e8f0',
    glowColor: 'rgba(226,232,240,0.25)',
    badgeBg: 'bg-slate-200/20 text-slate-200 border-slate-300/40',
    borderColor: 'border-slate-300/40',
    icon: '🥈',
    perks: ['₹20,000 Cash Prize', 'Runner-Up Trophy & Silver Medals', 'Certificate of Distinction'],
    isFeatured: false,
  },
  {
    title: '3rd Prize',
    japaneseTitle: '3等賞 • 第3位',
    place: '🥉 SECOND RUNNER UP',
    amount: '₹15,000',
    description: 'Recognizing relentless execution, high feasibility, and strong cross-disciplinary teamwork.',
    color: '#d97706',
    glowColor: 'rgba(217,119,6,0.25)',
    badgeBg: 'bg-amber-700/20 text-amber-500 border-amber-600/40',
    borderColor: 'border-amber-600/40',
    icon: '🥉',
    perks: ['₹15,000 Cash Prize', '3rd Place Trophy & Bronze Medals', 'Certificate of Distinction'],
    isFeatured: false,
  },
  {
    title: 'Special Mention',
    japaneseTitle: '特別賞 • 特別言及',
    place: '🌟 SPECIAL MENTION (7 TEAMS)',
    amount: 'Exciting Goodies',
    description: 'Recognizing 7 outstanding teams for their exceptional ideas, creative approach, and innovative potential.',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.25)',
    badgeBg: 'bg-emerald-700/20 text-emerald-400 border-emerald-600/40',
    borderColor: 'border-emerald-600/40',
    icon: '🌟',
    perks: ['Exclusive Medaithon Swags', 'Certificate of Recognition', 'Mentorship Opportunities'],
    isFeatured: false,
  },
]

const PrizesSection = () => {
    useGSAP(() => {
        const titles = ['.first-title', '.second-title', '.third-title', '.fourth-title', '.fifth-title']

        const revealTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.prizes-section',
                start: 'top 65%',
                end: 'top 10%',
                scrub: 1.5,
            },
        })

        titles.forEach((selector) => {
            revealTl.to(
                `.prizes-section ${selector}`,
                {
                    duration: 1,
                    opacity: 1,
                    ease: 'expo.out',
                    clipPath: 'polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)',
                },
                '-=0.6'
            )
        })

        gsap.from('.prizes-intro-word', {
            opacity: 0,
            y: 20,
            stagger: 0.05,
            ease: 'expo.out',
            duration: 0.9,
            scrollTrigger: { trigger: '.prizes-section', start: 'top 70%' },
        })

        gsap.from('.prizes-card-reveal', {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.prizes-grid', start: 'top 80%' },
        })

        gsap.utils.toArray('.prize-amount-count').forEach((el) => {
            const valStr = el.dataset.value || "0"
            const valNum = parseFloat(valStr.replace(/[^0-9.]/g, ''))
            const prefix = valStr.match(/^[^\d]+/)?.[0] || ''
            const suffix = valStr.match(/[^\d]+$/)?.[0] || ''
            
            if (isNaN(valNum)) {
                el.textContent = valStr;
                return;
            }

            const obj = { val: 0 }

            gsap.to(obj, {
                val: valNum,
                duration: 2,
                ease: 'expo.out',
                onUpdate: () => {
                    el.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`
                },
                scrollTrigger: { trigger: el, start: 'top 85%' },
            })
        })
    })

    return (
        <section id="prizes" className="prizes-section relative overflow-hidden bg-[#0a0a0f] py-28 md:py-36 text-[#f0e6d3] border-t border-white/5">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#f59e0b]/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#dc2626]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 relative z-10">
                
                {/* Header Tag */}
                <div className="text-center mb-12">
                    <p className="text-[#f59e0b] font-['Inter'] tracking-[0.25em] mb-3 text-xs md:text-sm uppercase font-semibold">
                        栄誉と賞金 • Total Prize Pool ₹65,000+
                    </p>
                    <h2 className="text-[#f0e6d3] font-['Bebas_Neue'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider leading-none m-0">
                        ATTRACTIVE PRIZE POOL
                    </h2>
                    <p className="text-[#a8a29e] font-['Inter'] text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                        Honoring medical AI pioneers with cash rewards, trophies, certificates of distinction, and mentorship.
                    </p>
                </div>

                {/* Animated Stacked Titles Banner */}
                <div className="col-center relative mb-20 md:mb-24 flex flex-col items-center justify-center">
                    <ClipPathTitle
                        title="PRIZE POOL"
                        color="#0a0a0f"
                        bg="#f59e0b"
                        className="first-title rotate-[3deg]"
                        borderColor="#f59e0b"
                    />
                    <ClipPathTitle
                        title="1ST PRIZE 30K"
                        color="#0a0a0f"
                        bg="#ffd700"
                        className="second-title rotate-[-1deg] -translate-y-5"
                        borderColor="#ffd700"
                    />
                    <ClipPathTitle
                        title="2ND PRIZE 20K"
                        color="#0a0a0f"
                        bg="#e2e8f0"
                        className="third-title rotate-[1deg] -translate-y-12"
                        borderColor="#e2e8f0"
                    />
                    <ClipPathTitle
                        title="3RD PRIZE 15K"
                        color="#f0e6d3"
                        bg="#d97706"
                        className="fourth-title rotate-[-5deg] -translate-y-12"
                        borderColor="#d97706"
                    />
                    <ClipPathTitle
                        title="SPECIAL MENTIONS"
                        color="#0a0a0f"
                        bg="#10b981"
                        className="fifth-title rotate-[2deg] -translate-y-12"
                        borderColor="#10b981"
                    />
                </div>

                {/* Enhanced Grid of Luxury Prize Cards */}
                <div className="prizes-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {ENHANCED_PRIZES.map((prize, idx) => (
                        <div 
                          key={idx} 
                          className={`relative rounded-3xl p-6 sm:p-7 border backdrop-blur-xl flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] group overflow-hidden ${prize.borderColor} ${
                            prize.isFeatured 
                                ? 'bg-gradient-to-br from-[#1a1a2e] via-[#151522] to-[#0d0d14] shadow-[0_0_50px_rgba(245,158,11,0.25)] border-[#f59e0b]/60' 
                                : 'bg-gradient-to-br from-[#161626]/90 via-[#0f0f18]/90 to-[#0a0a0f]/95 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
                          }`}
                        >
                            {/* Top Accent Lighting Line */}
                            <div 
                              className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-80"
                              style={{ color: prize.color }}
                            />

                            {/* Card Top: Ribbon Badge & Icon */}
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className={`text-xs font-bold font-['Bebas_Neue'] tracking-widest px-3.5 py-1.5 rounded-full border mb-3 inline-block shadow-sm ${prize.badgeBg}`}>
                                            {prize.place}
                                        </span>
                                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-['Bebas_Neue'] uppercase tracking-wider text-[#f0e6d3] m-0">
                                            {prize.title}
                                        </h3>
                                        <span className="text-xs text-[#f59e0b] font-mono tracking-wider block mt-1">
                                            {prize.japaneseTitle}
                                        </span>
                                    </div>
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-inner shrink-0">
                                        {prize.icon}
                                    </div>
                                </div>

                                {/* Main Amount Counter */}
                                <div className="my-5 border-y border-white/10 py-4 flex items-baseline justify-between">
                                    <span className="text-xs font-mono uppercase tracking-widest text-[#a8a29e]">Cash Prize</span>
                                    <span 
                                        className="text-5xl sm:text-6xl font-bold font-['Bebas_Neue'] prize-amount-count tracking-wider"
                                        style={{ color: prize.color, textShadow: `0 0 20px ${prize.glowColor}` }} 
                                        data-value={prize.amount}
                                    >
                                        0
                                    </span>
                                </div>

                                <p className="text-[#a8a29e] font-['Inter'] text-sm leading-relaxed mb-6">
                                    {prize.description}
                                </p>
                            </div>

                            {/* Included Perks Checklist */}
                            <div className="pt-4 border-t border-white/5 space-y-2">
                                <span className="text-[11px] font-mono uppercase tracking-widest text-[#f59e0b] block mb-2">Included Rewards & Perks</span>
                                {prize.perks.map((perk, i) => (
                                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#f0e6d3]">
                                        <span className="text-emerald-400 font-bold text-sm">✓</span>
                                        <span>{perk}</span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>

                {/* Total Pool Banner Footer */}
                <div className="mt-16 text-center max-w-2xl mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <p className="font-['Bebas_Neue'] text-2xl tracking-widest text-[#f59e0b] m-0">
                        ⚡ ALL PARTICIPANTS RECEIVE OFFICIAL MEDAITHON '26 CERTIFICATES & SWAG KITS
                    </p>
                </div>

            </div>
        </section>
    )
}

export default PrizesSection

