import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface WhatYouWillReceiveProps {
  onStartCalculation: () => void;
}

export const WhatYouWillReceive: React.FC<WhatYouWillReceiveProps> = ({
  onStartCalculation,
}) => {
  const cards = [
    {
      id: 1,
      num: '01',
      image: 'https://i.postimg.cc/qMx68cC8/planejamento-e-orcamento-de-reforma-residencial-1170x653.jpg',
      alt: 'Estimativa da Reforma 360',
      badge: 'CÁLCULO INTELIGENTE',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      title: 'Saiba o valor justo antes de fechar com o pedreiro',
      description:
        'Descubra a previsão de investimento por m² da sua reforma antes de quebrar a primeira parede — e entre em qualquer negociação sabendo se o valor cobrado faz sentido.',
      highlights: [
        'Cálculo de mão de obra e insumos',
        'Previsão de teto orçamentário',
        'Exportação de relatório em PDF',
      ],
    },
    {
      id: 2,
      num: '02',
      image: 'https://i.postimg.cc/MpXZv17s/planta-plantas-coloridas-catalogo-guia-paleta-de-cores-com-amostras-pisos-madeira-e-material-mobilia.webp',
      alt: 'Lista de Materiais e Insumos',
      badge: 'ECONOMIA REAL',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      title: 'Nunca mais se preocupe com a quantidade de materiais',
      description:
        'Quantitativo estimado de pisos, argamassa, tintas e acabamentos com margem de segurança — pra obra não parar por falta de material nem seu dinheiro sobrar em compra errada.',
      highlights: [
        'Lista discriminada por cômodo',
        'Margem de segurança calculada',
        'Cotação rápida em lojas',
      ],
    },
    {
      id: 3,
      num: '03',
      image: 'https://i.postimg.cc/05cqDbyM/dwg-modelo-canteiro-alojamento-obra.png',
      alt: 'Planejamento e Cronograma por Etapas',
      badge: 'OBRA ORGANIZADA',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      title: 'Uma ordem clara pra obra não virar bagunça',
      description:
        'Cronograma estruturado na ordem ideal — demolição, hidráulica, elétrica até a pintura final — pra você (ou o profissional) nunca perder tempo com retrabalho.',
      highlights: [
        'Ordem cronológica sem retrabalho',
        'Tempo estimado por fase',
        'Checklist de fiscalização',
      ],
    },
    {
      id: 4,
      num: '04',
      image: 'https://i.postimg.cc/VvHTT0JG/Design-de-interiores-sala-de-estar-e-jantar-Projeto-e-Maquete-eletronica-3D-Belo-Horizonte-BH-Miria.jpg',
      alt: 'Ideias para seu Projeto com IA',
      badge: 'IA PERSONALIZADA',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      title: 'Decida com confiança, sem depender só do gosto do pedreiro',
      description:
        'Sugestões inteligentes de paletas, iluminação e acabamentos alinhados ao seu estilo — pra você não terminar a obra e se arrepender do resultado.',
      highlights: [
        'Harmonização de cores e texturas',
        'Dicas práticas de aproveitamento',
        'Conceito visual para o ambiente',
      ],
    },
  ];

  return (
    <section id="o-que-voce-vai-receber-section" className="relative py-8 sm:py-12 overflow-hidden">
      {/* Background Decorativo Suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-orange-50/20 to-slate-50/60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-orange-200/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 text-orange-900 text-xs font-black tracking-wide uppercase mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>RECURSOS DO APLICATIVO</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-black text-slate-950 font-['Outfit',sans-serif] tracking-tight mb-3 leading-tight">
            Tudo que você precisa para sair da dúvida e tomar{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600">
              decisões com confiança
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Sem depender de planilha, sem contar com sorte — só respostas claras sobre a sua reforma
          </p>

          {/* Micro-pills de confiança */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Baseado no seu imóvel
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Sem planilhas complexas
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Resultado em menos de 3 minutos
            </span>
          </div>
        </div>

        {/* 4 Cards Grid com o novo layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-md hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Imagem do Card com cantos arredondados */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-5 border border-slate-100">
                  <img
                    src={card.image}
                    alt={card.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={300}
                  />
                </div>

                {/* Linha de Badges: [01] + [CÁLCULO INTELIGENTE] */}
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-slate-950 text-white font-black text-xs tracking-wider shadow-xs">
                    {card.num}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[11px] font-black tracking-wide uppercase ${card.badgeClass}`}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Título Principal do Card */}
                <h3 className="text-base sm:text-lg font-black text-slate-950 font-['Outfit',sans-serif] mb-2.5 leading-snug group-hover:text-orange-600 transition-colors">
                  {card.title}
                </h3>

                {/* Descrição Detalhada */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* Lista de Vantagens com sinal de '+' */}
                <ul className="space-y-2 pt-3 border-t border-slate-100">
                  {card.highlights.map((item, hIdx) => (
                    <li
                      key={hIdx}
                      className="text-xs text-slate-700 font-medium flex items-start"
                    >
                      <span className="text-orange-600 font-black text-sm leading-none mr-2 shrink-0 select-none">
                        +
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

