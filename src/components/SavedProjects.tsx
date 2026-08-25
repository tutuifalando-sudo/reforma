import React from 'react';
import {
  FolderHeart,
  Calendar,
  Layers,
  ArrowRight,
  Trash2,
  FileDown,
  Plus,
  Coins,
  Share2,
} from 'lucide-react';
import { ProjectEstimate } from '../types';
import { exportEstimateToPdf } from '../utils/pdfExport';
import { ROOM_INFO } from '../data/costEngine';

interface SavedProjectsProps {
  projects: ProjectEstimate[];
  onSelectProject: (project: ProjectEstimate) => void;
  onDeleteProject: (id: string) => void;
  onNewEstimate: () => void;
}

export const SavedProjects: React.FC<SavedProjectsProps> = ({
  projects,
  onSelectProject,
  onDeleteProject,
  onNewEstimate,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <FolderHeart className="w-4 h-4" />
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Meus Projetos Salvos
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Gerencie e compare suas estimativas de reforma salvas no dispositivo
          </p>
        </div>

        <button
          id="btn-new-estimate-saved"
          onClick={onNewEstimate}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Estimativa</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
            <FolderHeart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Você ainda não tem projetos salvos</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            Calcule sua primeira estimativa no simulador e clique em &quot;Salvar Projeto&quot; para acessá-la aqui a qualquer momento.
          </p>
          <button
            onClick={onNewEstimate}
            className="px-6 py-3 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-600/20"
          >
            Calcular Minha Primeira Reforma
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => {
            const roomMeta = ROOM_INFO[proj.roomType];
            return (
              <div
                key={proj.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-orange-800 uppercase">
                          {roomMeta?.label || proj.roomType}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(proj.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 line-clamp-1">{proj.title}</h4>
                    </div>

                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      className="text-slate-300 hover:text-rose-600 p-1.5 transition-colors"
                      title="Excluir projeto salvo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Área & Padrão</span>
                      <strong className="text-slate-800">
                        {proj.areaM2}m² • {proj.style}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Materiais Listados</span>
                      <strong className="text-slate-800">{proj.materials.length} itens</strong>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Estimativa Média
                    </span>
                    <div className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                      R$ {proj.totalAvg.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Faixa: R$ {proj.totalMin.toLocaleString('pt-BR')} a R$ {proj.totalMax.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-2">
                  <button
                    onClick={() => exportEstimateToPdf(proj)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5"
                  >
                    <FileDown className="w-3.5 h-3.5 text-orange-600" />
                    <span>PDF</span>
                  </button>

                  <button
                    onClick={() => onSelectProject(proj)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Abrir Projeto</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
