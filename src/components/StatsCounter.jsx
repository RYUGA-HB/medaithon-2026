import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { stats } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const STAT_ICONS = ['⏱️', '👥', '🏆', '🧪'];

const StatsCounter = ({ className = '' }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const statItems = gsap.utils.toArray('.stat-item');

    statItems.forEach((item, i) => {
      const numEl = item.querySelector('.stat-number');
      const targetVal = parseFloat(stats[i].value);

      let zero = { val: 0 };

      gsap.to(zero, {
        val: targetVal,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
        onUpdate: () => {
          if (numEl) numEl.textContent = Math.round(zero.val);
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`w-full max-w-6xl mx-auto ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="stat-item relative col-center text-center p-6 rounded-2xl bg-gradient-to-b from-[#1a1a2e]/80 to-[#0a0a0f]/90 border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:border-[#f59e0b]/50 group overflow-hidden"
          >
            {/* Ambient accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="text-2xl sm:text-3xl mb-2 opacity-80 group-hover:scale-110 transition-transform">
              {STAT_ICONS[index] || '✨'}
            </span>

            <div className="flex items-baseline justify-center">
              <span className="stat-number font-['Bebas_Neue'] text-4xl sm:text-6xl text-[#f59e0b] drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">0</span>
              <span className="font-['Bebas_Neue'] text-2xl sm:text-4xl text-[#f59e0b] ml-0.5">{stat.suffix}</span>
            </div>
            
            <span className="font-['Inter'] text-xs sm:text-sm text-[#a8a29e] uppercase font-bold tracking-wider mt-2 group-hover:text-[#f0e6d3] transition-colors">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCounter;
