import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ProblemSectionProps {
  onCtaClick?: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = () => {
  const painPoints = [
    {
      emoji: '📄',
      text: 'Três pedreiros, três orçamentos completamente diferentes — e nenhuma forma de saber qual valor é justo.',
      highlight: false,
    },
    {
      emoji: '📦',
      text: 'Material comprado no chute: sobra o que não devia, falta o que era essencial, e a obra para no meio.',
      highlight: false,
    },
    {
      emoji: '📅',
      text: 'Sem uma ordem clara de etapas, vira retrabalho — o que era pra levar semanas acaba levando meses.',
      highlight: false,
    },
    {
      emoji: '😰',
      text: 'No fim, o valor final te surpreende. E raramente é uma surpresa boa.',
      highlight: true,
    },
  ];

  return (
    <section 
      id="a-verdade-sobre-reformar"
      className="relative rounded-[32px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-2 border-orange-500/30 shadow-[0_20px_50px_rgba(15,23,42,0.35),0_0_40px_rgba(249,115,22,0.1)] py-10 sm:py-14 px-5 sm:px-10 max-w-4xl mx-auto overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Eyebrow Badge */}
        <div className="flex justify-start mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-extrabold tracking-wide uppercase shadow-inner">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>A VERDADE SOBRE REFORMAR SEM PLANEJAMENTO</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3.5xl lg:text-4xl font-black text-white tracking-tight leading-[1.2] font-['Outfit',sans-serif] mb-4">
          O problema não é a obra.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400">
            É começar sem saber o tamanho dela.
          </span>
        </h2>

        {/* Intro description */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
          Se você já pediu orçamento pra reformar alguma coisa, provavelmente reconhece pelo menos uma dessas situações:
        </p>

        {/* Pain points list */}
        <div className="space-y-3 mb-8">
          {painPoints.map((item, idx) => (
            <div 
              key={idx} 
              className={`p-4 sm:p-4.5 rounded-2xl flex items-start gap-3.5 sm:gap-4 transition-all duration-200 ${
                item.highlight
                  ? 'bg-gradient-to-r from-yellow-950/40 via-slate-900 to-amber-950/30 border-2 border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.22)]'
                  : 'bg-slate-900/90 border border-slate-800 hover:border-orange-500/40 hover:bg-slate-800/80 shadow-xs'
              }`}
            >
              <span className="text-2xl sm:text-3xl shrink-0 select-none pt-0.5" role="img" aria-label="ícone">
                {item.emoji}
              </span>
              <p className={`text-xs sm:text-sm sm:text-[14.5px] leading-relaxed ${
                item.highlight ? 'text-yellow-100 font-semibold' : 'text-slate-200 font-medium'
              }`}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Callout Box */}
        <div className="bg-gradient-to-r from-orange-950/80 via-slate-900 to-amber-950/70 text-white rounded-2xl p-5 sm:p-6 shadow-lg border border-orange-500/40 mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm sm:text-[15px] leading-relaxed font-medium text-slate-200">
            Nada disso é sobre você &ldquo;não entender de obra&rdquo;. É sobre começar sem ter, na mão,{' '}
            <span className="text-amber-300 font-bold underline decoration-amber-400/50 underline-offset-4">
              uma referência de custo e planejamento antes da primeira martelada.
            </span>
          </p>
        </div>

        {/* Bottom Headline / Punchline */}
        <div className="text-center px-2">
          <p className="text-base sm:text-xl font-bold text-white leading-snug font-['Outfit',sans-serif]">
            É exatamente essa referência que o{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 font-black">
              Reforma 360
            </span>{' '}
            coloca na sua mão — antes de você gastar um real.
          </p>
        </div>
      </div>
    </section>
  );
};
