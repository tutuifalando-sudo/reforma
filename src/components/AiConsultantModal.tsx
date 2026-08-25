import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Lightbulb,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { ProjectEstimate } from '../types';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEstimate?: ProjectEstimate | null;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  currentEstimate,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: `Olá! Sou o Consultor de Obras e Reformas do Reforma 360. ${
        currentEstimate
          ? `Estou com os dados do seu projeto de ${currentEstimate.title} abertos.`
          : 'Como posso te ajudar a planejar ou tirar dúvidas técnicas da sua obra hoje?'
      }`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    'Qual o melhor piso para não escorregar no banheiro?',
    'Vale a pena colocar porcelanato sobre piso existente?',
    'Como evitar infiltração no box do chuveiro?',
    'Quais lâmpadas usar para ter iluminação aconchegante?',
  ];

  const handleSend = async (questionText?: string) => {
    const query = questionText || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/ask-expert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          projectContext: currentEstimate
            ? {
                roomType: currentEstimate.roomType,
                areaM2: currentEstimate.areaM2,
                style: currentEstimate.style,
                scope: currentEstimate.scope,
                totalAvg: currentEstimate.totalAvg,
              }
            : undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: Message = {
          id: `msg_ai_${Date.now()}`,
          sender: 'ai',
          text: data.answer || 'Desculpe, não consegui obter uma resposta no momento.',
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API error');
      }
    } catch {
      const fallbackMsg: Message = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        text: 'Dica do Especialista: Para reformas em edifícios residenciais, certifique-se sempre de recolher a RRT/ART assinada pelo profissional responsável e respeite as regras da norma ABNT NBR 16280 para aprovação no condomínio antes de qualquer quebra-quebra.',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full h-[600px] border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base font-['Outfit',sans-serif]">
                Consultor Técnico Reforma 360 AI
              </h3>
              <p className="text-[11px] text-slate-400">Tire dúvidas de materiais, normas e acabamentos</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 w-fit">
              <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
              <span>Consultor analisando seu projeto e normas...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-bold shrink-0">Sugestões:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-orange-700 text-slate-700 whitespace-nowrap shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua dúvida sobre materiais, paredes, pisos..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
};
