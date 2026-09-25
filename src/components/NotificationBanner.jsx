import React from 'react'

const NotificationBanner = ({ visible = true, onClose }) => {
  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[10001] bg-[#0a0a0f]/95 backdrop-blur-2xl text-[#f0e6d3] shadow-[0_4px_30px_rgba(245,158,11,0.25)] border-b border-amber-500/30 overflow-hidden transition-all duration-300">
      
      {/* Animated Shimmer Sweep Accent Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-amber-500/15 to-red-600/10 pointer-events-none animate-pulse" />
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto py-1.5 sm:py-2.5 px-3 sm:px-6 relative z-10 flex items-center justify-between gap-2 sm:gap-4 text-xs font-['Inter']">
        
        {/* Banner Announcement Content */}
        <div className="min-w-0 flex-1 flex items-center gap-1.5 sm:gap-3 text-left">
          
          {/* Glowing Status Pulse */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]"></span>
          </span>

          {/* Badge */}
          <span className="bg-gradient-to-r from-[#f59e0b]/25 to-[#dc2626]/25 text-[#f59e0b] border border-[#f59e0b]/60 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold font-['Bebas_Neue'] tracking-wider shrink-0 uppercase shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            NEW V2
          </span>

          {/* Responsive Text Message */}
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[#f0e6d3] text-[11px] sm:text-xs leading-tight truncate sm:whitespace-normal font-medium">
              <span className="sm:hidden text-white font-semibold">PPT Template v2.0 Released!</span>
              <span className="hidden sm:inline">
                <strong className="text-white font-semibold">MEDAITHON '26: </strong>
                Official Solution Abstract Template <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#f59e0b] font-mono text-[10px] sm:text-[11px] border border-amber-500/30">v2.0</code> & Rulebook are live!
              </span>
            </p>
          </div>
        </div>

        {/* Action Buttons & Close */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Download PPT Button */}
          <a
            href="/ppt_template/MEDAITHON_Team_Template-2.pptx"
            download="MEDAITHON_Team_Template-2.pptx"
            className="group relative inline-flex items-center gap-1 bg-gradient-to-r from-[#f59e0b] via-[#eab308] to-[#d97706] hover:from-[#fbbf24] hover:to-[#f59e0b] text-[#0a0a0f] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 sm:px-4 py-1 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_22px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden border border-amber-300/40"
          >
            <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="sm:hidden">Download</span>
            <span className="hidden sm:inline">PPT v2.0</span>
          </a>

          {/* Rulebook Download Link (Desktop) */}
          <a
            href="/MED_AI_THON_2026_Rulebook.pdf"
            download="MED_AI_THON_2026_Rulebook.pdf"
            className="hidden md:inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/15 text-[#f0e6d3] hover:text-white font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider px-3 py-1 rounded-lg border border-white/15 hover:border-amber-400/50 transition-all duration-300 whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 shrink-0 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Rulebook</span>
          </a>

          {/* Dismiss Button */}
          <button
            onClick={onClose}
            aria-label="Close Announcement"
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all duration-300 hover:rotate-90 cursor-pointer"
            title="Close Notification"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}

export default NotificationBanner
