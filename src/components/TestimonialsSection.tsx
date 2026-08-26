import React from 'react';
import {
  Star,
  CheckCircle2,
  XCircle,
  Quote,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Award,
  Calculator,
  Users,
} from 'lucide-react';

interface TestimonialsSectionProps {
  onStartCalculation: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onStartCalculation,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-8">
      {/* Testimonials Block */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Avaliações Reais de Usuários</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif] tracking-tight">
            Veja quem já investiu na Reforma 360
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mariana S. */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-orange-300 transition-colors">
            <div>
              <div className="flex text-amber-400 gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                &ldquo;Finalmente consegui ter uma noção de quanto minha cozinha iria custar antes de começar.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://i.postimg.cc/fWKBbdTv/images-(5).jpg"
                alt="Mariana S."
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                loading="lazy"
                decoding="async"
                width={40}
                height={40}
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Mariana S.</h4>
                <p className="text-xs text-slate-400">Proprietária de Apartamento</p>
              </div>
            </div>
          </div>

          {/* Rafael A. */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-orange-300 transition-colors">
            <div>
              <div className="flex text-amber-400 gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                &ldquo;Uso para organizar minhas primeiras conversas com clientes. Economiza muito tempo.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://i.postimg.cc/SKFWdQxQ/images-(7).jpg"
                alt="Rafael A."
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                loading="lazy"
                decoding="async"
                width={40}
                height={40}
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Rafael A.</h4>
                <p className="text-xs text-slate-400">Arquiteto & Urbanista (CAU)</p>
              </div>
            </div>
          </div>

          {/* Juliana M. */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-orange-300 transition-colors">
            <div>
              <div className="flex text-amber-400 gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                &ldquo;Muito simples de usar. Em poucos minutos consegui montar uma ideia da reforma.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://i.postimg.cc/jSGh1QZD/images-(6).jpg"
                alt="Juliana M."
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                loading="lazy"
                decoding="async"
                width={40}
                height={40}
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Juliana M.</h4>
                <p className="text-xs text-slate-400">Reforma de Sala e Suíte</p>
              </div>
            </div>
          </div>
        </div>

        {/* Faixa de Destaque Ponta a Ponta */}
        <div className="mt-6 w-full bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:py-5 sm:px-8 border border-slate-800 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
            {/* Item 1 */}
            <div className="flex items-center justify-center gap-3.5 pb-3 sm:pb-0 sm:pr-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 shadow-xs">
                <Calculator className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit',sans-serif] tracking-tight leading-none">
                  57.932
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  reformas já calculadas
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-center gap-3.5 pt-3 sm:pt-0 sm:pl-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit',sans-serif] tracking-tight leading-none">
                  70.312
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  usuários ativos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* For Whom It Is & Is NOT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Para quem é */}
        <div className="bg-emerald-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              ✓
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Para quem É o Reforma 360:
            </h3>
          </div>

          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 font-medium">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Pessoas que querem reformar a própria casa</strong> com segurança e previsibilidade
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Quem quer saber custos</strong> antes de contratar profissionais e fechar contratos
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Arquitetos e designers</strong> que querem agilizar propostas iniciais e orçamentos
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Profissionais da construção</strong> que precisam ganhar tempo no dia a dia
              </span>
            </li>
          </ul>
        </div>

        {/* Para quem NÃO é */}
        <div className="bg-rose-50/50 rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
              ✕
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Para quem NÃO é:
            </h3>
          </div>

          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 font-medium">
            <li className="flex items-start gap-2.5">
              <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span>
                <strong>Quem quer começar uma obra sem nenhum planejamento</strong> e correr risco de faltar dinheiro no meio
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span>
                <strong>Quem procura um orçamento exato de construtora</strong> (o app fornece estimativa paramétrica de mercado para tomada de decisão)
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
