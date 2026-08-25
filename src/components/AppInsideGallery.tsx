import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface AppInsideGalleryProps {
  onGoToPlans?: () => void;
}

export const AppInsideGallery: React.FC<AppInsideGalleryProps> = ({ onGoToPlans }) => {
  const screenshots = [
    {
      num: '01',
      src: 'https://i.postimg.cc/W18WqWrx/Gemini-Generated-Image-qomyw7qomyw7qomy.jpg',
      alt: 'Tela 1 do App - Escolha o que você quer reformar',
      title: 'Sem planilha, sem termo técnico',
      paragraphs: [
        'Sem planilha, sem termo técnico — só escolher o que você quer reformar.',
      ],
    },
    {
      num: '02',
      src: 'https://i.postimg.cc/fThB2nf9/Gemini-Generated-Image-qomyw7qomyw7qomy-(1).jpg',
      alt: 'Tela 2 do App - Informe os detalhes do seu ambiente',
      title: 'Informe os detalhes do seu ambiente',
      paragraphs: [
        'Conte o tamanho, estilo e orçamento da sua reforma.',
        'A inteligência do aplicativo organiza as informações para criar uma simulação personalizada.',
      ],
    },
    {
      num: '03',
      src: 'https://i.postimg.cc/yYzvQ4yw/Gemini-Generated-Image-qomyw7qomyw7qomy-(2).jpg',
      alt: 'Tela 3 do App - Receba um planejamento completo',
      title: 'Receba um planejamento completo da sua reforma',
      paragraphs: [
        'Tenha uma visão clara dos custos, materiais e etapas antes de começar sua obra.',
        'Mais segurança para decidir. Menos surpresas durante o caminho.',
      ],
    },
  ];

  const handleScrollToPlans = () => {
    if (onGoToPlans) {
      onGoToPlans();
    } else {
      const el = document.getElementById('planos-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="veja-o-app-por-dentro-section" className="py-8 sm:py-10 relative">
      {/* Background ambient lighting aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-400/15 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-amber-400/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Container global com borda elegante */}
        <div className="rounded-[32px] sm:rounded-[36px] p-4 sm:p-7 bg-white/80 backdrop-blur-xs border border-orange-200/90 shadow-[0_10px_35px_-10px_rgba(249,115,22,0.12),0_4px_15px_rgba(0,0,0,0.03)]">
          
          {/* Título Principal com destaque */}
          <div className="text-center mb-5 sm:mb-6">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 font-['Outfit',sans-serif] tracking-tight">
              Conheça as ferramentas que irão <span className="text-orange-600">facilitar a reforma</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-2.5" />
          </div>

          {/* Faixa Promessa de Abertura (Mapeada para ANTES dos cards) */}
          <div className="mb-7 sm:mb-9">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 p-5 sm:p-6 text-white shadow-[0_12px_30px_-8px_rgba(249,115,22,0.35)] border border-orange-300/40 text-center">
              {/* Brilhos decorativos sutis */}
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -left-8 -bottom-8 w-28 h-28 bg-amber-200/25 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider mb-2.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
                  <span>Passo a Passo Simples</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] tracking-tight text-white leading-tight drop-shadow-xs max-w-xl">
                  Em apenas <span className="underline decoration-amber-300 decoration-4 underline-offset-4">3 passos</span> você já se vê de <span className="text-amber-100">casa nova</span>
                </h3>

                <p className="text-xs sm:text-sm text-orange-50 font-medium mt-2 max-w-md leading-relaxed opacity-95">
                  Planejamento visual, estimativa de custos e lista completa na palma da sua mão.
                </p>
              </div>
            </div>
          </div>

          {/* Imagens em Sequência com descrições e Numeração 01/02/03 em Navy */}
          <div className="flex flex-col gap-6 sm:gap-8 max-w-xl mx-auto">
            {screenshots.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-[28px] p-3 sm:p-4 bg-gradient-to-b from-white via-white to-slate-50 border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(249,115,22,0.12),0_10px_25px_-5px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_-12px_rgba(249,115,22,0.2),0_12px_30px_-5px_rgba(0,0,0,0.12)] hover:border-orange-300/80 transition-all duration-500"
              >
                {/* Moldura da Imagem Real do App */}
                <div className="overflow-hidden rounded-[20px] bg-slate-50 mb-4 sm:mb-5">
                  <img
                    src={item.src}
                    alt={item.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={450}
                  />
                </div>

                {/* Bloco de Texto Descritivo com Badge Numérico Navy (Consistência com seção Recursos) */}
                <div className="px-2 sm:px-3 pb-2 text-center flex flex-col items-center">
                  <div className="mb-2.5">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-slate-950 text-white font-black text-xs sm:text-sm tracking-wider shadow-xs border border-slate-800">
                      PASSO {item.num}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif] tracking-tight mb-2 sm:mb-2.5">
                    {item.title}
                  </h3>
                  <div className="space-y-1.5 sm:space-y-2 max-w-xl mx-auto">
                    {item.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transição para a Seção de Planos / Preço */}
          <div className="mt-9 sm:mt-11 pt-6 sm:pt-8 border-t border-orange-100/90 text-center">
            <div className="rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 text-white p-6 sm:p-7 border border-slate-800 shadow-lg flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Acesso Imediato ao Aplicativo</span>
              </div>
              
              <div className="space-y-1 max-w-lg">
                <h4 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif] text-white">
                  Pronto para ter o controle total da sua obra?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-normal">
                  Escolha o melhor plano e comece seu planejamento detalhado agora mesmo.
                </p>
              </div>

              <button
                type="button"
                onClick={handleScrollToPlans}
                className="cursor-pointer inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-orange-600/30 w-full sm:w-auto"
              >
                <span>Ver Planos e Preços Disponíveis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
