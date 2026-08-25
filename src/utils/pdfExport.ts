import { jsPDF } from 'jspdf';
import { ArchitectProposal, ProjectEstimate } from '../types';

export function exportEstimateToPdf(estimate: ProjectEstimate) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Banner
  doc.setFillColor(249, 115, 22); // Orange #f97316
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('REFORMA 360 | Estimativa & Planejamento Inteligente', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Gerado em: ${new Date(estimate.createdAt).toLocaleDateString('pt-BR')} às ${new Date(estimate.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`, 14, 19);

  y = 34;

  // Project Title & Core Metrics
  doc.setTextColor(30, 41, 59); // Slate-800
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(estimate.title, 14, y);

  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`Ambiente: ${estimate.roomType.toUpperCase()}  |  Área: ${estimate.areaM2} m²  |  Estilo: ${estimate.style.toUpperCase()}`, 14, y);
  y += 5;
  doc.text(`Nível da Obra: ${estimate.scope.toUpperCase()}  |  Região: ${estimate.region.toUpperCase()}`, 14, y);

  y += 10;

  // Investment Summary Card Box
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(14, y, pageWidth - 28, 26, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('ESTIMATIVA DE INVESTIMENTO TOTAL', 20, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(234, 88, 12); // Amber-600
  doc.text(`R$ ${estimate.totalAvg.toLocaleString('pt-BR')}`, 20, y + 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Faixa Mín / Máx: R$ ${estimate.totalMin.toLocaleString('pt-BR')} a R$ ${estimate.totalMax.toLocaleString('pt-BR')}`, 20, y + 21);

  doc.text(`Custo Médio / m²: R$ ${estimate.costPerM2.toLocaleString('pt-BR')}/m²`, 110, y + 15);
  if (estimate.userBudget > 0) {
    doc.text(`Orçamento Informado: R$ ${estimate.userBudget.toLocaleString('pt-BR')}`, 110, y + 21);
  }

  y += 34;

  // Cost Breakdown Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Distribuição por Categoria', 14, y);

  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  estimate.breakdown.forEach((item) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.text(`• ${item.label} (${item.percentage}%)`, 16, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`R$ ${item.amount.toLocaleString('pt-BR')}`, 150, y, { align: 'right' });
    y += 5;
  });

  y += 6;

  // Materials List
  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Lista Essencial de Materiais Calculados', 14, y);

  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('ITEM / ESPECIFICAÇÃO', 14, y);
  doc.text('QTD', 110, y);
  doc.text('UNIT (R$)', 135, y);
  doc.text('TOTAL (R$)', 175, y, { align: 'right' });

  y += 4;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, pageWidth - 14, y);
  y += 4;

  estimate.materials.forEach((mat) => {
    if (y > 275) {
      doc.addPage();
      y = 20;
    }
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(mat.name.length > 55 ? mat.name.substring(0, 52) + '...' : mat.name, 14, y);
    doc.text(`${mat.quantity} ${mat.unit}`, 110, y);
    doc.text(`R$ ${mat.unitPrice.toLocaleString('pt-BR')}`, 135, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`R$ ${mat.totalPrice.toLocaleString('pt-BR')}`, 175, y, { align: 'right' });
    y += 5;
  });

  // Phases & Timeline
  doc.addPage();
  y = 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Cronograma e Etapas Recomendadas', 14, y);

  y += 8;

  estimate.phases.forEach((phase) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, y, pageWidth - 28, 28, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`${phase.title}  (~${phase.durationWeeks} sem.)`, 18, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(phase.description, pageWidth - 40);
    doc.text(splitDesc, 18, y + 12);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(180, 83, 9); // Amber-700
    doc.text(`Dica: ${phase.practicalTip.substring(0, 85)}...`, 18, y + 23);

    y += 33;
  });

  // Key Tips Section
  y += 4;
  if (y > 230) {
    doc.addPage();
    y = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Onde Economizar sem Perder Qualidade:', 14, y);
  y += 6;

  estimate.aiInsights.whereToSave.forEach((tip) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitTip = doc.splitTextToSize(`✔ ${tip}`, pageWidth - 30);
    doc.text(splitTip, 16, y);
    y += splitTip.length * 4.5;
  });

  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(220, 38, 38);
  doc.text('Onde NUNCA Economizar:', 14, y);
  y += 6;

  estimate.aiInsights.neverSaveHere.forEach((tip) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(79, 70, 229);
    const splitTip = doc.splitTextToSize(`⚠ ${tip}`, pageWidth - 30);
    doc.text(splitTip, 16, y);
    y += splitTip.length * 4.5;
  });

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'Reforma 360 - Estimativas médias de mercado para planejamento prévio. Página ' + i + ' de ' + totalPages,
      pageWidth / 2,
      288,
      { align: 'center' }
    );
  }

  doc.save(`Reforma360_Estimativa_${estimate.roomType}_${estimate.areaM2}m2.pdf`);
}

export function exportProposalToPdf(proposal: ArchitectProposal) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Banner
  doc.setFillColor(15, 23, 42); // Slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('PROPOSTA TÉCNICA E COMERCIAL DE PROJETO & REFORMA', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text(`${proposal.designerName} | ${proposal.designerCompany || 'Escritório de Arquitetura & Design'}`, 14, 18);
  doc.text(`Data: ${new Date(proposal.createdAt).toLocaleDateString('pt-BR')}`, 14, 23);

  y = 38;

  // Client Info Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, y, pageWidth - 28, 22, 2, 2, 'F');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('DADOS DO CLIENTE E DO PROJETO', 20, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Cliente: ${proposal.clientName}  ${proposal.clientContact ? `(${proposal.clientContact})` : ''}`, 20, y + 12);
  doc.text(`Projeto: ${proposal.projectName}  |  Local: ${proposal.projectLocation || 'Residencial'}`, 20, y + 17);

  y += 30;

  // Scope Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Escopo e Objeto da Proposta', 14, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const scopeLines = doc.splitTextToSize(proposal.scopeSummary, pageWidth - 28);
  doc.text(scopeLines, 14, y);
  y += scopeLines.length * 4.5 + 4;

  // Deliverables
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Entregáveis Inclusos', 14, y);

  y += 6;
  proposal.deliverables.forEach((item) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const itemLines = doc.splitTextToSize(`✔  ${item}`, pageWidth - 30);
    doc.text(itemLines, 16, y);
    y += itemLines.length * 4.5;
  });

  y += 6;
  if (y > 230) {
    doc.addPage();
    y = 20;
  }

  // Investment & Fees
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Investimento & Honorários', 14, y);

  y += 6;
  doc.setFillColor(254, 243, 199); // Amber-100
  doc.roundedRect(14, y, pageWidth - 28, 20, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(146, 64, 14); // Amber-800
  doc.text('Honorários Profissionais Propostos:', 20, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(180, 83, 9);
  doc.text(`R$ ${proposal.professionalFee.toLocaleString('pt-BR')}`, 20, y + 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Estimativa global de obra (Mão de Obra + Materiais): R$ ${proposal.estimatedLaborAndMaterials.toLocaleString('pt-BR')}`, 100, y + 14);

  y += 26;

  // Payment Milestones
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('4. Condições e Etapas de Pagamento', 14, y);

  y += 6;
  proposal.paymentMilestones.forEach((m) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`• ${m.title} (${m.percent}% - R$ ${m.amount.toLocaleString('pt-BR')})`, 16, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`Momento: ${m.timing}`, 20, y + 4.5);
    y += 10;
  });

  y += 4;
  if (y > 235) {
    doc.addPage();
    y = 20;
  }

  // Terms & Warranty
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('5. Termos, Garantia e Validade', 14, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const termsLines = doc.splitTextToSize(proposal.warrantyAndTerms, pageWidth - 28);
  doc.text(termsLines, 14, y);

  y += termsLines.length * 4.5 + 16;

  // Signature lines
  if (y > 240) {
    doc.addPage();
    y = 30;
  }

  doc.setDrawColor(203, 213, 225);
  doc.line(20, y, 90, y);
  doc.line(120, y, 190, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(proposal.designerName, 55, y + 5, { align: 'center' });
  doc.text('Responsável Técnico', 55, y + 9, { align: 'center' });

  doc.text(proposal.clientName, 155, y + 5, { align: 'center' });
  doc.text('De Acordo do Cliente', 155, y + 9, { align: 'center' });

  doc.save(`Proposta_${proposal.clientName.replace(/\s+/g, '_')}_${proposal.projectName.replace(/\s+/g, '_')}.pdf`);
}
