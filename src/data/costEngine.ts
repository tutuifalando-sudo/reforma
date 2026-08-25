import {
  BrazilRegion,
  CostCategoryItem,
  MaterialItem,
  ProjectEstimate,
  RenovationPhase,
  RenovationScope,
  RenovationStyle,
  RoomType,
} from '../types';

export const ROOM_INFO: Record<
  RoomType,
  { label: string; icon: string; defaultArea: number; baseCostPerM2: number; description: string }
> = {
  cozinha: {
    label: 'Cozinha',
    icon: 'CookingPot',
    defaultArea: 10,
    baseCostPerM2: 2400,
    description: 'Bancadas em pedra, revestimentos, marcenaria planejada, hidráulica e gás.',
  },
  banheiro: {
    label: 'Banheiro',
    icon: 'ShowerHead',
    defaultArea: 5,
    baseCostPerM2: 2900,
    description: 'Impermeabilização, louças, metais, box de vidro, nichos e revestimentos até o teto.',
  },
  sala: {
    label: 'Sala de Estar / Jantar',
    icon: 'Sofa',
    defaultArea: 20,
    baseCostPerM2: 1250,
    description: 'Piso vinílico/porcelanato, forro de gesso, iluminação indireta e pintura premium.',
  },
  quarto: {
    label: 'Quarto / Suíte',
    icon: 'BedDouble',
    defaultArea: 14,
    baseCostPerM2: 1100,
    description: 'Armários embutidos, piso aconchegante, cabeceira, pontos de tomada e ar-condicionado.',
  },
  casa_completa: {
    label: 'Casa Completa / Apto',
    icon: 'Home',
    defaultArea: 65,
    baseCostPerM2: 1750,
    description: 'Reforma global integrando todos os ambientes, elétrica central e pintura total.',
  },
  varanda: {
    label: 'Varanda / Área Gourmet',
    icon: 'Flame',
    defaultArea: 12,
    baseCostPerM2: 1950,
    description: 'Churrasqueira, bancada, fechamento em vidro e pisos antiderrapantes.',
  },
  escritorio: {
    label: 'Escritório / Home Office',
    icon: 'Briefcase',
    defaultArea: 10,
    baseCostPerM2: 1050,
    description: 'Acústica, bancada ergonômica, rede estruturada e iluminação técnica.',
  },
};

export const STYLE_MULTIPLIERS: Record<
  RenovationStyle,
  { label: string; mult: number; desc: string; tag: string }
> = {
  economico: {
    label: 'Econômico / Essencial',
    mult: 0.78,
    desc: 'Materiais de excelente custo-benefício, cerâmica de boa qualidade e pintura neutra.',
    tag: 'Melhor Custo',
  },
  moderno: {
    label: 'Moderno / Contemporâneo',
    mult: 1.0,
    desc: 'Porcelanatos retificados, marcenaria sob medida em MDF, iluminação em LED e metais modernos.',
    tag: 'Mais Escolhido',
  },
  minimalista: {
    label: 'Minimalista Clean',
    mult: 1.15,
    desc: 'Linhas retas, marcenaria embutida sem puxadores, cimento queimado e iluminação linear.',
    tag: 'Elegante',
  },
  industrial: {
    label: 'Industrial Urbano',
    mult: 1.1,
    desc: 'Trilhos elétricos aparentes, tubulações expostas, tijolinho e serralheria preta.',
    tag: 'Estiloso',
  },
  alto_padrao: {
    label: 'Alto Padrão / Luxo',
    mult: 1.65,
    desc: 'Mármores nobres (Quartzo/Calacatta), porcelanato grande formato, automação e marcenaria premium.',
    tag: 'Sofisticado',
  },
  rustico_chic: {
    label: 'Rústico Chic / BoHo',
    mult: 1.2,
    desc: 'Madeira maciça de demolição, pedras naturais, texturas orgânicas e vegetação integrada.',
    tag: 'Aconchegante',
  },
};

export const SCOPE_MULTIPLIERS: Record<
  RenovationScope,
  { label: string; mult: number; timeMult: number; desc: string }
> = {
  leve: {
    label: 'Reforma Leve / Estética',
    mult: 0.55,
    timeMult: 0.5,
    desc: 'Pintura geral, troca de luminárias, pequenos reparos e troca de acessórios sem quebra-quebra.',
  },
  medio: {
    label: 'Reforma Média / Revestimentos',
    mult: 1.0,
    timeMult: 1.0,
    desc: 'Troca de piso, azulejos, novas bancadas, louças, metais e marcenaria parcial.',
  },
  pesado: {
    label: 'Reforma Completa / Quebra-quebra',
    mult: 1.45,
    timeMult: 1.6,
    desc: 'Demolição de paredes, substituição total de tubulações hidráulicas, novo quadro elétrico e forro.',
  },
  planta: {
    label: 'Imóvel Novo / Na Planta',
    mult: 1.3,
    timeMult: 1.35,
    desc: 'Sem contrapiso nivelado, sem iluminação ou revestimentos. Criação do zero conforme layout.',
  },
};

export const REGION_MULTIPLIERS: Record<BrazilRegion, { label: string; mult: number }> = {
  sudeste: { label: 'Sudeste (SP, RJ, MG, ES)', mult: 1.05 },
  sul: { label: 'Sul (PR, SC, RS)', mult: 1.0 },
  centro_oeste: { label: 'Centro-Oeste (DF, GO, MT, MS)', mult: 0.98 },
  nordeste: { label: 'Nordeste (BA, PE, CE, etc.)', mult: 0.88 },
  norte: { label: 'Norte (AM, PA, RO, etc.)', mult: 0.95 },
};

export function calculateProjectEstimate(params: {
  projectName?: string;
  roomType: RoomType;
  areaM2: number;
  style: RenovationStyle;
  scope: RenovationScope;
  userBudget: number;
  region: BrazilRegion;
}): ProjectEstimate {
  const room = ROOM_INFO[params.roomType];
  const style = STYLE_MULTIPLIERS[params.style];
  const scope = SCOPE_MULTIPLIERS[params.scope];
  const region = REGION_MULTIPLIERS[params.region];

  const basePerM2 = room.baseCostPerM2;
  const computedCostPerM2 = Math.round(basePerM2 * style.mult * scope.mult * region.mult);
  const totalAvg = Math.round(computedCostPerM2 * params.areaM2);
  const totalMin = Math.round(totalAvg * 0.88);
  const totalMax = Math.round(totalAvg * 1.18);

  // Proportions according to renovation type and Brazilian market benchmarks
  const isWetArea = params.roomType === 'cozinha' || params.roomType === 'banheiro' || params.roomType === 'varanda';
  
  let laborPercent = 0.35;
  let finishesPercent = isWetArea ? 0.22 : 0.16;
  let cabinetryPercent = params.style === 'alto_padrao' ? 0.22 : (isWetArea ? 0.18 : 0.20);
  let fixturesPercent = isWetArea ? 0.10 : 0.04;
  let electricalPercent = 0.08;
  let paintPercent = 0.07;
  let contingencyPercent = 0.10; // Reserva técnica de 10% indispensável

  const sumP = laborPercent + finishesPercent + cabinetryPercent + fixturesPercent + electricalPercent + paintPercent + contingencyPercent;
  // Normalize
  laborPercent /= sumP;
  finishesPercent /= sumP;
  cabinetryPercent /= sumP;
  fixturesPercent /= sumP;
  electricalPercent /= sumP;
  paintPercent /= sumP;
  contingencyPercent /= sumP;

  const breakdown: CostCategoryItem[] = [
    {
      key: 'labor',
      label: 'Mão de Obra Especializada',
      amount: Math.round(totalAvg * laborPercent),
      percentage: Math.round(laborPercent * 100),
      color: 'bg-indigo-500 text-indigo-100',
      icon: 'HardHat',
      description: 'Pedreiros, eletricistas, encanadores, pintores e ajudantes qualificados.',
    },
    {
      key: 'finishes',
      label: 'Pisos e Revestimentos',
      amount: Math.round(totalAvg * finishesPercent),
      percentage: Math.round(finishesPercent * 100),
      color: 'bg-emerald-500 text-emerald-100',
      icon: 'Layers',
      description: 'Porcelanatos, azulejos, rodapés, argamassas colantes e rejunte epóxi/acrílico.',
    },
    {
      key: 'cabinetry',
      label: 'Marcenaria & Móveis Planejados',
      amount: Math.round(totalAvg * cabinetryPercent),
      percentage: Math.round(cabinetryPercent * 100),
      color: 'bg-amber-500 text-amber-100',
      icon: 'SquareDashedBottomCode',
      description: 'Armários sob medida em MDF naval/anti-umidade, ferragens com amortecimento e puxadores.',
    },
    {
      key: 'fixtures',
      label: 'Louças, Metais & Bancadas',
      amount: Math.round(totalAvg * fixturesPercent),
      percentage: Math.round(fixturesPercent * 100),
      color: 'bg-cyan-500 text-cyan-100',
      icon: 'Bath',
      description: 'Cubas de embutir, torneiras monocomando, bacias sanitárias, granito/quartzo e box.',
    },
    {
      key: 'electrical',
      label: 'Elétrica e Iluminação',
      amount: Math.round(totalAvg * electricalPercent),
      percentage: Math.round(electricalPercent * 100),
      color: 'bg-violet-500 text-violet-100',
      icon: 'Zap',
      description: 'Spots embutidos, perfis de LED, interruptores modulares, fiação antichama e disjuntores.',
    },
    {
      key: 'paint',
      label: 'Pintura & Forro de Gesso',
      amount: Math.round(totalAvg * paintPercent),
      percentage: Math.round(paintPercent * 100),
      color: 'bg-rose-500 text-rose-100',
      icon: 'Paintbrush',
      description: 'Tinta acrílica lavável/fosca, massa corrida/acrílica, selador e gesso tabicado.',
    },
    {
      key: 'contingency',
      label: 'Reserva para Imprevistos (10%)',
      amount: Math.round(totalAvg * contingencyPercent),
      percentage: Math.round(contingencyPercent * 100),
      color: 'bg-slate-500 text-slate-100',
      icon: 'ShieldAlert',
      description: 'Margem de segurança para canos antigos, fiações ocultas e pequenas correções.',
    },
  ];

  // Generate Materials List
  const materials = generateMaterials(params.roomType, params.areaM2, params.style, params.scope, totalAvg);

  // Generate Phases List
  const phases = generatePhases(params.roomType, params.scope, scope.timeMult);

  // Budget Verdict
  let budgetVerdict: 'dentro' | 'alerta' | 'insuficiente' | 'confortavel' = 'dentro';
  let budgetAnalysis = '';

  if (params.userBudget <= 0) {
    budgetVerdict = 'dentro';
    budgetAnalysis = `Seu projeto para ${room.label} de ${params.areaM2}m² no estilo ${style.label} está estimado em uma média de R$ ${totalAvg.toLocaleString('pt-BR')}.`;
  } else if (params.userBudget >= totalMax) {
    budgetVerdict = 'confortavel';
    budgetAnalysis = `Excelente! Seu orçamento de R$ ${params.userBudget.toLocaleString('pt-BR')} tem folga confortável sobre a estimativa média (R$ ${totalAvg.toLocaleString('pt-BR')}). Isso permite acabamentos premium e marcenaria completa.`;
  } else if (params.userBudget >= totalMin && params.userBudget <= totalMax) {
    budgetVerdict = 'dentro';
    budgetAnalysis = `Seu orçamento de R$ ${params.userBudget.toLocaleString('pt-BR')} é perfeitamente viável para a faixa de custo calculada (R$ ${totalMin.toLocaleString('pt-BR')} a R$ ${totalMax.toLocaleString('pt-BR')}). Mantenha controle rígido da compra de materiais.`;
  } else if (params.userBudget >= totalMin * 0.75) {
    budgetVerdict = 'alerta';
    budgetAnalysis = `Atenção: Seu orçamento de R$ ${params.userBudget.toLocaleString('pt-BR')} está cerca de ${(Math.round((1 - params.userBudget / totalAvg) * 100))}% abaixo da média de mercado. Recomendamos priorizar a mão de obra e ajustar o estilo para Econômico ou modular a marcenaria em 2 etapas.`;
  } else {
    budgetVerdict = 'insuficiente';
    budgetAnalysis = `Alerta de Viabilidade: Seu orçamento informado (R$ ${params.userBudget.toLocaleString('pt-BR')}) é muito inferior ao custo real médio (R$ ${totalAvg.toLocaleString('pt-BR')}). Para evitar parar a obra no meio, sugerimos focar em uma Reforma Leve estética ou adiar a marcenaria sob medida.`;
  }

  const whereToSave = [
    'Compre revestimentos em pontas de estoque ou formatos padrão (ex: 60x60 ou 80x80) em vez de megagrandes formatos.',
    'Pinte azulejos antigos em áreas secas com tinta epóxi de alta resistência em vez de quebrar tudo.',
    'Reutilize pontos hidráulicos existentes para não ter que rasgar alvenaria estrutural.',
    'Pesquise torneiras e cubas em distribuidores online com até 30% de desconto em relação a lojas de grife.',
  ];

  const neverSaveHere = [
    'Nunca economize em impermeabilização (box e áreas molhadas). Um vazamento futuro custa o triplo.',
    'Nunca use fiação elétrica fora da norma ABNT ou disjuntores genéricos (risco de sobrecarga e incêndio).',
    'Nunca contrate mão de obra sem conferir obras anteriores e sem contrato com cronograma de pagamentos atrelado à entrega.',
  ];

  const timelineSummary = `Duração estimada: entre ${phases.reduce((acc, p) => acc + p.durationWeeks, 0)} a ${Math.ceil(phases.reduce((acc, p) => acc + p.durationWeeks, 0) * 1.25)} semanas de execução direta.`;

  return {
    id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: params.projectName || `Reforma ${room.label} (${params.areaM2}m²)`,
    roomType: params.roomType,
    areaM2: params.areaM2,
    style: params.style,
    scope: params.scope,
    userBudget: params.userBudget,
    region: params.region,
    createdAt: new Date().toISOString(),
    totalMin,
    totalAvg,
    totalMax,
    costPerM2: computedCostPerM2,
    breakdown,
    materials,
    phases,
    aiInsights: {
      budgetVerdict,
      budgetAnalysis,
      whereToSave,
      neverSaveHere,
      timelineSummary,
      keyRecommendations: [
        `Planeje a compra de pisos com margem mínima de 10% a 15% para cortes e perdas.`,
        `Exija ART/RRT se for apartamento antes de iniciar qualquer demolição.`,
        `Divida o pagamento da mão de obra em no mínimo 4 a 5 parcelas vinculadas ao término de cada fase.`,
      ],
    },
  };
}

function generateMaterials(
  roomType: RoomType,
  areaM2: number,
  style: RenovationStyle,
  scope: RenovationScope,
  totalAvg: number
): MaterialItem[] {
  const items: MaterialItem[] = [];
  let idCount = 1;
  const isWet = roomType === 'cozinha' || roomType === 'banheiro' || roomType === 'varanda';

  // 1. Flooring & Tile
  const tileArea = Math.ceil(areaM2 * 1.15); // +15% perdas
  const tileUnit = style === 'alto_padrao' ? 145 : (style === 'economico' ? 48 : 85);
  items.push({
    id: `mat_${idCount++}`,
    name: isWet ? 'Porcelanato Retificado para Piso e Paredes (+15% corte)' : 'Piso Vinílico / Porcelanato Retificado',
    category: 'Pisos e Revestimentos',
    unit: 'm²',
    quantity: tileArea,
    unitPrice: tileUnit,
    totalPrice: tileArea * tileUnit,
    purchased: false,
    status: 'pendente',
    priority: 'essencial',
    notes: 'Comprar sempre do mesmo lote/tonalidade para evitar variação de cor.',
  });

  const mortarBags = Math.ceil(tileArea / 4.5);
  items.push({
    id: `mat_${idCount++}`,
    name: isWet ? 'Argamassa AC-III Especial para Porcelanatos e Áreas Úmidas' : 'Argamassa AC-II / Cola Vinílica',
    category: 'Pisos e Revestimentos',
    unit: 'saco 20kg',
    quantity: mortarBags,
    unitPrice: isWet ? 38 : 26,
    totalPrice: mortarBags * (isWet ? 38 : 26),
    purchased: false,
    status: 'pendente',
    priority: 'essencial',
  });

  const groutKg = Math.ceil(tileArea * 0.35);
  items.push({
    id: `mat_${idCount++}`,
    name: 'Rejunte Acrílico ou Epóxi Antimofo',
    category: 'Pisos e Revestimentos',
    unit: 'kg',
    quantity: Math.max(2, groutKg),
    unitPrice: 32,
    totalPrice: Math.max(2, groutKg) * 32,
    purchased: false,
    status: 'pendente',
    priority: 'essencial',
  });

  // 2. Wet areas: waterproofing & plumbing
  if (isWet) {
    items.push({
      id: `mat_${idCount++}`,
      name: 'Membrana Impermeabilizante Elastomérica (Box e Ralo)',
      category: 'Hidráulica',
      unit: 'balde 18kg',
      quantity: Math.max(1, Math.ceil(areaM2 / 8)),
      unitPrice: 195,
      totalPrice: Math.max(1, Math.ceil(areaM2 / 8)) * 195,
      purchased: false,
      status: 'pendente',
      priority: 'essencial',
      notes: 'Indispensável aplicar em 3 demãos cruzadas respeitando a cura.',
    });

    items.push({
      id: `mat_${idCount++}`,
      name: 'Kits de Tubos, Conexões Tigre/Amanco e Registros de Pressão',
      category: 'Hidráulica',
      unit: 'kit',
      quantity: 1,
      unitPrice: roomType === 'banheiro' ? 450 : 380,
      totalPrice: roomType === 'banheiro' ? 450 : 380,
      purchased: false,
      status: 'pendente',
      priority: 'essencial',
    });
  }

  // 3. Paint & drywall
  const wallArea = Math.ceil(areaM2 * 2.8);
  const paintCans = Math.max(1, Math.ceil(wallArea / 45));
  items.push({
    id: `mat_${idCount++}`,
    name: 'Tinta Acrílica Premium Lavável Acabamento Fosco / Acetinado',
    category: 'Tintas e Acabamentos',
    unit: 'lata 18L',
    quantity: paintCans,
    unitPrice: 340,
    totalPrice: paintCans * 340,
    purchased: false,
    status: 'pendente',
    priority: 'essencial',
  });

  items.push({
    id: `mat_${idCount++}`,
    name: 'Massa Corrida / Acrílica para Nivelamento de Paredes',
    category: 'Tintas e Acabamentos',
    unit: 'lata 18L',
    quantity: Math.max(1, Math.ceil(wallArea / 60)),
    unitPrice: 110,
    totalPrice: Math.max(1, Math.ceil(wallArea / 60)) * 110,
    purchased: false,
    status: 'pendente',
    priority: 'recomendado',
  });

  // 4. Electrical
  const spots = Math.max(4, Math.ceil(areaM2 * 0.8));
  items.push({
    id: `mat_${idCount++}`,
    name: 'Spots de LED Embutir Antiofuscante 7W (3000K Branco Quente)',
    category: 'Elétrica e Iluminação',
    unit: 'unid.',
    quantity: spots,
    unitPrice: 38,
    totalPrice: spots * 38,
    purchased: false,
    status: 'pendente',
    priority: 'recomendado',
  });

  items.push({
    id: `mat_${idCount++}`,
    name: 'Cabos Elétricos Flexíveis 2.5mm² e 4.0mm² antichama',
    category: 'Elétrica e Iluminação',
    unit: 'rolo 100m',
    quantity: Math.max(1, Math.ceil(areaM2 / 20)),
    unitPrice: 220,
    totalPrice: Math.max(1, Math.ceil(areaM2 / 20)) * 220,
    purchased: false,
    status: 'pendente',
    priority: 'essencial',
  });

  // 5. Specific Fixtures
  if (roomType === 'banheiro') {
    items.push({
      id: `mat_${idCount++}`,
      name: 'Bacia Sanitária com Caixa Acoplada Duplo Acionamento',
      category: 'Louças e Metais',
      unit: 'conjunto',
      quantity: 1,
      unitPrice: style === 'alto_padrao' ? 1200 : 580,
      totalPrice: style === 'alto_padrao' ? 1200 : 580,
      purchased: false,
      status: 'pendente',
      priority: 'essencial',
    });
    items.push({
      id: `mat_${idCount++}`,
      name: 'Torneira / Misturador Monocomando com Acabamento Preto/Cromado',
      category: 'Louças e Metais',
      unit: 'unid.',
      quantity: 1,
      unitPrice: style === 'alto_padrao' ? 650 : 280,
      totalPrice: style === 'alto_padrao' ? 650 : 280,
      purchased: false,
      status: 'pendente',
      priority: 'essencial',
    });
    items.push({
      id: `mat_${idCount++}`,
      name: 'Box de Vidro Temperado 8mm até o Teto com Roldanas Aparente',
      category: 'Marcenaria e Vidraçaria',
      unit: 'unid.',
      quantity: 1,
      unitPrice: 950,
      totalPrice: 950,
      purchased: false,
      status: 'pendente',
      priority: 'recomendado',
    });
  } else if (roomType === 'cozinha') {
    items.push({
      id: `mat_${idCount++}`,
      name: 'Cuba de Inox Gourmet Dupla/Simples com Calha Úmida',
      category: 'Louças e Metais',
      unit: 'unid.',
      quantity: 1,
      unitPrice: style === 'alto_padrao' ? 1400 : 620,
      totalPrice: style === 'alto_padrao' ? 1400 : 620,
      purchased: false,
      status: 'pendente',
      priority: 'essencial',
    });
    items.push({
      id: `mat_${idCount++}`,
      name: 'Bancada em Granito Preto São Gabriel / Quartzo Branco',
      category: 'Alvenaria e Estrutura',
      unit: 'metro linear',
      quantity: Math.max(2, Math.ceil(areaM2 * 0.35)),
      unitPrice: style === 'alto_padrao' ? 1100 : 520,
      totalPrice: Math.max(2, Math.ceil(areaM2 * 0.35)) * (style === 'alto_padrao' ? 1100 : 520),
      purchased: false,
      status: 'pendente',
      priority: 'essencial',
    });
  }

  // 6. Demolition / Debris protection
  items.push({
    id: `mat_${idCount++}`,
    name: 'Caçamba Estacionária para Entulho e Plástico Bolha / Papelão Salva Piso',
    category: 'Geral / Descarte',
    unit: 'kit proteção',
    quantity: 1,
    unitPrice: 420,
    totalPrice: 420,
    purchased: false,
    status: 'pendente',
    priority: 'essencial',
  });

  return items;
}

function generatePhases(roomType: RoomType, scope: RenovationScope, timeMult: number): RenovationPhase[] {
  const isWet = roomType === 'cozinha' || roomType === 'banheiro' || roomType === 'varanda';

  return [
    {
      id: 'phase_1',
      title: 'Etapa 1: Proteção, Demolição e Descarte',
      order: 1,
      durationWeeks: Math.max(1, Math.round(1 * timeMult)),
      status: 'em_andamento',
      description: 'Isolamento de portas, forração do piso com salva-piso e quebra cuidadosa de revestimentos antigos.',
      checklist: [
        { id: 'c1', text: 'Emissão de ART/RRT e comunicação com o condomínio/vizinhos', completed: true },
        { id: 'c2', text: 'Forração com papelão ondulado e plástico de todas as áreas de passagem', completed: false },
        { id: 'c3', text: 'Fechamento dos registros gerais de água e disjuntores elétricos', completed: false },
        { id: 'c4', text: 'Locação e agendamento da caçamba de entulho legalizada', completed: false },
      ],
      practicalTip: 'Tire fotos de todas as tubulações expostas antes de fechar alvenarias. Você vai precisar saber onde furar futuramente.',
      alertWarning: 'NUNCA comece a quebrar nada sem antes conferir a planta hidráulica para não furar cano de prumada.',
      paymentMilestonePercent: 25,
    },
    {
      id: 'phase_2',
      title: 'Etapa 2: Infraestrutura Elétrica, Hidráulica e Gesso',
      order: 2,
      durationWeeks: Math.max(1, Math.round(1.5 * timeMult)),
      status: 'pendente',
      description: 'Passagem de novos conduítes, novos pontos de tomadas (110V/220V), tubos de água/esgoto e forro de gesso.',
      checklist: [
        { id: 'c5', text: 'Revisão dos circuitos elétricos com disjuntor DR obrigatório', completed: false },
        { id: 'c6', text: 'Teste de estanqueidade e pressão da tubulação hidráulica por 24h', completed: false },
        { id: 'c7', text: isWet ? 'Aplicação de 3 demãos de impermeabilizante nas áreas úmidas' : 'Instalação de tabicas e forro de gesso acartonado (drywall)', completed: false },
      ],
      practicalTip: 'Coloque mais tomadas do que você acha que precisa. Tomadas duplas perto da bancada da cozinha e cabeceira são essenciais.',
      alertWarning: 'Faça o teste de estanqueidade com água ANTES de assentar qualquer piso ou revestimento.',
      paymentMilestonePercent: 25,
    },
    {
      id: 'phase_3',
      title: 'Etapa 3: Alvenaria, Contrapiso e Revestimentos',
      order: 3,
      durationWeeks: Math.max(1, Math.round(2 * timeMult)),
      status: 'pendente',
      description: 'Nivelamento de contrapiso, assentamento de porcelanatos, paginação de azulejos e rejuntamento.',
      checklist: [
        { id: 'c8', text: 'Aprovação do layout de paginação (por onde o piso começa para evitar recortes feios)', completed: false },
        { id: 'c9', text: 'Assentamento com niveladores de piso e dupla colagem de argamassa', completed: false },
        { id: 'c10', text: 'Aplicação de rejunte epóxi ou acrílico e limpeza imediata dos resíduos', completed: false },
      ],
      practicalTip: 'Exija o uso de espaçadores niveladores de piso. Eles garantem que o porcelanato fique 100% plano sem dentes.',
      alertWarning: 'Não permita trânsito sobre o piso recém-assentado antes de 48 horas da secagem.',
      paymentMilestonePercent: 25,
    },
    {
      id: 'phase_4',
      title: 'Etapa 4: Pintura, Iluminação e Louças',
      order: 4,
      durationWeeks: Math.max(1, Math.round(1 * timeMult)),
      status: 'pendente',
      description: 'Lixamento fino, selador, 2 a 3 demãos de tinta lavável, fixação de luminárias e cubas.',
      checklist: [
        { id: 'c11', text: 'Aplicação de massa corrida e lixamento com iluminação de luz rasante', completed: false },
        { id: 'c12', text: 'Pintura final de teto e paredes com tinta acetinada ou fosca', completed: false },
        { id: 'c13', text: 'Instalação de spots de LED, interruptores e acabamentos dos registros', completed: false },
        { id: 'c14', text: 'Instalação das bancadas de pedra, cubas, torneiras e espelhos', completed: false },
      ],
      practicalTip: 'Use luz quente (2700K ou 3000K) para ambientes sociais e de descanso. Dá a sensação de aconchego e valoriza os móveis.',
      alertWarning: 'Cubra o piso novo com plástico bolha e papelão antes de pintar para evitar respingos de tinta.',
      paymentMilestonePercent: 15,
    },
    {
      id: 'phase_5',
      title: 'Etapa 5: Marcenaria, Box, Limpeza Fina e Entrega',
      order: 5,
      durationWeeks: Math.max(1, Math.round(1 * timeMult)),
      status: 'pendente',
      description: 'Montagem dos armários planejados, instalação do box de vidro, limpeza pesada pós-obra e vistoria de entrega.',
      checklist: [
        { id: 'c15', text: 'Montagem e regulagem de dobradiças e corrediças da marcenaria', completed: false },
        { id: 'c16', text: 'Vedação com silicone antifungo no box e rodopia das bancadas', completed: false },
        { id: 'c17', text: 'Limpeza profissional pós-obra (remoção de pó e marcas de rejunte)', completed: false },
        { id: 'c18', text: 'Vistoria detalhada com checklist de pendências antes da liberação final', completed: false },
      ],
      practicalTip: 'Guarde pelo menos 1 caixa de cada revestimento e 1 litro de cada tinta usada com o código da cor para futuros retoques.',
      alertWarning: 'Só pague a última parcela da mão de obra após testar torneiras, ralos, descargas e acendimento de todas as lâmpadas.',
      paymentMilestonePercent: 10,
    },
  ];
}
