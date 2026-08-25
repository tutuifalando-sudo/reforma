import React from 'react';
import {
  HardHat,
  CheckCircle,
  Circle,
  Clock,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';
import { RenovationPhase } from '../types';

interface TimelinePlanProps {
  phases: RenovationPhase[];
  onUpdatePhases: (updated: RenovationPhase[]) => void;
}

export const TimelinePlan: React.FC<TimelinePlanProps> = ({
  phases,
  onUpdatePhases,
}) => {
  const handleToggleChecklist = (phaseId: string, checkId: string) => {
    const updated = phases.map((phase) => {
      if (phase.id === phaseId) {
        const updatedChecklist = phase.checklist.map((item) => {
          if (item.id === checkId) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });

        const allDone = updatedChecklist.every((c) => c.completed);
        const someDone = updatedChecklist.some((c) => c.completed);

        return {
          ...phase,
          checklist: updatedChecklist,
          status: allDone
            ? ('concluido' as const)
            : someDone
            ? ('em_andamento' as const)
            : ('pendente' as const),
        };
      }
      return phase;
    });

    onUpdatePhases(updated);
  };

  const totalWeeks = phases.reduce((acc, p) => acc + p.durationWeeks, 0);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <HardHat className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Planejamento Cronológico da Obra
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Siga a ordem correta para não retrabalhar, não gastar duas vezes e proteger seu dinheiro.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-orange-50 text-orange-800 border border-orange-200 text-xs font-bold">
          <Clock className="w-4 h-4 text-orange-600" />
          <span>Duração Total Estimada: ~{totalWeeks} semanas úteis</span>
        </div>
      </div>

      {/* Safety Notice on Payments */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-amber-950">Regra de Ouro do Pagamento:</strong> Nunca pague adiantado.
          Utilize as porcentagens de marcos sugeridas em cada etapa abaixo para liberar os pagamentos da mão de obra
          somente quando a etapa estiver vistoriada e 100% concluída.
        </div>
      </div>

      {/* Phase Cards Timeline */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 before:hidden sm:before:block">
        {phases.map((phase, idx) => (
          <div
            key={phase.id}
            className="relative bg-slate-50/70 hover:bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 transition-all ml-0 sm:ml-8"
          >
            {/* Step Number Dot for Desktop Timeline */}
            <div className="hidden sm:flex absolute -left-8 top-6 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs items-center justify-center border-2 border-white shadow-sm">
              {idx + 1}
            </div>

            {/* Phase Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-slate-900">{phase.title}</h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  ~{phase.durationWeeks} {phase.durationWeeks === 1 ? 'semana' : 'semanas'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Liberar até {phase.paymentMilestonePercent}% da mão de obra
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">{phase.description}</p>

            {/* Phase Checklists */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 mb-4">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Checklist de Validação desta Etapa:
              </div>

              <div className="space-y-2">
                {phase.checklist.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleToggleChecklist(phase.id, item.id)}
                    className="w-full flex items-start gap-2.5 text-left group cursor-pointer"
                  >
                    <span className="mt-0.5 text-slate-400 group-hover:text-orange-600 shrink-0">
                      {item.completed ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300" />
                      )}
                    </span>
                    <span
                      className={`text-xs ${
                        item.completed ? 'line-through text-slate-400 font-normal' : 'text-slate-800 font-medium'
                      }`}
                    >
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Practical builder tip & warning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                <div className="flex items-center gap-1.5 font-bold text-amber-950 mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  Dica de Obra:
                </div>
                <span>{phase.practicalTip}</span>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-xs text-rose-900">
                <div className="flex items-center gap-1.5 font-bold text-rose-950 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Alerta Importante:
                </div>
                <span>{phase.alertWarning}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
