import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SLIDE_PREVIEWS = [
  {
    id: 'slide-1',
    num: '01',
    label: 'Title & Team',
    tag: 'SLIDE 1 • COVER & TEAM COMPOSITION',
    title: 'HEALTHCARE INNOVATION ABSTRACT',
    subtitle: 'SRM TRP Engineering College & SRM Medical College',
    badge: 'MANDATORY DECK COVER',
    accentColor: '#f59e0b',
    content: (
      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#f59e0b] font-mono uppercase block">Project Title & Track</span>
            <p className="text-xs sm:text-sm font-bold text-[#f0e6d3] m-0">[Your Innovation Title] — Track 01 to 05</p>
          </div>
          <span className="text-xs bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 px-2.5 py-1 rounded-md font-mono">16:9 HD</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-[#dc2626]/10 border border-[#dc2626]/30">
            <span className="text-[10px] text-[#dc2626] font-mono font-bold block mb-1">👨‍💻 1. ENGINEERING MEMBER</span>
            <p className="text-xs text-[#f0e6d3] font-semibold m-0">Engineering Core Lead</p>
            <p className="text-[11px] text-[#a8a29e] mt-0.5">Hardware / Software / AI Model</p>
          </div>
          <div className="p-3 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30">
            <span className="text-[10px] text-[#10b981] font-mono font-bold block mb-1">🩺 2. MEDICAL MEMBER</span>
            <p className="text-xs text-[#f0e6d3] font-semibold m-0">Clinical Insight Lead</p>
            <p className="text-[11px] text-[#a8a29e] mt-0.5">Medical Needs / Diagnostics</p>
          </div>
        </div>
        <p className="text-[11px] text-[#f59e0b] font-mono text-center pt-1 m-0">
          ⚠️ TEAM REQUIREMENT: Minimum 1 female member per team (Mandatory)
        </p>
      </div>
    )
  },
  {
    id: 'slide-2',
    num: '02',
    label: '01 / NEED',
    tag: 'SLIDE 2 • CLINICAL PROBLEM & UNMET NEED',
    title: '01 / CLINICAL NEED ANALYSIS',
    subtitle: 'Define the burden, diagnostic bottleneck, or patient care gap',
    badge: 'PROBLEM STATEMENT',
    accentColor: '#f59e0b',
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-xs font-mono text-[#f59e0b] block mb-1">● Current Clinical Bottleneck</span>
          <p className="text-xs text-[#a8a29e] leading-relaxed m-0">
            Describe current diagnostic delays, high equipment costs, or lack of bedside decision support in current healthcare workflows.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-xs font-mono text-[#f59e0b] block mb-1">● Target Patient Population</span>
          <p className="text-xs text-[#a8a29e] leading-relaxed m-0">
            Specify patient demographics, hospital departments (ICU, Radiology, ER), or rural clinics benefiting from your solution.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'slide-3',
    num: '03',
    label: '02 / TECH',
    tag: 'SLIDE 3 • ENGINEERING CORE & PIPELINE',
    title: '02 / TECHNICAL ARCHITECTURE',
    subtitle: 'Hardware schematics, AI models, data flow & system execution',
    badge: 'ENGINEERING CORE',
    accentColor: '#dc2626',
    content: (
      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
          <div className="flex-1">
            <span className="text-xs font-mono text-[#dc2626] block mb-1">● System Block Diagram / Architecture</span>
            <p className="text-xs text-[#a8a29e] m-0">Sensors / Microcontrollers → Model Inference → Clinical Interface Dashboard</p>
          </div>
          <span className="text-xl">⚙️</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-[#a8a29e]">
          <div className="p-2 rounded-lg bg-white/5 border border-white/5">Hardware / Sensor</div>
          <div className="p-2 rounded-lg bg-[#dc2626]/20 border border-[#dc2626]/40 text-[#f0e6d3]">AI / Edge Model</div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/5">UI / EHR Output</div>
        </div>
      </div>
    )
  },
  {
    id: 'slide-4',
    num: '04',
    label: '03 / OUTCOME',
    tag: 'SLIDE 4 • CLINICAL IMPACT & FEASIBILITY',
    title: '03 / CLINICAL OUTCOME & SYNERGY',
    subtitle: 'Bedside feasibility, validation metrics & implementation roadmap',
    badge: 'CLINICAL IMPACT',
    accentColor: '#10b981',
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-xs font-mono text-emerald-400 block mb-1">● Bedside Feasibility</span>
          <p className="text-xs text-[#a8a29e] leading-relaxed m-0">
            Ease of deployment in hospital wards, diagnostic accuracy benchmarks, and safety compliance considerations.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-xs font-mono text-emerald-400 block mb-1">● Cross-Disciplinary Synergy</span>
          <p className="text-xs text-[#a8a29e] leading-relaxed m-0">
            How medical observations directly shaped engineering design choices and model training parameters.
          </p>
        </div>
      </div>
    )
  }
]

const EVALUATION_PILLARS = [
  {
    title: 'Clinical Impact',
    jp: '臨床的意義',
    desc: 'Unmet healthcare need, patient outcomes, and direct hospital workflow viability.',
    icon: (
      <svg className="w-5 h-5 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Technical Innovation',
    jp: '技術革新',
    desc: 'Algorithmic novelty, hardware/software architecture, and clinical data interoperability.',
    icon: (
      <svg className="w-5 h-5 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Cross-Disciplinary Synergy',
    jp: '学際連携',
    desc: 'Seamless co-creation between medical insight and engineering execution.',
    icon: (
      <svg className="w-5 h-5 text-[#f0e6d3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
]

const SUBMISSION_STEPS = [
  { step: '01', title: 'Download Deck', desc: 'Get the official 16:9 standardized submission template.' },
  { step: '02', title: 'Formulate Abstract', desc: 'Craft clinical problem & technical solution with your team.' },
  { step: '03', title: 'Submit for Jury', desc: 'Submit PPTX/PDF under the MEDAITHON naming format.' },
]

const TemplateSection = () => {
  const [copied, setCopied] = useState(false)
  const [activeSlideTab, setActiveSlideTab] = useState(0)
  const templateFileUrl = '/ppt_template/MEDAITHON_Team_Template-2.pptx'
  const namingConvention = 'MEDAITHON26_TeamName_TrackNumber.pptx'

  useGSAP(() => {
    gsap.from('.template-reveal', {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#template',
        start: 'top 75%',
      },
    })
  })

  const copyNaming = () => {
    navigator.clipboard?.writeText(namingConvention)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const currentSlide = SLIDE_PREVIEWS[activeSlideTab]

  return (
    <section id="template" className="relative bg-[#0a0a0f] py-28 md:py-36 overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#dc2626]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#f59e0b]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Kanji Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] md:text-[30rem] font-bold text-white/[0.015] pointer-events-none select-none">
        提案
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto template-reveal">
          <p className="text-[#f59e0b] font-['Inter'] tracking-[0.25em] mb-3 text-xs md:text-sm uppercase font-semibold">
            要約提出 • Abstract Submission
          </p>
          <h2 className="text-[#f0e6d3] font-['Bebas_Neue'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider leading-none m-0">
            SOLUTION PPT TEMPLATE
          </h2>
          <p className="text-[#a8a29e] font-['Inter'] text-base md:text-lg mt-5 leading-relaxed">
            Every breakthrough begins with clarity. Download the official standardized presentation template to articulate your healthcare innovation for jury evaluation.
          </p>
        </div>

        {/* New PPT Template v2 Announcement Banner */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#f59e0b]/20 via-[#11111a] to-[#dc2626]/20 border border-[#f59e0b]/50 p-4 sm:p-5 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(245,158,11,0.2)] template-reveal">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/60 text-[#f59e0b] text-xl flex items-center justify-center shrink-0">
              📢
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[10px] font-bold text-[#0a0a0f] bg-[#f59e0b] px-2 py-0.5 rounded font-['Bebas_Neue'] tracking-wider uppercase">
                  NEW PPT TEMPLATE RELEASED
                </span>
                <span className="text-xs text-[#f59e0b] font-mono font-semibold">v2.0</span>
              </div>
              <p className="text-xs sm:text-sm text-[#f0e6d3] font-['Inter'] m-0">
                The official <strong className="text-white">MEDAITHON '26 Solution Abstract Template v2.0</strong> (<code className="text-[#f59e0b] bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs">MEDAITHON_Team_Template-2.pptx</code>) is now introduced. All teams must prepare their abstract using v2.0.
              </p>
            </div>
          </div>
          <a
            href={templateFileUrl}
            download="MEDAITHON_Team_Template-2.pptx"
            className="shrink-0 inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0a0a0f] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Template v2.0</span>
          </a>
        </div>

        {/* Mandatory Team Requirement Banner */}
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-[#dc2626]/20 via-[#0a0a0f] to-[#f59e0b]/20 border border-[#f59e0b]/40 p-4 sm:p-5 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(245,158,11,0.15)] template-reveal">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/50 text-[#f59e0b] text-xl flex items-center justify-center shrink-0">
              ⚖️
            </div>
            <div>
              <span className="text-xs font-bold text-[#f59e0b] uppercase font-['Bebas_Neue'] tracking-widest block">
                MANDATORY TEAM COMPOSITION RULE
              </span>
              <p className="text-xs text-[#f0e6d3] font-['Inter'] m-0 mt-0.5">
                Each team MUST comprise at least <strong className="text-white">1 Female Member</strong> across the team roster.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono text-[#f59e0b]">
            <span>1 FEMALE MEMBER</span>
            <span className="text-emerald-400">✓ MANDATORY</span>
          </div>
        </div>

        {/* Main Showcase: Two-column Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Multi-Slide Deck Explorer (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between template-reveal">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#1a1a2e]/90 to-[#0d0d14] border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between h-full overflow-hidden group">
              
              {/* Top ambient highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dc2626] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Dossier Mockup Window Controls & Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#dc2626]/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-3 text-xs font-mono text-[#a8a29e] tracking-wider uppercase truncate max-w-[200px] sm:max-w-none">
                      MEDAITHON_Official_Deck.pptx
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/30 px-3 py-1 rounded-full shrink-0">
                    16:9 Widescreen
                  </span>
                </div>

                {/* Interactive Slide Selector Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-4">
                  {SLIDE_PREVIEWS.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setActiveSlideTab(idx)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer ${
                        activeSlideTab === idx
                          ? 'bg-[#f59e0b] text-[#0a0a0f] font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-[1.02]'
                          : 'bg-white/5 hover:bg-white/10 text-[#a8a29e] border border-white/10'
                      }`}
                    >
                      <span className={activeSlideTab === idx ? 'text-[#0a0a0f]' : 'text-[#f59e0b]'}>
                        {slide.num}
                      </span>
                      <span>{slide.label}</span>
                    </button>
                  ))}
                </div>

                {/* Live 16:9 Slide Canvas Preview */}
                <div className="relative rounded-2xl bg-[#0a0a0f]/95 border border-white/15 p-5 md:p-7 overflow-hidden min-h-[280px] flex flex-col justify-between transition-all duration-300">
                  {/* Subtle Grid overlay */}
                  <div 
                    className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                    style={{ 
                      backgroundImage: 'radial-gradient(circle, #f0e6d3 1px, transparent 1px)', 
                      backgroundSize: '24px 24px' 
                    }} 
                  />

                  {/* Mockup Slide Header */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#dc2626] tracking-widest uppercase mb-1">
                        <span>● {currentSlide.tag}</span>
                      </div>
                      <h3 className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[#f0e6d3] tracking-wide m-0">
                        {currentSlide.title}
                      </h3>
                      <p className="text-xs text-[#a8a29e] font-['Inter'] mt-1">
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#dc2626]/30 to-[#f59e0b]/20 border border-white/10 flex items-center justify-center text-lg shrink-0">
                      🐉
                    </div>
                  </div>

                  {/* Mockup Slide Content Body */}
                  <div className="relative z-10 my-4">
                    {currentSlide.content}
                  </div>

                  {/* Mockup Slide Footer */}
                  <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-[#a8a29e] font-mono">
                    <span className="truncate">SRM TRP & SRM MEDICAL COLLEGE</span>
                    <span className="text-[#f59e0b] shrink-0 font-semibold">{currentSlide.badge}</span>
                  </div>
                </div>
              </div>

              {/* Steps Progress Ribbon */}
              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SUBMISSION_STEPS.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#dc2626]/20 border border-[#dc2626]/40 text-[#f59e0b] font-mono text-xs flex items-center justify-center font-bold shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[#f0e6d3] m-0">{s.title}</p>
                      <p className="text-[11px] text-[#a8a29e] m-0 leading-tight">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Download Actions & Guidelines (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 template-reveal">
            
            {/* Primary Download Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#0d0d14] to-[#0a0a0f] border border-[#f59e0b]/30 p-7 md:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col justify-between">
              
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#f59e0b]/15 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#dc2626]/20 border border-[#dc2626]/40 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#f59e0b]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-1.5V9a3 3 0 00-3-3h-9A3 3 0 003 9v9a3 3 0 003 3h13.5zm-13.5-3a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5h9A1.5 1.5 0 0118 9v7.5a1.5 1.5 0 01-1.5 1.5H6z" />
                    </svg>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#a8a29e] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    Official PPTX • 3.4 MB
                  </span>
                </div>

                <h3 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#f0e6d3] tracking-wide m-0">
                  GET THE PRESENTATION DECK
                </h3>
                <p className="text-sm text-[#a8a29e] font-['Inter'] mt-3 leading-relaxed">
                  Pre-configured with official hackathon branding, typography, clinical evaluation prompts, and structure. Simply plug in your research and pitch.
                </p>

                {/* Naming Convention Interactive Pill */}
                <div className="mt-5 p-3.5 rounded-2xl bg-[#0a0a0f] border border-white/10 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="text-[10px] text-[#a8a29e] block font-mono uppercase tracking-wider">Required Naming Format</span>
                    <span className="font-mono text-xs text-[#f59e0b] truncate block select-all">
                      {namingConvention}
                    </span>
                  </div>
                  <button
                    onClick={copyNaming}
                    className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#f59e0b] hover:text-[#0a0a0f] text-[#f0e6d3] transition-all duration-200 font-mono flex items-center gap-1.5 cursor-pointer"
                    title="Copy filename format"
                  >
                    {copied ? (
                      <>
                        <span className="text-emerald-400">✓</span>
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={templateFileUrl}
                  download="MEDAITHON_Team_Template-2.pptx"
                  className="w-full text-center inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#ef4444] hover:to-[#dc2626] text-white py-4 px-6 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm font-['Inter'] shadow-[0_4px_25px_rgba(220,38,38,0.5)] hover:shadow-[0_4px_35px_rgba(220,38,38,0.8)] transition-all duration-300 hover:scale-[1.02] active:scale-95 group cursor-pointer"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Solution Template v2.0 (.PPTX)</span>
                </a>

                <a
                  href="/MED_AI_THON_2026_Rulebook.pdf"
                  download
                  className="w-full text-center inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#f59e0b] text-[#f0e6d3] hover:text-[#f59e0b] py-3 px-6 rounded-full font-bold uppercase tracking-widest text-xs font-['Inter'] transition-all duration-300 hover:bg-white/5 active:scale-95 cursor-pointer"
                >
                  <span>View Full Rulebook (.PDF) →</span>
                </a>
              </div>
            </div>

            {/* Evaluation Criteria Cards */}
            <div className="rounded-3xl bg-[#1a1a2e]/60 border border-white/10 p-6 md:p-7 backdrop-blur-xl">
              <h4 className="font-['Bebas_Neue'] text-xl text-[#f0e6d3] tracking-wide uppercase mb-4 flex items-center gap-2">
                <span>⚖️</span>
                <span>Jury Assessment Criteria</span>
              </h4>
              <div className="space-y-3.5">
                {EVALUATION_PILLARS.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 mt-0.5">
                      {pillar.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#f0e6d3] uppercase tracking-wide">
                          {pillar.title}
                        </span>
                        <span className="text-[10px] text-[#f59e0b] font-mono">
                          {pillar.jp}
                        </span>
                      </div>
                      <p className="text-xs text-[#a8a29e] mt-0.5 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default TemplateSection

