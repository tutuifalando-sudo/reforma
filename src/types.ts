export type RoomType =
  | 'cozinha'
  | 'banheiro'
  | 'sala'
  | 'quarto'
  | 'casa_completa'
  | 'varanda'
  | 'escritorio';

export type RenovationStyle =
  | 'economico'
  | 'moderno'
  | 'minimalista'
  | 'industrial'
  | 'alto_padrao'
  | 'rustico_chic';

export type RenovationScope =
  | 'leve' // Pintura e retoques rápidos
  | 'medio' // Pisos, revestimentos e louças
  | 'pesado' // Quebra-quebra, demolição, hidráulica e elétrica total
  | 'planta'; // Imóvel na planta / sem acabamentos

export type BrazilRegion = 'sudeste' | 'sul' | 'centro_oeste' | 'nordeste' | 'norte';

export interface MaterialItem {
  id: string;
  name: string;
  category:
    | 'Alvenaria e Estrutura'
    | 'Pisos e Revestimentos'
    | 'Tintas e Acabamentos'
    | 'Hidráulica'
    | 'Elétrica e Iluminação'
    | 'Louças e Metais'
    | 'Marcenaria e Vidraçaria'
    | 'Geral / Descarte';
  unit: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  purchased: boolean;
  status: 'pendente' | 'cotado' | 'comprado';
  notes?: string;
  priority: 'essencial' | 'recomendado' | 'opcional';
}

export interface PhaseChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface RenovationPhase {
  id: string;
  title: string;
  order: number;
  durationWeeks: number;
  status: 'pendente' | 'em_andamento' | 'concluido';
  description: string;
  checklist: PhaseChecklistItem[];
  practicalTip: string;
  alertWarning: string;
  paymentMilestonePercent: number;
}

export interface CostCategoryItem {
  key: string;
  label: string;
  amount: number;
  percentage: number;
  color: string;
  icon: string;
  description: string;
}

export interface ProjectEstimate {
  id: string;
  title: string;
  roomType: RoomType;
  areaM2: number;
  style: RenovationStyle;
  scope: RenovationScope;
  userBudget: number;
  region: BrazilRegion;
  createdAt: string;
  totalMin: number;
  totalAvg: number;
  totalMax: number;
  costPerM2: number;
  breakdown: CostCategoryItem[];
  materials: MaterialItem[];
  phases: RenovationPhase[];
  aiInsights: {
    budgetVerdict: 'dentro' | 'alerta' | 'insuficiente' | 'confortavel';
    budgetAnalysis: string;
    whereToSave: string[];
    neverSaveHere: string[];
    timelineSummary: string;
    keyRecommendations: string[];
  };
  customNotes?: string;
}

export interface ArchitectProposal {
  id: string;
  clientName: string;
  clientContact?: string;
  projectName: string;
  projectLocation?: string;
  designerName: string;
  designerCompany?: string;
  designerRegistration?: string; // CAU/CREA
  roomType: RoomType;
  areaM2: number;
  style: RenovationStyle;
  scope: RenovationScope;
  estimatedLaborAndMaterials: number;
  professionalFee: number;
  totalProjectValue: number;
  estimatedWeeks: number;
  scopeSummary: string;
  deliverables: string[];
  paymentMilestones: {
    title: string;
    percent: number;
    amount: number;
    timing: string;
  }[];
  warrantyAndTerms: string;
  createdAt: string;
}

export type PlanType = 'essencial' | 'profissional';
