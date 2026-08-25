import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  CheckCircle,
  Circle,
  Trash2,
  Layers,
  Sparkles,
  ShoppingBag,
  DollarSign,
  Copy,
  Check,
} from 'lucide-react';
import { MaterialItem } from '../types';

interface MaterialsListProps {
  materials: MaterialItem[];
  onUpdateMaterials: (updated: MaterialItem[]) => void;
  roomArea: number;
}

export const MaterialsList: React.FC<MaterialsListProps> = ({
  materials,
  onUpdateMaterials,
  roomArea,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // New Item State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<MaterialItem['category']>('Pisos e Revestimentos');
  const [newQuantity, setNewQuantity] = useState<number>(1);
  const [newUnit, setNewUnit] = useState('unid.');
  const [newPrice, setNewPrice] = useState<number>(50);

  const categories = useMemo(() => {
    const set = new Set<string>();
    materials.forEach((m) => set.add(m.category));
    return Array.from(set);
  }, [materials]);

  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.notes && item.notes.toLowerCase().includes(search.toLowerCase()));
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [materials, search, selectedCategory]);

  const totalCalculated = useMemo(() => {
    return materials.reduce((acc, item) => acc + item.totalPrice, 0);
  }, [materials]);

  const totalPurchased = useMemo(() => {
    return materials
      .filter((item) => item.purchased || item.status === 'comprado')
      .reduce((acc, item) => acc + item.totalPrice, 0);
  }, [materials]);

  const handleTogglePurchased = (id: string) => {
    const updated = materials.map((item) => {
      if (item.id === id) {
        const nextPurchased = !item.purchased;
        return {
          ...item,
          purchased: nextPurchased,
          status: nextPurchased ? ('comprado' as const) : ('pendente' as const),
        };
      }
      return item;
    });
    onUpdateMaterials(updated);
  };

  const handleDeleteItem = (id: string) => {
    const updated = materials.filter((item) => item.id !== id);
    onUpdateMaterials(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem: MaterialItem = {
      id: `mat_custom_${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      quantity: Number(newQuantity) || 1,
      unit: newUnit,
      unitPrice: Number(newPrice) || 0,
      totalPrice: (Number(newQuantity) || 1) * (Number(newPrice) || 0),
      purchased: false,
      status: 'pendente',
      priority: 'recomendado',
    };

    onUpdateMaterials([newItem, ...materials]);
    setNewName('');
    setShowAddModal(false);
  };

  const handleCopyList = () => {
    const text = materials
      .map(
        (m) =>
          `[${m.purchased ? 'X' : ' '}] ${m.name} - ${m.quantity} ${m.unit} (R$ ${m.totalPrice.toLocaleString('pt-BR')})`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Header & Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Lista Quantificada de Materiais
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Quantidades calibradas com margem técnica de perdas (+10-15%) para a área de {roomArea}m²
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-copy-materials"
            onClick={handleCopyList}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>

          <button
            id="btn-add-material"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Material</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Progress */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Custo Total de Materiais</span>
            <div className="text-lg font-black text-slate-900">
              R$ {totalCalculated.toLocaleString('pt-BR')}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-emerald-600 uppercase">Já Comprado / Cotado</span>
            <div className="text-lg font-black text-emerald-700">
              R$ {totalPurchased.toLocaleString('pt-BR')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>
            {materials.filter((m) => m.purchased).length} de {materials.length} itens comprados
          </span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="search-materials-input"
            type="text"
            placeholder="Buscar material (ex: porcelanato, tinta, argamassa...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-xs sm:text-sm text-slate-900 bg-white"
          />
        </div>

        <select
          id="select-category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        >
          <option value="all">Todas as Categorias</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Materials Item List */}
      <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
        {filteredMaterials.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            Nenhum material encontrado com os filtros selecionados.
          </div>
        ) : (
          filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className={`p-4 transition-colors flex items-center justify-between gap-3 ${
                mat.purchased ? 'bg-emerald-50/40 text-slate-500' : 'hover:bg-slate-50 bg-white'
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => handleTogglePurchased(mat.id)}
                  className="mt-0.5 text-slate-400 hover:text-orange-600 transition-colors shrink-0"
                >
                  {mat.purchased ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4
                      className={`text-sm font-bold truncate ${
                        mat.purchased ? 'line-through text-slate-500' : 'text-slate-900'
                      }`}
                    >
                      {mat.name}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {mat.category}
                    </span>
                  </div>

                  {mat.notes && (
                    <p className="text-xs text-amber-700 mt-1 font-medium italic">
                      💡 {mat.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Quantities and Prices */}
              <div className="flex items-center gap-4 text-right shrink-0">
                <div>
                  <div className="text-xs font-bold text-slate-700">
                    {mat.quantity} {mat.unit}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    R$ {mat.unitPrice.toLocaleString('pt-BR')} un.
                  </div>
                </div>

                <div className="w-24 text-right">
                  <div className="text-sm font-extrabold text-slate-900">
                    R$ {mat.totalPrice.toLocaleString('pt-BR')}
                  </div>
                  <span
                    className={`text-[10px] font-semibold ${
                      mat.purchased ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  >
                    {mat.purchased ? 'Comprado' : 'Pendente'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteItem(mat.id)}
                  className="text-slate-300 hover:text-rose-600 p-1 transition-colors"
                  title="Remover item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Custom Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95">
            <h4 className="text-lg font-black text-slate-900 font-['Outfit',sans-serif] mb-4">
              Adicionar Novo Material
            </h4>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nome do Item / Material
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Rodapé de Poliestireno 10cm"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Categoria
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="Pisos e Revestimentos">Pisos e Revestimentos</option>
                  <option value="Alvenaria e Estrutura">Alvenaria e Estrutura</option>
                  <option value="Tintas e Acabamentos">Tintas e Acabamentos</option>
                  <option value="Hidráulica">Hidráulica</option>
                  <option value="Elétrica e Iluminação">Elétrica e Iluminação</option>
                  <option value="Louças e Metais">Louças e Metais</option>
                  <option value="Marcenaria e Vidraçaria">Marcenaria e Vidraçaria</option>
                  <option value="Geral / Descarte">Geral / Descarte</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Unidade
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="m², un, saco"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Preço Unit (R$)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                >
                  Salvar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
