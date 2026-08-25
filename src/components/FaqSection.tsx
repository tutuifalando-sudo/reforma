import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  highlight?: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Como funciona o Reforma 360?',
    answer:
      'O Reforma 360 é um simulador e estimador paramétrico inteligente. Você informa o tamanho do ambiente (m²), tipo de cômodo, padrão de acabamento e serviços desejados. O sistema calcula instantaneamente a estimativa de custos de materiais, mão de obra, cronograma estimado e lista detalhada de insumos com base em médias atualizadas da construção civil (tabelas SINAPI e mercado real).',
    highlight: 'Cálculos em segundos com precisão paramétrica.',
  },
  {
    id: 'faq-2',
    question: 'Qual a diferença entre o Plano Básico e o Plano Profissional?',
    answer:
      'O Plano Básico (R$ 19,90) inclui simulações ilimitadas, divisão de custos (material vs. mão de obra), lista essencial de materiais e estimativa de cronograma. Já o Plano Profissional (R$ 39,90) adiciona gerador de propostas comerciais em PDF com sua marca/logo, checklist de vistoria e compras, cronograma de etapas por semana, suporte a múltiplos projetos salvos e acesso vitalício com atualizações de preços.',
    highlight: 'O Plano Profissional inclui gerador de propostas com PDF e cronograma completo.',
  },
  {
    id: 'faq-3',
    question: 'Como recebo o acesso após o pagamento?',
    answer:
      'O acesso é imediato e automático! Assim que a sua compra for confirmada no checkout seguro, você recebe a confirmação e pode utilizar todas as ferramentas liberadas diretamente no seu navegador, sem precisar instalar nada.',
    highlight: 'Acesso imediato e 100% online.',
  },
  {
    id: 'faq-4',
    question: 'Os preços dos materiais e mão de obra são confiáveis?',
    answer:
      'Sim. Nossa base utiliza composições paramétricas baseadas em índices de referência da construção civil (SINAPI/IBGE e FGV) combinadas com coletas periódicas do mercado de varejo e mão de obra das principais capitais e regiões brasileiras, com margem de segurança ajustável por padrão de acabamento.',
    highlight: 'Base de dados baseada em referências reais do mercado brasileiro.',
  },
  {
    id: 'faq-5',
    question: 'Posso acessar pelo celular ou computador?',
    answer:
      'Sim! O Reforma 360 foi desenvolvido com tecnologia 100% responsiva (Web App). Você pode acessar do seu smartphone, tablet, notebook ou computador de mesa com a mesma facilidade e velocidade.',
    highlight: 'Compatível com qualquer celular, tablet ou computador.',
  },
  {
    id: 'faq-6',
    question: 'Preciso ter conhecimentos de engenharia ou arquitetura?',
    answer:
      'Não. A plataforma foi criada justamente para simplificar o que antes era complexo. Qualquer proprietário, morador ou profissional autônomo consegue gerar orçamentos claros e fáceis de entender em poucos cliques.',
    highlight: 'Interface intuitiva, pensada para qualquer pessoa.',
  },
  {
    id: 'faq-7',
    question: 'E se eu não gostar? Existe garantia?',
    answer:
      'Sim! Você conta com 7 dias de garantia incondicional. Se por qualquer motivo você achar que o Reforma 360 não atendeu às suas expectativas, basta solicitar o reembolso que devolveremos 100% do seu dinheiro sem burocracia.',
    highlight: 'Garantia total de satisfação de 7 dias.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="max-w-4xl mx-auto py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3 border border-orange-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Tire Suas Dúvidas</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-['Outfit',sans-serif] tracking-tight">
          Perguntas Frequentes
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Tudo o que você precisa saber sobre o Reforma 360 antes de começar.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQ_DATA.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-orange-300 shadow-md shadow-orange-500/5'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <button
                type="button"
                id={`btn-${item.id}`}
                onClick={() => toggleItem(item.id)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-slate-900 text-sm sm:text-base font-['Outfit',sans-serif] pr-2">
                  {item.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-orange-100 text-orange-600 rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 animate-fadeIn">
                  <p>{item.answer}</p>
                  {item.highlight && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-700 bg-orange-50 px-3 py-1 rounded-lg border border-orange-200/60">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-orange-500" />
                      <span>{item.highlight}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Guarantee note */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Ainda com dúvidas? Compra 100% protegida com garantia incondicional de 7 dias.</span>
      </div>
    </section>
  );
};
