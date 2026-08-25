import React from 'react';
import {
  Calculator,
  FolderHeart,
  FileCheck2,
  Sparkles,
  ShieldCheck,
  Crown,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { PlanType } from '../types';

interface NavbarProps {
  activeTab: 'simulador' | 'projetos' | 'proposta' | 'planos' | 'depoimentos';
  setActiveTab: (tab: 'simulador' | 'projetos' | 'proposta' | 'planos' | 'depoimentos') => void;
  savedCount: number;
  plan: PlanType;
  setPlan: (plan: PlanType) => void;
  onOpenConsultant: () => void;
  onNewEstimate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  plan,
  setPlan,
  onOpenConsultant,
  onNewEstimate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => setActiveTab('simulador')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 font-['Outfit',sans-serif]">
                  Reforma <span className="text-orange-600">360</span>
                </span>
                {plan === 'profissional' && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    PRO+
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none hidden sm:block">
                Estimativa & Planejamento Inteligente
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-tab-simulador"
              onClick={() => setActiveTab('simulador')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'simulador'
                  ? 'bg-orange-50 text-orange-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Simulador
            </button>

            <button
              id="nav-tab-projetos"
              onClick={() => setActiveTab('projetos')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'projetos'
                  ? 'bg-orange-50 text-orange-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FolderHeart className="w-4 h-4" />
              Meus Projetos
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs bg-orange-600 text-white font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-proposta"
              onClick={() => setActiveTab('proposta')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'proposta'
                  ? 'bg-orange-50 text-orange-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-amber-600" />
              Gerador de Propostas
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                PRO
              </span>
            </button>

            <button
              id="nav-tab-depoimentos"
              onClick={() => setActiveTab('depoimentos')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'depoimentos'
                  ? 'bg-orange-50 text-orange-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Avaliações & Garantia
            </button>

            <button
              id="nav-tab-planos"
              onClick={() => setActiveTab('planos')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'planos'
                  ? 'bg-orange-50 text-orange-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-500" />
              Planos
            </button>
          </nav>

          {/* Action Buttons & Plan Switcher */}
          <div className="flex items-center gap-2.5">
            <button
              id="nav-consultant-btn"
              onClick={onOpenConsultant}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
              title="Pergunte ao Engenheiro IA"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              Consultor IA
            </button>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                id="toggle-plan-essencial"
                onClick={() => setPlan('essencial')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  plan === 'essencial'
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Essencial
              </button>
              <button
                id="toggle-plan-pro"
                onClick={() => setPlan('profissional')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  plan === 'profissional'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Crown className="w-3 h-3" />
                PRO+
              </button>
            </div>

            <button
              id="nav-cta-calculate"
              onClick={() => {
                setActiveTab('simulador');
                onNewEstimate();
              }}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-sm shadow-orange-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Calcular Minha Reforma</span>
              <span className="sm:hidden">Calcular</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="flex md:hidden border-t border-slate-200 bg-white overflow-x-auto px-2 py-1.5 gap-1">
        <button
          onClick={() => setActiveTab('simulador')}
          className={`flex-1 min-w-[75px] py-1.5 text-center text-xs font-semibold rounded-lg ${
            activeTab === 'simulador' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-600'
          }`}
        >
          Simulador
        </button>
        <button
          onClick={() => setActiveTab('projetos')}
          className={`flex-1 min-w-[85px] py-1.5 text-center text-xs font-semibold rounded-lg ${
            activeTab === 'projetos' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-600'
          }`}
        >
          Projetos ({savedCount})
        </button>
        <button
          onClick={() => setActiveTab('proposta')}
          className={`flex-1 min-w-[90px] py-1.5 text-center text-xs font-semibold rounded-lg ${
            activeTab === 'proposta' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-600'
          }`}
        >
          Propostas PRO
        </button>
        <button
          onClick={() => setActiveTab('planos')}
          className={`flex-1 min-w-[65px] py-1.5 text-center text-xs font-semibold rounded-lg ${
            activeTab === 'planos' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-600'
          }`}
        >
          Planos
        </button>
        <button
          onClick={() => setActiveTab('depoimentos')}
          className={`flex-1 min-w-[75px] py-1.5 text-center text-xs font-semibold rounded-lg ${
            activeTab === 'depoimentos' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-600'
          }`}
        >
          Garantia
        </button>
      </div>
    </header>
  );
};
