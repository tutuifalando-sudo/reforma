import React, { useState } from 'react';
import {
  Check,
  Crown,
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowRight,
  QrCode,
  CreditCard,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlanType } from '../types';

interface PricingPlansProps {
  currentPlan: PlanType;
  onSelectPlan: (plan: PlanType) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({
  currentPlan,
  onSelectPlan,
}) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedCheckoutPlan, setSelectedCheckoutPlan] = useState<PlanType>('profissional');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao'>('pix');
  const [pixCopied, setPixCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartCheckout = (plan: PlanType) => {
    setSelectedCheckoutPlan(plan);
    setShowCheckoutModal(true);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSelectPlan(selectedCheckoutPlan);
      setShowCheckoutModal(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ea580c', '#f59e0b', '#10b981'],
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136reforma360-oficial-pagamento-pix5204000053039865802BR5913REFORMA3606009SAOPAULO62070503***6304ABCD');
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-6">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Acesso Imediato e Vitalício</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit',sans-serif] tracking-tight">
          Escolha onde melhor se encaixa
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Tenha clareza do seu projeto antes de quebrar a primeira parede ou gastar seu dinheiro à toa.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
        {/* 1. Plano Essencial */}
        <div
          className={`bg-white rounded-3xl p-7 sm:p-8 border-2 transition-all flex flex-col justify-between ${
            currentPlan === 'essencial'
              ? 'border-slate-400 ring-2 ring-slate-300 shadow-md'
              : 'border-slate-200 shadow-sm hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Para quem vai reformar
              </span>
              {currentPlan === 'essencial' && (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                  Seu Plano Atual
                </span>
              )}
            </div>

            <h3 className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Plano Básico
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Reforma 360 Essencial</p>

            {/* Price */}
            <div className="my-6">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-slate-400">R$</span>
                <span className="text-4xl sm:text-5xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  19,90
                </span>
                <span className="text-xs text-slate-500 font-medium">/ pagamento único</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">
                ✔ Acesso vitalício sem mensalidades
              </p>
            </div>

            {/* Feature Checklist */}
            <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong>Acesso ao aplicativo</strong> 100% pelo celular ou computador
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong>Simulador de reforma</strong> inteligente com IA
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong>Lista quantificada de materiais</strong> com checklist de compras
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong>Planejamento inicial</strong> com cronograma por etapas
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Exportação de relatórios em PDF para levar às lojas</span>
              </li>
            </ul>
          </div>

          <a
            id="btn-buy-essencial"
            href="https://ggcheckout.app/checkout/v5/G9ffawJa2PKSb63amVfi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
          >
            <span>QUERO O PLANO BÁSICO (R$ 19,90)</span>
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </a>
        </div>

        {/* 2. Plano Profissional ⭐ */}
        <div
          className={`bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30 rounded-3xl p-7 sm:p-8 border-2 transition-all relative flex flex-col justify-between ${
            currentPlan === 'profissional'
              ? 'border-orange-600 ring-2 ring-orange-500 shadow-xl'
              : 'border-amber-400 shadow-lg shadow-amber-500/10 hover:border-orange-500'
          }`}
        >
          {/* Top Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-[11px] shadow-sm flex items-center gap-1 whitespace-nowrap">
            <Crown className="w-3 h-3 text-amber-100" />
            <span>Mais escolhido</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700">
                Arquitetos, Designers e Prestadores
              </span>
              {currentPlan === 'profissional' && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                  Seu Plano Ativo
                </span>
              )}
            </div>

            <h3 className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Plano Profissional
            </h3>
            <p className="text-xs text-orange-600 font-bold mt-0.5">Reforma 360+</p>

            {/* Price */}
            <div className="my-6">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-orange-600">R$</span>
                <span className="text-4xl sm:text-5xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  39,90
                </span>
                <span className="text-xs text-slate-500 font-medium">/ pagamento único</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">
                ✔ Acesso vitalício a todos os recursos atuais e futuros
              </p>
            </div>

            {/* Feature Checklist */}
            <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-800">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong>Tudo do plano essencial incluso</strong>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong>Gerador de propostas comerciais</strong> para seus clientes
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong>Modelos profissionais</strong> com conformidade ABNT NBR 16280
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong>Recursos extras para arquitetos</strong> e designers de interiores
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Propostas em PDF customizadas com seu nome e logotipo</span>
              </li>
            </ul>
          </div>

          <a
            id="btn-buy-pro"
            href="https://ggcheckout.app/checkout/v5/hejG1Xux2XY95mnKeSjW"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 text-center"
          >
            <span>QUERO O PLANO PROFISSIONAL (R$ 39,90)</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>

      {/* 7 Days Guarantee Box */}
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-teal-50 rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-[0_12px_32px_-8px_rgba(16,185,129,0.22)] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500 text-white flex items-center justify-center shrink-0 border-2 border-emerald-400 shadow-md shadow-emerald-500/25">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
            Garantia Incondicional
          </span>
          <h3 className="text-xl font-black text-emerald-950 font-['Outfit',sans-serif] mt-0.5">
            Teste por 7 dias sem nenhum risco
          </h3>
          <p className="text-xs sm:text-sm text-emerald-900/90 mt-1.5 leading-relaxed font-medium">
            Experimente o <strong className="text-emerald-950 font-bold">Reforma 360</strong>. Se por qualquer motivo não fizer sentido para você ou não
            ajudar a planejar sua reforma, basta solicitar o cancelamento e devolvemos 100% do seu dinheiro.
          </p>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-black text-slate-900 font-['Outfit',sans-serif]">
                Acesso Imediato
              </h4>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-800">
                {selectedCheckoutPlan === 'profissional' ? 'Plano PRO (R$ 39,90)' : 'Plano Essencial (R$ 19,90)'}
              </span>
            </div>

            {/* Payment Method Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'pix' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>PIX (Liberação Imediata)</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('cartao')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'cartao' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                <CreditCard className="w-4 h-4 text-orange-600" />
                <span>Cartão de Crédito</span>
              </button>
            </div>

            {paymentMethod === 'pix' ? (
              <div className="text-center space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col items-center">
                  <div className="w-36 h-36 bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center mb-2">
                    <QrCode className="w-28 h-28 text-slate-900" />
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Abra o app do seu banco e escaneie o código
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors"
                >
                  {pixCopied ? 'Código PIX Copiado!' : 'Copiar Chave PIX Copia e Cola'}
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Número do Cartão</label>
                  <input
                    type="text"
                    defaultValue="•••• •••• •••• 4242"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Validade</label>
                    <input
                      type="text"
                      defaultValue="12/28"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">CVV</label>
                    <input
                      type="text"
                      defaultValue="123"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 justify-center my-4">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ambiente Seguro com Criptografia de 256 bits</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="flex-2 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black shadow-md shadow-orange-600/30 flex items-center justify-center gap-1.5"
              >
                {isProcessing ? 'Confirmando...' : 'CONFIRMAR ACESSO'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
