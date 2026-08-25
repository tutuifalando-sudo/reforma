import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface HeroSectionProps {
  onStartCalculation: () => void;
  onExplorePlans?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartCalculation,
  onExplorePlans,
}) => {
  return (
    <section className="relative overflow-hidden pt-4 pb-8 sm:pt-6 sm:pb-10 bg-gradient-to-b from-orange-50/70 via-white to-slate-50 border-b border-slate-200">
      {/* Background Subtle Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.12] font-['Outfit',sans-serif] mb-4">
          Antes de chamar o pedreiro,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
            descubra o valor real da sua reforma.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-5">
          Saiba quanto vai gastar antes de fechar com o profissional —{' '}
          <strong className="text-slate-800 font-semibold">mesmo que você não entenda nada de obra</strong>.
        </p>

        {/* App Mockup Showcase */}
        <div className="relative max-w-2xl mx-auto mb-6 px-2">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-orange-950/10 border border-slate-200/80 bg-white group">
            <img
              src="https://i.postimg.cc/HnXPhTNb/Gemini-Generated-Image-5leovq5leovq5leo.jpg"
              alt="Mockup do aplicativo Reforma 360"
              referrerPolicy="no-referrer"
              className="w-full h-auto aspect-video object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={672}
              height={378}
            />
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <button
            id="hero-cta-btn"
            onClick={onStartCalculation}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-orange-600/30 hover:shadow-orange-600/40 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>QUERO CALCULAR MINHA REFORMA</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-plans-btn"
            onClick={onExplorePlans}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 hover:border-slate-400 shadow-sm transition-all"
          >
            Ver Planos e Acesso (R$ 19,90)
          </button>
        </div>

        {/* Trust Points */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 font-medium">
          <span className="flex items-center gap-1.5 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            100% Simples pelo Celular
          </span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Estimativa em Menos de 3 Minutos
          </span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Garantia Incondicional de 7 Dias
          </span>
        </div>
      </div>
    </section>
  );
};
