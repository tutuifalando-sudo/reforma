import React, { useState } from 'react';
import {
  FileCheck2,
  Sparkles,
  FileDown,
  User,
  Building,
  DollarSign,
  Calendar,
  CheckCircle2,
  Lock,
  Crown,
  Share2,
} from 'lucide-react';
import { ArchitectProposal, PlanType, ProjectEstimate } from '../types';
import { exportProposalToPdf } from '../utils/pdfExport';

interface ProProposalGeneratorProps {
  plan: PlanType;
  onUpgradePlan: () => void;
  currentEstimate?: ProjectEstimate;
}

export const ProProposalGenerator: React.FC<ProProposalGeneratorProps> = ({
  plan,
  onUpgradePlan,
  currentEstimate,
}) => {
  const [clientName, setClientName] = useState('Mariana Silveira');
  const [clientContact, setClientContact] = useState('(11) 98765-4321');
  const [projectName, setProjectName] = useState(
    currentEstimate?.title || 'Reforma Residencial Contemporânea'
  );
  const [projectLocation, setProjectLocation] = useState('São Paulo, SP');
  const [designerName, setDesignerName] = useState('Arq. Rafael Albuquerque');
  const [designerCompany, setDesignerCompany] = useState('Albuquerque Arquitetura & Interiores');
  const [designerRegistration, setDesignerRegistration] = useState('CAU A123456-7');
  const [professionalFee, setProfessionalFee] = useState<number>(4500);
  const [estimatedLaborAndMaterials, setEstimatedLaborAndMaterials] = useState<number>(
    currentEstimate?.totalAvg || 28500
  );
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState<ArchitectProposal | null>(null);

  const isPro = plan === 'profissional';

  const handleGenerateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPro) {
      onUpgradePlan();
      return;
    }

    setIsGeneratingAi(true);

    const defaultProposal: ArchitectProposal = {
      id: `prop_${Date.now()}`,
      clientName,
      clientContact,
      projectName,
      projectLocation,
      designerName,
      designerCompany,
      designerRegistration,
      roomType: currentEstimate?.roomType || 'cozinha',
      areaM2: currentEstimate?.areaM2 || 12,
      style: currentEstimate?.style || 'moderno',
      scope: currentEstimate?.scope || 'medio',
      professionalFee,
      estimatedLaborAndMaterials,
      totalProjectValue: professionalFee + estimatedLaborAndMaterials,
      estimatedWeeks: 6,
      scopeSummary: `Prestação de serviços de arquitetura, consultoria técnica e gestão de compras para reforma completa do ambiente ${projectName}. O trabalho contempla projeto executivo com detalhamento de pontos de instalações e acompanhamento periódico de execução.`,
      deliverables: [
        'Levantamento métrico cadastral e diagnóstico estrutural',
        'Planta executiva de layout com especificações ergonômicas',
        'Projeto luminotécnico e mapa de pontos de força e tomadas',
        'Paginação completa de pisos, revestimentos e bancadas em pedra',
        'Caderno de compras com quantitativo detalhado e links de fornecedores',
        'Acompanhamento técnico presencial nas fases críticas (Demolição, Impermeabilização e Revestimentos)',
      ],
      paymentMilestones: [
        {
          title: 'Entrada e Início do Projeto Executivo',
          percent: 30,
          amount: Math.round(professionalFee * 0.3),
          timing: 'Na assinatura deste instrumento',
        },
        {
          title: 'Entrega dos Projetos e Início da Obra',
          percent: 40,
          amount: Math.round(professionalFee * 0.4),
          timing: 'Na aprovação do projeto executivo',
        },
        {
          title: 'Vistoria Final e Entrega das Chaves',
          percent: 30,
          amount: Math.round(professionalFee * 0.3),
          timing: 'Na conclusão e entrega da obra',
        },
      ],
      warrantyAndTerms:
        'A proposta tem validade de 30 dias corridos. Os prazos de execução estão condicionados à liberação de acesso pelo condomínio e cumprimento do cronograma de compras pelo contratante. Conformidade plena com a norma ABNT NBR 16280.',
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/gemini/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          projectName,
          roomType: currentEstimate?.roomType || 'cozinha',
          areaM2: currentEstimate?.areaM2 || 12,
          style: currentEstimate?.style || 'moderno',
          scope: currentEstimate?.scope || 'medio',
          designerName,
          designerRole: 'Arquiteto & Consultor',
          professionalFee,
          estimatedMaterialsAndLabor: estimatedLaborAndMaterials,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.proposal) {
          defaultProposal.scopeSummary = data.proposal.scopeSummary;
          defaultProposal.deliverables = data.proposal.deliverables;
          defaultProposal.paymentMilestones = data.proposal.paymentMilestones;
          defaultProposal.warrantyAndTerms = data.proposal.warrantyAndTerms;
        }
      }
    } catch (err) {
      console.warn('AI proposal fallback used', err);
    }

    setGeneratedProposal(defaultProposal);
    setIsGeneratingAi(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 mb-3">
              <Crown className="w-3.5 h-3.5" />
              <span>RECURSO EXCLUSIVO PLANO REFORMA 360+ PRO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-['Outfit',sans-serif] tracking-tight">
              Gerador de Propostas Comerciais para Clientes
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Crie propostas irrecusáveis em PDF para seus clientes com escopo executivo, entregáveis,
              marcos de pagamento e conformidade técnica ABNT.
            </p>
          </div>

          {!isPro && (
            <button
              onClick={onUpgradePlan}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform"
            >
              <Crown className="w-4 h-4" />
              <span>Liberar Propostas PRO (R$ 39,90)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Form + Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm relative">
          {!isPro && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] rounded-3xl z-10 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-base mb-1">
                Disponível no Plano Profissional
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mb-4">
                Desbloqueie o gerador de propostas em PDF, modelos profissionais e recursos avançados para arquitetos.
              </p>
              <button
                onClick={onUpgradePlan}
                className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20"
              >
                Acessar Plano PRO+ (R$ 39,90)
              </button>
            </div>
          )}

          <h3 className="text-lg font-black text-slate-900 font-['Outfit',sans-serif] mb-5">
            Dados da Proposta Comercial
          </h3>

          <form onSubmit={handleGenerateProposal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Telefone / WhatsApp do Cliente
                </label>
                <input
                  type="text"
                  value={clientContact}
                  onChange={(e) => setClientContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Título do Projeto
              </label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Seu Nome Profissional
                </label>
                <input
                  type="text"
                  required
                  value={designerName}
                  onChange={(e) => setDesignerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Seu Registro (CAU / CREA / ABD)
                </label>
                <input
                  type="text"
                  value={designerRegistration}
                  onChange={(e) => setDesignerRegistration(e.target.value)}
                  placeholder="Ex: CAU A123456"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nome do seu Escritório ou Marca
              </label>
              <input
                type="text"
                value={designerCompany}
                onChange={(e) => setDesignerCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Seus Honorários (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    R$
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    required
                    value={professionalFee}
                    onChange={(e) => setProfessionalFee(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Obra Estimada (Mão de Obra + Mat.)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    R$
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    required
                    value={estimatedLaborAndMaterials}
                    onChange={(e) => setEstimatedLaborAndMaterials(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                id="btn-generate-ai-proposal"
                type="submit"
                disabled={isGeneratingAi}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {isGeneratingAi ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Formatando Proposta Executiva com IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>GERAR PROPOSTA PROFISSIONAL</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Proposal Preview */}
        <div className="lg:col-span-6 bg-slate-100 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Visualização do Documento
              </div>
              {generatedProposal && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Pronto para Download
                </span>
              )}
            </div>

            {/* Document Paper Preview Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-300 shadow-md font-sans text-xs text-slate-700 space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                  {designerCompany || 'Escritório de Arquitetura'}
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mt-0.5">{projectName}</h4>
                <div className="text-[11px] text-slate-500">
                  Cliente: <strong className="text-slate-800">{clientName}</strong> • {projectLocation}
                </div>
              </div>

              {generatedProposal ? (
                <>
                  <div>
                    <div className="font-bold text-slate-900 mb-1">1. Escopo do Trabalho:</div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {generatedProposal.scopeSummary}
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-900 mb-1">2. Entregáveis Inclusos:</div>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {generatedProposal.deliverables.slice(0, 4).map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">✔</span>
                          <span>{d}</span>
                        </li>
                      ))}
                      {generatedProposal.deliverables.length > 4 && (
                        <li className="text-slate-400 italic">
                          + {generatedProposal.deliverables.length - 4} outros itens inclusos...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-amber-800 uppercase">
                        Honorários Profissionais
                      </div>
                      <div className="text-base font-black text-amber-950">
                        R$ {generatedProposal.professionalFee.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-slate-500">
                      <div>30% Entrada</div>
                      <div>40% Projeto / 30% Entrega</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs">
                  Preencha o formulário e clique em &quot;Gerar Proposta Profissional&quot; para visualizar e exportar o PDF formal.
                </div>
              )}
            </div>
          </div>

          {generatedProposal && (
            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                id="btn-download-proposal-pdf"
                onClick={() => exportProposalToPdf(generatedProposal)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <FileDown className="w-4 h-4 text-orange-400" />
                <span>Baixar Proposta em PDF Oficial</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
