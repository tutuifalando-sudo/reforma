import React, { useState } from 'react';
import {
  FileDown,
  BookmarkPlus,
  Share2,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Layers,
  HardHat,
  Clock,
  Coins,
  ShieldCheck,
  RotateCcw,
  FileCheck2,
  Check,
  Lightbulb,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';
import { ProjectEstimate, PlanType } from '../types';
import { exportEstimateToPdf } from '../utils/pdfExport';
import { MaterialsList } from './MaterialsList';
import { TimelinePlan } from './TimelinePlan';

interface EstimateResultsProps {
  estimate: ProjectEstimate;
  onSaveProject: (estimate: ProjectEstimate) => void;
  isSaved: boolean;
  onRecalculate: () => void;
  onGenerateProposal: (estimate: ProjectEstimate) => void;
  plan: PlanType;
  onOpenPlans: () => void;
}

export const EstimateResults: React.FC<EstimateResultsProps> = ({
  estimate,
  onSaveProject,
  isSaved,
  onRecalculate,
  onGenerateProposal,
  plan,
  onOpenPlans,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'geral' | 'materiais' | 'etapas'>('geral');
  const [copiedShare, setCopiedShare] = useState(false);
  const [currentEstimate, setCurrentEstimate] = useState<ProjectEstimate>(estimate);

  // Keep synced if parent estimate changes
  React.useEffect(() => {
    setCurrentEstimate(estimate);
  }, [estimate]);

  const handleShare = () => {
    const text = `🏡 *Estimativa Reforma 360*\nProjeto: ${currentEstimate.title}\nAmbiente: ${currentEstimate.roomType} (${currentEstimate.areaM2}m²)\nInvestimento Médio: R$ ${currentEstimate.totalAvg.toLocaleString('pt-BR')}\nFaixa: R$ ${currentEstimate.totalMin.toLocaleString('pt-BR')} a R$ ${currentEstimate.totalMax.toLocaleString('pt-BR')}\nCalcule a sua reforma no Reforma 360!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  const handleUpdateMaterials = (updatedMaterials: typeof currentEstimate.materials) => {
    const updated = { ...currentEstimate, materials: updatedMaterials };
    setCurrentEstimate(updated);
  };

  const handleUpdatePhases = (updatedPhases: typeof currentEstimate.phases) => {
    const updated = { ...currentEstimate, phases: updatedPhases };
    setCurrentEstimate(updated);
  };

  const verdictStyles = {
    confortavel: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badge: 'Orçamento Confortável',
      icon: CheckCircle2,
    },
    dentro: {
      bg: 'bg-blue-50 text-blue-800 border-blue-200',
      badge: 'Dentro da Margem Média',
      icon: CheckCircle2,
    },
    alerta: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      badge: 'Atenção aos Custos',
      icon: AlertTriangle,
    },
    insuficiente: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      badge: 'Abaixo do Custo Real',
      icon: AlertTriangle,
    },
  }[currentEstimate.aiInsights.budgetVerdict || 'dentro'];

  const VerdictIcon = verdictStyles.icon;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-600/90 text-white uppercase tracking-wider">
                  {currentEstimate.roomType}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {currentEstimate.areaM2} m²
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  Estilo: {currentEstimate.style}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  Nível: {currentEstimate.scope}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-['Outfit',sans-serif] tracking-tight">
                {currentEstimate.title}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-recalculate"
                onClick={onRecalculate}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ajustar Dados</span>
              </button>

              <button
                id="btn-save-project"
                onClick={() => onSaveProject(currentEstimate)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20'
                }`}
              >
                {isSaved ? <Check className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
                <span>{isSaved ? 'Projeto Salvo' : 'Salvar Projeto'}</span>
              </button>
            </div>
          </div>

          {/* Big Investment Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
            {/* Medium Average */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">
                Estimativa Média de Investimento
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
                R$ {currentEstimate.totalAvg.toLocaleString('pt-BR')}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Mão de obra, materiais e reserva inclusos
              </div>
            </div>

            {/* Range Min/Max */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Faixa de Variação de Mercado
              </div>
              <div className="text-lg sm:text-xl font-bold text-slate-200 mt-1">
                R$ {currentEstimate.totalMin.toLocaleString('pt-BR')}{' '}
                <span className="text-xs text-slate-400 font-normal">a</span>{' '}
                R$ {currentEstimate.totalMax.toLocaleString('pt-BR')}
              </div>
              <div className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                <span>Custo médio:</span>
                <strong className="text-slate-200">
                  R$ {currentEstimate.costPerM2.toLocaleString('pt-BR')}/m²
                </strong>
              </div>
            </div>

            {/* Budget status */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Seu Orçamento Informado
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-200">
                  {currentEstimate.userBudget > 0
                    ? `R$ ${currentEstimate.userBudget.toLocaleString('pt-BR')}`
                    : 'Não informado'}
                </div>
              </div>
              <div className={`mt-2 px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${verdictStyles.bg}`}>
                <VerdictIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{verdictStyles.badge}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="bg-slate-50 px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
            <button
              id="subtab-geral"
              onClick={() => setActiveSubTab('geral')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'geral'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Visão Geral & Custos</span>
            </button>

            <button
              id="subtab-materiais"
              onClick={() => setActiveSubTab('materiais')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'materiais'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Lista de Materiais ({currentEstimate.materials.length})</span>
            </button>

            <button
              id="subtab-etapas"
              onClick={() => setActiveSubTab('etapas')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'etapas'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>Planejamento & Etapas</span>
            </button>
          </div>

          {/* Quick Export Actions */}
          <div className="flex items-center gap-2">
            <button
              id="btn-export-pdf"
              onClick={() => exportEstimateToPdf(currentEstimate)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <FileDown className="w-4 h-4 text-orange-600" />
              <span>Baixar Relatório PDF</span>
            </button>

            <button
              id="btn-share-whatsapp"
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'Abrindo WhatsApp...' : 'WhatsApp'}</span>
            </button>

            <button
              id="btn-proposal-generator"
              onClick={() => onGenerateProposal(currentEstimate)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm flex items-center gap-1.5 transition-colors"
              title="Gerar proposta comercial para clientes"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Gerar Proposta PRO</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Tab 1: General Overview & Breakdown */}
      {activeSubTab === 'geral' && (
        <div className="space-y-6">
          {/* AI Insights & Verdict Card */}
          <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-sm">
            <div className="flex items-center gap-2.5 text-amber-900 font-extrabold text-base mb-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>Diagnóstico Inteligente do Especialista (Reforma 360 AI)</span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-6 font-medium">
              {currentEstimate.aiInsights.budgetAnalysis}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Where to save */}
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Onde Você Pode Economizar com Segurança:
                </div>
                <ul className="space-y-2">
                  {currentEstimate.aiInsights.whereToSave.map((tip, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-500 font-bold">✔</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Never save here */}
              <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wider mb-2.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Onde Você NUNCA Deve Economizar:
                </div>
                <ul className="space-y-2">
                  {currentEstimate.aiInsights.neverSaveHere.map((tip, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-rose-500 font-bold">⚠</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations footer */}
            <div className="mt-4 pt-4 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>{currentEstimate.aiInsights.timelineSummary}</span>
              </div>

              <div className="text-[11px] text-slate-500">
                Parâmetros calibrados para o mercado brasileiro • Norma ABNT NBR 16280
              </div>
            </div>
          </div>

          {/* Cost Category Breakdown List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  Distribuição Detalhada dos Custos
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Veja exatamente para onde vai cada real investido no seu espaço
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase">Total</span>
                <div className="text-lg font-bold text-slate-900">
                  R$ {currentEstimate.totalAvg.toLocaleString('pt-BR')}
                </div>
              </div>
            </div>

            {/* Progress Stack Bar */}
            <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 mb-6 p-0.5 border border-slate-200">
              {currentEstimate.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  style={{ width: `${item.percentage}%` }}
                  className={`h-full ${item.color.split(' ')[0]} transition-all first:rounded-l-full last:rounded-r-full`}
                  title={`${item.label}: ${item.percentage}%`}
                />
              ))}
            </div>

            {/* Itemized Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentEstimate.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.color.split(' ')[0]}`} />
                        <h4 className="text-sm font-bold text-slate-900">{item.label}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/70 mt-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      {item.percentage}% do total
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      R$ {item.amount.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub Tab 2: Materials List */}
      {activeSubTab === 'materiais' && (
        <MaterialsList
          materials={currentEstimate.materials}
          onUpdateMaterials={handleUpdateMaterials}
          roomArea={currentEstimate.areaM2}
        />
      )}

      {/* Sub Tab 3: Timeline & Phases */}
      {activeSubTab === 'etapas' && (
        <TimelinePlan
          phases={currentEstimate.phases}
          onUpdatePhases={handleUpdatePhases}
        />
      )}
    </div>
  );
};
