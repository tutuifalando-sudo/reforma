import React, { useState, useEffect } from 'react';
import { UrgencyTimerBanner } from './components/UrgencyTimerBanner';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { WhatYouWillReceive } from './components/WhatYouWillReceive';
import { AppInsideGallery } from './components/AppInsideGallery';
import { EstimateResults } from './components/EstimateResults';
import { SavedProjects } from './components/SavedProjects';
import { PricingPlans } from './components/PricingPlans';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { PlanType, ProjectEstimate } from './types';
import { calculateProjectEstimate } from './data/costEngine';

export default function App() {
  const [plan, setPlan] = useState<PlanType>('essencial');
  const [currentEstimate, setCurrentEstimate] = useState<ProjectEstimate | null>(null);
  const [savedProjects, setSavedProjects] = useState<ProjectEstimate[]>([]);

  // Load saved projects & plan from localStorage on mount
  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('reforma360_saved_projects');
      if (storedProjects) {
        setSavedProjects(JSON.parse(storedProjects));
      } else {
        // Pre-seed an initial sample project so "Meus Projetos" is never barren
        const sample = calculateProjectEstimate({
          projectName: 'Reforma Cozinha Gourmet Integrada',
          roomType: 'cozinha',
          areaM2: 14,
          style: 'moderno',
          scope: 'medio',
          userBudget: 30000,
          region: 'sudeste',
        });
        setSavedProjects([sample]);
      }

      const storedPlan = localStorage.getItem('reforma360_plan');
      if (storedPlan === 'profissional' || storedPlan === 'essencial') {
        setPlan(storedPlan as PlanType);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveProject = (estimate: ProjectEstimate) => {
    const exists = savedProjects.some((p) => p.id === estimate.id);
    let updated: ProjectEstimate[];
    if (exists) {
      updated = savedProjects.map((p) => (p.id === estimate.id ? estimate : p));
    } else {
      updated = [estimate, ...savedProjects];
    }
    setSavedProjects(updated);
    try {
      localStorage.setItem('reforma360_saved_projects', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleDeleteProject = (id: string) => {
    const updated = savedProjects.filter((p) => p.id !== id);
    setSavedProjects(updated);
    try {
      localStorage.setItem('reforma360_saved_projects', JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (currentEstimate?.id === id) {
      setCurrentEstimate(null);
    }
  };

  const handleSelectPlan = (newPlan: PlanType) => {
    setPlan(newPlan);
    try {
      localStorage.setItem('reforma360_plan', newPlan);
    } catch {
      // ignore
    }
  };

  const scrollToPlans = () => {
    const el = document.getElementById('planos-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartCalculation = () => {
    scrollToPlans();
  };

  const handleSelectSavedProject = (project: ProjectEstimate) => {
    setCurrentEstimate(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateProposalForEstimate = (estimate: ProjectEstimate) => {
    setCurrentEstimate(estimate);
    const el = document.getElementById('proposta-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isCurrentSaved = currentEstimate
    ? savedProjects.some((p) => p.id === currentEstimate.id)
    : false;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Urgency Timer Banner */}
      <UrgencyTimerBanner
        onCtaClick={scrollToPlans}
        ctaText="Garantir 70% OFF"
      />

      {/* Main Content Area - Unified Single Page */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="space-y-8 sm:space-y-10">
          {!currentEstimate ? (
            <>
              {/* Visual Hero and Presentation */}
              <HeroSection
                onStartCalculation={handleStartCalculation}
                onExplorePlans={scrollToPlans}
              />

              {/* A Verdade Sobre Reformar Sem Planejamento */}
              <ProblemSection />

              {/* 1. O que você vai receber? */}
              <div id="o-que-voce-vai-receber-section">
                <WhatYouWillReceive onStartCalculation={handleStartCalculation} />
              </div>

              {/* 2. Veja o App por dentro */}
              <AppInsideGallery onGoToPlans={scrollToPlans} />

              {/* Pricing Plans Section - Directly above Testimonials */}
              <div id="planos-section">
                <PricingPlans
                  currentPlan={plan}
                  onSelectPlan={handleSelectPlan}
                />
              </div>

              {/* Testimonials & Audience Fit - Below Pricing Plans */}
              <TestimonialsSection onStartCalculation={handleStartCalculation} />

              {/* FAQ Section */}
              <FaqSection />
            </>
          ) : (
            /* Detailed Results View */
            <div className="space-y-8 sm:space-y-10">
              <EstimateResults
                estimate={currentEstimate}
                onSaveProject={handleSaveProject}
                isSaved={isCurrentSaved}
                onRecalculate={() => setCurrentEstimate(null)}
                onGenerateProposal={handleGenerateProposalForEstimate}
                plan={plan}
                onOpenPlans={scrollToPlans}
              />

              {/* Saved Projects Bar */}
              <SavedProjects
                projects={savedProjects}
                onSelectProject={handleSelectSavedProject}
                onDeleteProject={handleDeleteProject}
                onNewEstimate={handleStartCalculation}
              />

              {/* Pricing Plans Section */}
              <div id="planos-section">
                <PricingPlans
                  currentPlan={plan}
                  onSelectPlan={handleSelectPlan}
                />
              </div>

              {/* Testimonials */}
              <TestimonialsSection onStartCalculation={handleStartCalculation} />

              {/* FAQ Section */}
              <FaqSection />
            </div>
          )}
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-8 sm:mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black text-sm">
                R
              </div>
              <span className="font-extrabold text-white text-base font-['Outfit',sans-serif]">
                Reforma <span className="text-orange-500">360</span>
              </span>
            </div>

            <p className="text-center sm:text-right text-[11px] text-slate-500">
              Descubra quanto sua reforma pode custar antes de gastar dinheiro.
            </p>
          </div>

          <div className="border-t border-slate-800/80 pt-4 text-[11px] text-slate-500 leading-relaxed">
            <strong>Aviso Legal e Técnico:</strong> As estimativas geradas pelo Reforma 360 são
            paramétricas, calculadas com base em médias de mercado e índices estatísticos da
            construção civil brasileira (SINAPI/CUB). Os valores não constituem orçamento fechado
            de empreitada. Toda reforma residencial deve observar a norma técnica <strong>ABNT NBR 16280</strong> e
            contar com acompanhamento de profissional habilitado (Arquiteto com RRT ou Engenheiro com ART).
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <span>© {new Date().getFullYear()} Reforma 360. Todos os direitos reservados.</span>
            <div className="flex items-center gap-4">
              <a
                href="/api/download-netlify-zip"
                download="reforma360-netlify-dist.zip"
                className="text-orange-400 hover:text-orange-300 font-semibold underline"
              >
                📥 Baixar ZIP para Netlify (Pronto)
              </a>
              <span>•</span>
              <a
                href="/api/download-source-zip"
                download="reforma360-projeto-completo.zip"
                className="text-slate-400 hover:text-slate-300 underline"
              >
                Código Fonte Completo (.zip)
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
