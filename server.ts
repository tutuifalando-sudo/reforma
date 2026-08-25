import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI lazily
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Reforma 360', timestamp: new Date().toISOString() });
});

// Download endpoints for Netlify ZIP
app.get('/api/download-netlify-zip', (req, res) => {
  const file = path.join(process.cwd(), 'dist.zip');
  res.download(file, 'reforma360-netlify-dist.zip');
});

app.get('/api/download-source-zip', (req, res) => {
  const file = path.join(process.cwd(), 'projeto-completo.zip');
  res.download(file, 'reforma360-projeto-completo.zip');
});

// Endpoint: AI Deep Estimate & Smart Breakdown
app.post('/api/gemini/estimate', async (req, res) => {
  try {
    const { roomType, areaM2, style, scope, userBudget, region, customWishes } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback',
        aiInsights: {
          budgetVerdict: userBudget > 0 ? (userBudget >= 15000 ? 'dentro' : 'alerta') : 'dentro',
          budgetAnalysis: `Análise automatizada: Para reforma de ${roomType} (${areaM2}m² no estilo ${style}), a estimativa média brasileira é compatível com compras organizadas e mão de obra qualificada.`,
          whereToSave: [
            'Negocie desconto de 5% a 10% para compras à vista em materiais brutos (cimento, argamassa, tubos).',
            'Padronize tamanhos de porcelanato (ex: 80x80) para diminuir quebras e perdas de corte.',
            'Mantenha pontos de esgoto e água no mesmo local para evitar quebrar laje e paredes desnecessariamente.',
          ],
          neverSaveHere: [
            'Nunca economize em impermeabilização de áreas molhadas e ralos.',
            'Nunca use fiação elétrica de segunda linha ou disjuntores genéricos.',
            'Nunca pague 100% da mão de obra adiantado.',
          ],
          timelineSummary: 'Tempo médio estimado: 3 a 5 semanas úteis.',
          keyRecommendations: [
            'Contrate mão de obra com contrato formal e cronograma de pagamentos.',
            'Compre 15% a mais de revestimento para garantir recortes e reserva técnica.',
          ],
        },
      });
    }

    const prompt = `Você é o Engenheiro Especialista em Reformas Residenciais e Orçamentos da Reforma 360 no Brasil.
Analise este projeto de reforma e gere recomendações ultra práticas e precisas:
- Ambiente: ${roomType}
- Área: ${areaM2} m²
- Estilo: ${style}
- Escopo da Obra: ${scope}
- Orçamento do Cliente: R$ ${userBudget || 'Não informado'}
- Região do Brasil: ${region}
- Desejos Especiais: ${customWishes || 'Nenhum informado'}

Retorne APENAS um JSON estruturado seguindo o schema exato.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            budgetVerdict: {
              type: Type.STRING,
              description: 'Um de: dentro, alerta, insuficiente, confortavel',
            },
            budgetAnalysis: {
              type: Type.STRING,
              description: 'Análise aprofundada e sincera sobre a viabilidade financeira e custos de mercado.',
            },
            whereToSave: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Dicas específicas e práticas de onde economizar sem perder qualidade.',
            },
            neverSaveHere: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Pontos críticos onde JAMAIS se deve economizar (riscos de infiltração, incêndio, etc.).',
            },
            timelineSummary: {
              type: Type.STRING,
              description: 'Resumo do prazo real com alertas sobre imprevistos.',
            },
            keyRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Recomendações técnicas indispensáveis para o cliente ou profissional.',
            },
          },
          required: [
            'budgetVerdict',
            'budgetAnalysis',
            'whereToSave',
            'neverSaveHere',
            'timelineSummary',
            'keyRecommendations',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, source: 'gemini', aiInsights: parsed });
  } catch (error: any) {
    console.error('Error generating AI estimate:', error);
    return res.status(500).json({ error: error.message || 'Erro ao processar estimativa IA' });
  }
});

// Endpoint: AI Architect / Contractor Proposal Generator (Plano Profissional Reforma 360+)
app.post('/api/gemini/proposal', async (req, res) => {
  try {
    const {
      clientName,
      projectName,
      roomType,
      areaM2,
      style,
      scope,
      designerName,
      designerRole,
      professionalFee,
      estimatedMaterialsAndLabor,
    } = req.body;

    const ai = getAI();

    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback',
        proposal: {
          scopeSummary: `Proposta técnica para reforma de ${roomType} com área aproximada de ${areaM2}m², executada sob o padrão estilístico ${style}. Abrange coordenação de mão de obra, detalhamento de paginação e assessoria de compras.`,
          deliverables: [
            'Levantamento métrico cadastral e diagnóstico estrutural',
            'Planta de demolição e construção com layout funcional',
            'Projeto executivo de pontos elétricos, iluminação e hidráulica',
            'Paginação de pisos e revestimentos com detalhamento de bancadas',
            'Caderno de especificações de materiais e lista de compras quantificada',
            'Visitas técnicas de acompanhamento e fiscalização de etapas',
          ],
          paymentMilestones: [
            { title: 'Entrada e Início dos Projetos Executivos', percent: 30, amount: professionalFee * 0.3, timing: 'Na assinatura do contrato' },
            { title: 'Aprovação do Projeto e Início da Obra', percent: 40, amount: professionalFee * 0.4, timing: 'Após demolição e aprovação do layout' },
            { title: 'Conclusão dos Revestimentos e Vistoria Final', percent: 30, amount: professionalFee * 0.3, timing: 'Na entrega das chaves e vistoria pós-obra' },
          ],
          warrantyAndTerms: 'Garantia técnica de 90 dias para ajustes executivos e conformidade com as normas ABNT NBR 16280 para reformas em edificações.',
        },
      });
    }

    const prompt = `Você é um arquiteto e consultor sênior de projetos de reforma no Brasil.
Crie o escopo profissional de proposta comercial para cliente:
- Cliente: ${clientName}
- Projeto: ${projectName}
- Tipo: ${roomType} (${areaM2} m²)
- Estilo: ${style}
- Escopo: ${scope}
- Responsável Técnico: ${designerName} (${designerRole || 'Arquiteto / Designer de Interiores'})
- Honorários Profissionais Propostos: R$ ${professionalFee}
- Valor Estimado de Obra (Mão de Obra + Materiais): R$ ${estimatedMaterialsAndLabor}

Gere uma proposta de alto padrão, profissional, clara e juridicamente protetiva para ambas as partes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scopeSummary: {
              type: Type.STRING,
              description: 'Resumo executivo do escopo e valor agregado do serviço.',
            },
            deliverables: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Lista de entregáveis concretos (plantas, visitas, caderno de compras, etc.).',
            },
            paymentMilestones: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  percent: { type: Type.NUMBER },
                  amount: { type: Type.NUMBER },
                  timing: { type: Type.STRING },
                },
                required: ['title', 'percent', 'amount', 'timing'],
              },
            },
            warrantyAndTerms: {
              type: Type.STRING,
              description: 'Condições de validade, termos da ART/RRT e responsabilidade técnica.',
            },
          },
          required: ['scopeSummary', 'deliverables', 'paymentMilestones', 'warrantyAndTerms'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, source: 'gemini', proposal: parsed });
  } catch (error: any) {
    console.error('Error generating AI proposal:', error);
    return res.status(500).json({ error: error.message || 'Erro ao gerar proposta profissional' });
  }
});

// Endpoint: AI Master Builder Chat / Q&A Consultant
app.post('/api/gemini/ask-expert', async (req, res) => {
  try {
    const { question, projectContext } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.json({
        answer: 'Dica do Especialista: Em reformas, sempre compre materiais com 10% a 15% de margem e exija contrato com datas e pagamentos atrelados a cada etapa concluída para proteger seu bolso.',
      });
    }

    const prompt = `Você é o Mestre de Obras e Engenheiro Consultor do aplicativo Reforma 360 no Brasil.
Contexto do Projeto Atual do Usuário:
${JSON.stringify(projectContext || {}, null, 2)}

Pergunta do Usuário: "${question}"

Responda de forma direta, altamente prática, simpática e profissional, com dados reais do mercado de construção civil brasileiro (técnicas construtivas, marcas recomendadas, normas ABNT, custos aproximados e macetes de obra).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Você é um consultor prático e experiente de reformas no Brasil. Seja claro, empático, direto e com foco em economia e qualidade.',
      },
    });

    return res.json({ answer: response.text || 'Não foi possível obter resposta no momento.' });
  } catch (error: any) {
    console.error('Error in ask-expert:', error);
    return res.status(500).json({ error: error.message || 'Erro ao consultar especialista' });
  }
});

// Vite / Static setup
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Reforma 360 Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
