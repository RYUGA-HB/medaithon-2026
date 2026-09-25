import React, { useState, useEffect } from 'react';
import { EVENT_DATE } from '../constants';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isAwake, setIsAwake] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = EVENT_DATE.getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsAwake(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isAwake) {
    return (
      <div className="text-center font-['Bebas_Neue'] text-4xl sm:text-6xl text-[#f59e0b] border-2 border-[#dc2626] p-6 rounded-2xl bg-[#1a1a2e]/90 shadow-[0_0_30px_rgba(220,38,38,0.6)] backdrop-blur-xl">
        THE DRAGON HAS AWAKENED 🐉
      </div>
    );
  }

  const TimeCard = ({ value, label }) => (
    <div className="col-center bg-gradient-to-b from-[#1a1a2e]/90 to-[#0a0a0f]/90 border border-[#f59e0b]/30 rounded-2xl p-2.5 sm:p-4 min-w-[66px] sm:min-w-[100px] shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform hover:scale-105 group relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent opacity-80" />
      <span className="font-['Bebas_Neue'] text-3xl sm:text-5xl text-[#f59e0b] leading-none drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="font-['Inter'] text-[9px] sm:text-xs text-[#a8a29e] mt-1 font-bold tracking-widest uppercase">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-2 sm:gap-4 justify-center items-center">
      <TimeCard value={timeLeft.days} label="DAYS" />
      <span className="text-[#f59e0b] font-bold text-xl sm:text-3xl opacity-70 animate-pulse -mt-2">:</span>
      <TimeCard value={timeLeft.hours} label="HOURS" />
      <span className="text-[#f59e0b] font-bold text-xl sm:text-3xl opacity-70 animate-pulse -mt-2">:</span>
      <TimeCard value={timeLeft.minutes} label="MINS" />
      <span className="text-[#f59e0b] font-bold text-xl sm:text-3xl opacity-70 animate-pulse -mt-2">:</span>
      <TimeCard value={timeLeft.seconds} label="SECS" />
    </div>
  );
};

export default CountdownTimer;
