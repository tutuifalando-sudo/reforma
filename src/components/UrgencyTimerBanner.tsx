import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight, Zap } from 'lucide-react';

interface UrgencyTimerBannerProps {
  onCtaClick?: () => void;
  ctaText?: string;
}

export const UrgencyTimerBanner: React.FC<UrgencyTimerBannerProps> = ({
  onCtaClick,
  ctaText = 'Garantir Desconto',
}) => {
  // 15 minutes countdown with persistence
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 14,
    seconds: 59,
  });

  useEffect(() => {
    const STORAGE_KEY = 'reforma360_urgency_timer_target';
    let targetTime: number;

    const storedTarget = localStorage.getItem(STORAGE_KEY);
    if (storedTarget) {
      targetTime = parseInt(storedTarget, 10);
      if (Date.now() > targetTime + 5 * 60 * 1000) {
        targetTime = Date.now() + 15 * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, targetTime.toString());
      }
    } else {
      targetTime = Date.now() + 14 * 60 * 1000 + 59 * 1000;
      localStorage.setItem(STORAGE_KEY, targetTime.toString());
    }

    const updateTimer = () => {
      const difference = targetTime - Date.now();

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <aside
      id="urgency-timer-banner"
      aria-label="Contagem regressiva da oferta"
      className="w-full bg-red-600 text-white sticky top-0 z-50 shadow-sm border-b border-red-700/50"
    >
      <div className="max-w-5xl mx-auto px-3 py-1 sm:py-1.5 flex items-center justify-center gap-2 sm:gap-3 text-xs">
        
        {/* Phrase */}
        <div className="flex items-center gap-1.5">
          <Timer className="w-3.5 h-3.5 text-white shrink-0 animate-pulse" />
          <span className="font-extrabold tracking-wider text-white uppercase text-[11px] sm:text-xs font-['Outfit',sans-serif]">
            A OFERTA EXPIRA EM
          </span>
        </div>

        {/* Compact Digits Display */}
        <div className="flex items-center gap-1 font-mono text-[11px] sm:text-xs">
          {timeLeft.hours > 0 && (
            <>
              <span className="bg-white text-red-600 font-black px-1.5 py-0.2 rounded shadow-xs">
                {formatNumber(timeLeft.hours)}h
              </span>
              <span className="text-white font-bold">:</span>
            </>
          )}

          {/* Minutes */}
          <span className="bg-white text-red-600 font-black px-1.5 py-0.5 rounded shadow-xs leading-none">
            {formatNumber(timeLeft.minutes)}m
          </span>

          <span className="text-white font-bold leading-none">:</span>

          {/* Seconds */}
          <span className="bg-slate-950 text-white font-black px-1.5 py-0.5 rounded shadow-xs leading-none animate-pulse">
            {formatNumber(timeLeft.seconds)}s
          </span>
        </div>

        {/* CTA Button */}
        {onCtaClick && (
          <button
            onClick={onCtaClick}
            className="hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-0.5 bg-white/95 hover:bg-white text-red-600 text-[10px] font-black rounded transition-all cursor-pointer"
          >
            <Zap className="w-2.5 h-2.5 fill-red-600" />
            <span>{ctaText}</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        )}

      </div>
    </aside>
  );
};
