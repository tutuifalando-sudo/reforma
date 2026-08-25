import React, { useState } from 'react';
import {
  CookingPot,
  ShowerHead,
  Sofa,
  BedDouble,
  Home,
  Flame,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Sliders,
  DollarSign,
  MapPin,
  HelpCircle,
  Paintbrush,
  HardHat,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  BrazilRegion,
  RenovationScope,
  RenovationStyle,
  RoomType,
  ProjectEstimate,
} from '../types';
import {
  calculateProjectEstimate,
  REGION_MULTIPLIERS,
  ROOM_INFO,
  SCOPE_MULTIPLIERS,
  STYLE_MULTIPLIERS,
} from '../data/costEngine';

interface SimulatorFormProps {
  onEstimateGenerated: (estimate: ProjectEstimate) => void;
  initialValues?: Partial<ProjectEstimate>;
}

export const SimulatorForm: React.FC<SimulatorFormProps> = ({
  onEstimateGenerated,
  initialValues,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [roomType, setRoomType] = useState<RoomType>(initialValues?.roomType || 'cozinha');
  const [areaM2, setAreaM2] = useState<number>(initialValues?.areaM2 || ROOM_INFO['cozinha'].defaultArea);
  const [style, setStyle] = useState<RenovationStyle>(initialValues?.style || 'moderno');
  const [scope, setScope] = useState<RenovationScope>(initialValues?.scope || 'medio');
  const [userBudget, setUserBudget] = useState<number>(initialValues?.userBudget || 0);
  const [region, setRegion] = useState<BrazilRegion>(initialValues?.region || 'sudeste');
  const [customWishes, setCustomWishes] = useState<string>('');
  const [projectName, setProjectName] = useState<string>(initialValues?.title || '');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const handleRoomSelect = (type: RoomType) => {
    setRoomType(type);
    // Update default area if not previously customized
    setAreaM2(ROOM_INFO[type].defaultArea);
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    // Initial instant math calculation
    const baseEstimate = calculateProjectEstimate({
      projectName: projectName || `Reforma ${ROOM_INFO[roomType].label} (${areaM2}m²)`,
      roomType,
      areaM2,
      style,
      scope,
      userBudget,
      region,
    });

    // Fire confetti for celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#f59e0b', '#10b981'],
      });
    } catch {
      // ignore
    }

    // Try to enrich with AI if online
    try {
      const res = await fetch('/api/gemini/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType: ROOM_INFO[roomType].label,
          areaM2,
          style: STYLE_MULTIPLIERS[style].label,
          scope: SCOPE_MULTIPLIERS[scope].label,
          userBudget,
          region: REGION_MULTIPLIERS[region].label,
          customWishes,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.aiInsights) {
          baseEstimate.aiInsights = {
            ...baseEstimate.aiInsights,
            ...data.aiInsights,
          };
        }
      }
    } catch (err) {
      console.warn('AI enrichment fallback used', err);
    }

    setIsCalculating(false);
    onEstimateGenerated(baseEstimate);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden max-w-4xl mx-auto my-6">
      {/* Wizard Header Bar */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center text-xs font-bold text-white">
              {step}
            </span>
            <h2 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif]">
              {step === 1 ? 'Passo 1: Escolha seu projeto' : 'Passo 2: Informe os detalhes do ambiente'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {step === 1
              ? 'Selecione qual cômodo ou imóvel você pretende reformar'
              : 'Defina dimensões, padrão de acabamento e orçamento'}
          </p>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              step === 1
                ? 'bg-orange-600 text-white font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            1. Ambiente
          </button>
          <span className="text-slate-600 text-xs">➔</span>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              step === 2
                ? 'bg-orange-600 text-white font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            2. Detalhes & Custo
          </button>
        </div>
      </div>

      {/* Wizard Step 1: Project Selection */}
      {step === 1 && (
        <div className="p-6 sm:p-8">
          <div className="text-center max-w-lg mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              O que você deseja reformar hoje?
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Selecione o espaço principal para calibrarmos a base de custos e materiais.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8">
            {/* Cozinha */}
            <button
              id="room-btn-cozinha"
              type="button"
              onClick={() => handleRoomSelect('cozinha')}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                roomType === 'cozinha'
                  ? 'border-orange-600 bg-orange-50/50 shadow-md shadow-orange-600/10'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {roomType === 'cozinha' && (
                <div className="absolute top-3 right-3 text-orange-600">
                  <CheckCircle2 className="w-5 h-5 fill-orange-600 text-white" />
                </div>
              )}
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                <CookingPot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Cozinha</h4>
                <p className="text-xs text-slate-500 mt-0.5">Bancadas, gás e armários</p>
              </div>
            </button>

            {/* Banheiro */}
            <button
              id="room-btn-banheiro"
              type="button"
              onClick={() => handleRoomSelect('banheiro')}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                roomType === 'banheiro'
                  ? 'border-orange-600 bg-orange-50/50 shadow-md shadow-orange-600/10'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {roomType === 'banheiro' && (
                <div className="absolute top-3 right-3 text-orange-600">
                  <CheckCircle2 className="w-5 h-5 fill-orange-600 text-white" />
                </div>
              )}
              <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-3">
                <ShowerHead className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Banheiro</h4>
                <p className="text-xs text-slate-500 mt-0.5">Impermeabilização e louças</p>
              </div>
            </button>

            {/* Sala */}
            <button
              id="room-btn-sala"
              type="button"
              onClick={() => handleRoomSelect('sala')}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                roomType === 'sala'
                  ? 'border-orange-600 bg-orange-50/50 shadow-md shadow-orange-600/10'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {roomType === 'sala' && (
                <div className="absolute top-3 right-3 text-orange-600">
                  <CheckCircle2 className="w-5 h-5 fill-orange-600 text-white" />
                </div>
              )}
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                <Sofa className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Sala de Estar</h4>
                <p className="text-xs text-slate-500 mt-0.5">Gesso, iluminação e piso</p>
              </div>
            </button>

            {/* Quarto */}
            <button
              id="room-btn-quarto"
              type="button"
              onClick={() => handleRoomSelect('quarto')}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                roomType === 'quarto'
                  ? 'border-orange-600 bg-orange-50/50 shadow-md shadow-orange-600/10'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {roomType === 'quarto' && (
                <div className="absolute top-3 right-3 text-orange-600">
                  <CheckCircle2 className="w-5 h-5 fill-orange-600 text-white" />
                </div>
              )}
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-3">
                <BedDouble className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Quarto / Suíte</h4>
                <p className="text-xs text-slate-500 mt-0.5">Marcenaria e conforto</p>
              </div>
            </button>

            {/* Casa Completa */}
            <button
              id="room-btn-casa-completa"
              type="button"
              onClick={() => handleRoomSelect('casa_completa')}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                roomType === 'casa_completa'
                  ? 'border-orange-600 bg-orange-50/50 shadow-md shadow-orange-600/10'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {roomType === 'casa_completa' && (
                <div className="absolute top-3 right-3 text-orange-600">
                  <CheckCircle2 className="w-5 h-5 fill-orange-600 text-white" />
                </div>
              )}
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Casa Completa</h4>
                <p className="text-xs text-slate-500 mt-0.5">Reforma global de imóvel</p>
              </div>
            </button>

            {/* Varanda Gourmet */}
            <button
              id="room-btn-varanda"
              type="button"
              onClick={() => handleRoomSelect('varanda')}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                roomType === 'varanda'
                  ? 'border-orange-600 bg-orange-50/50 shadow-md shadow-orange-600/10'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {roomType === 'varanda' && (
                <div className="absolute top-3 right-3 text-orange-600">
                  <CheckCircle2 className="w-5 h-5 fill-orange-600 text-white" />
                </div>
              )}
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Área Gourmet</h4>
                <p className="text-xs text-slate-500 mt-0.5">Churrasqueira e vidro</p>
              </div>
            </button>

            {/* Home Office */}
            <button
              id="room-btn-escritorio"
              type="button"
              onClick={() => handleRoomSelect('escritorio')}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer col-span-2 sm:col-span-1 ${
                roomType === 'escritorio'
                  ? 'border-orange-600 bg-orange-50/50 shadow-md shadow-orange-600/10'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {roomType === 'escritorio' && (
                <div className="absolute top-3 right-3 text-orange-600">
                  <CheckCircle2 className="w-5 h-5 fill-orange-600 text-white" />
                </div>
              )}
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Home Office</h4>
                <p className="text-xs text-slate-500 mt-0.5">Acústica e bancada</p>
              </div>
            </button>
          </div>

          <div className="flex justify-end">
            <button
              id="step1-next-btn"
              type="button"
              onClick={() => setStep(2)}
              className="px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-md shadow-orange-600/20 transition-all hover:scale-[1.01]"
            >
              <span>Avançar para Detalhes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Wizard Step 2: Details & Customization */}
      {step === 2 && (
        <form onSubmit={handleCalculate} className="p-6 sm:p-8">
          <div className="space-y-7">
            {/* Project Name (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Nome do Projeto (Opcional)
              </label>
              <input
                id="input-project-name"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder={`Ex: Reforma do Apartamento dos Sonhos (${ROOM_INFO[roomType].label})`}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* 1. Size in m² */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-orange-600" />
                  Tamanho do Ambiente (Área em m²)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    id="input-area-m2"
                    type="number"
                    min="2"
                    max="500"
                    value={areaM2}
                    onChange={(e) => setAreaM2(Math.max(1, Number(e.target.value)))}
                    className="w-20 px-2.5 py-1 text-center font-extrabold text-slate-900 bg-white border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <span className="text-xs font-bold text-slate-500">m²</span>
                </div>
              </div>

              <input
                id="slider-area-m2"
                type="range"
                min={roomType === 'casa_completa' ? '25' : '3'}
                max={roomType === 'casa_completa' ? '300' : '80'}
                value={areaM2}
                onChange={(e) => setAreaM2(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1.5">
                <span>{roomType === 'casa_completa' ? '25 m²' : '3 m² (Pequeno)'}</span>
                <span>{roomType === 'casa_completa' ? '120 m² (Médio)' : '15 m² (Médio)'}</span>
                <span>{roomType === 'casa_completa' ? '300+ m²' : '80+ m² (Amplo)'}</span>
              </div>
            </div>

            {/* 2. Desired Style */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <Paintbrush className="w-4 h-4 text-orange-600" />
                Estilo & Padrão Desejado
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(STYLE_MULTIPLIERS).map(([key, item]) => {
                  const isSelected = style === key;
                  return (
                    <button
                      key={key}
                      id={`style-btn-${key}`}
                      type="button"
                      onClick={() => setStyle(key as RenovationStyle)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative cursor-pointer ${
                        isSelected
                          ? 'border-orange-600 bg-orange-50/60 shadow-sm ring-1 ring-orange-500'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">{item.label}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Renovation Scope */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <HardHat className="w-4 h-4 text-orange-600" />
                Nível de Intervenção da Obra (Escopo)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(SCOPE_MULTIPLIERS).map(([key, item]) => {
                  const isSelected = scope === key;
                  return (
                    <button
                      key={key}
                      id={`scope-btn-${key}`}
                      type="button"
                      onClick={() => setScope(key as RenovationScope)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-orange-600 bg-orange-50/60 shadow-sm ring-1 ring-orange-500'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm text-slate-900 mb-1">{item.label}</div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. User Budget & Region */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  Seu Orçamento Disponível (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    R$
                  </span>
                  <input
                    id="input-user-budget"
                    type="number"
                    min="0"
                    step="500"
                    value={userBudget || ''}
                    onChange={(e) => setUserBudget(Number(e.target.value))}
                    placeholder="Ex: 25000 (Opcional)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-semibold text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  O app analisa se seu teto de gastos é compatível ou precisa de ajustes.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  Região do Imóvel
                </label>
                <select
                  id="select-region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value as BrazilRegion)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium text-slate-900 bg-white"
                >
                  {Object.entries(REGION_MULTIPLIERS).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Calibra mão de obra e logística conforme tabela regional SINAPI.
                </p>
              </div>
            </div>

            {/* 5. Custom Wishes / Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Desejos Específicos para a IA Considerar (Opcional)
              </label>
              <textarea
                id="input-custom-wishes"
                rows={2}
                value={customWishes}
                onChange={(e) => setCustomWishes(e.target.value)}
                placeholder="Ex: Quero trocar banheira por box até o teto; manter piso da sala mas trocar da cozinha; quero iluminação de LED indireta."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-xs sm:text-sm font-normal text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-8">
            <button
              id="step2-back-btn"
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold text-sm flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>

            <button
              id="submit-estimate-btn"
              type="submit"
              disabled={isCalculating}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-75"
            >
              {isCalculating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Calculando Estimativa com IA...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                  <span>RECEBER MEU PLANEJAMENTO 360</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
