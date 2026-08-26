import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

export const CompactGuaranteeCard: React.FC = () => {
  return (
    <div
      id="hero-guarantee-badge"
      className="max-w-xl mx-auto bg-gradient-to-r from-emerald-50 via-emerald-100/40 to-teal-50 rounded-xl sm:rounded-2xl p-3 sm:py-3 sm:px-5 border border-emerald-300/80 shadow-xs flex items-center gap-3 sm:gap-4 text-left"
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-1.5 py-0.5 rounded">
            Garantia Incondicional
          </span>
          <span className="text-xs sm:text-sm font-bold text-emerald-950 font-['Outfit',sans-serif]">
            Teste por 7 dias sem risco
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-emerald-900/85 mt-0.5 leading-tight font-medium">
          Experimente o Reforma 360. Se não ajudar na sua obra, basta pedir o cancelamento e devolvemos 100% do seu dinheiro.
        </p>
      </div>
    </div>
  );
};
