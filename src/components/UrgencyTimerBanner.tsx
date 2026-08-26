import React from 'react';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';

interface UrgencyTimerBannerProps {
  onCtaClick?: () => void;
  ctaText?: string;
}

export const UrgencyTimerBanner: React.FC<UrgencyTimerBannerProps> = ({
  onCtaClick,
  ctaText = 'Garantir Desconto',
}) => {
  return (
    <aside
      id="urgency-timer-banner"
      aria-label="Aviso de preço de lançamento"
      className="w-full bg-red-600 text-white sticky top-0 z-50 shadow-sm border-b border-red-700/50"
    >
      <div className="max-w-5xl mx-auto px-3 py-1.5 flex items-center justify-center gap-2 sm:gap-3 text-xs">
        {/* Phrase */}
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-pulse" />
          <span className="font-extrabold tracking-wide text-white text-[11px] sm:text-xs font-['Outfit',sans-serif]">
            Preço de Lançamento, subirá em breve !
          </span>
        </div>

        {/* CTA Button */}
        {onCtaClick && (
          <button
            onClick={onCtaClick}
            className="hidden sm:inline-flex items-center gap-1 ml-2 px-2.5 py-0.5 bg-white/95 hover:bg-white text-red-600 text-[10px] font-black rounded transition-all cursor-pointer shadow-xs"
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

