import { GoogleGenAI } from '@google/genai';
import { LegislativeProject, PoliticianProfile, PoliticianVoteSummary } from '../types/legislative';

// Safe retrieval of API key
const apiKey = typeof process !== 'undefined' && process.env?.GEMINI_API_KEY
  ? process.env.GEMINI_API_KEY
  : (import.meta as unknown as { env: { VITE_GEMINI_API_KEY?: string } }).env.VITE_GEMINI_API_KEY || '';

let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Could not initialize Gemini client:', err);
  }
}

export async function explainProjectWithAI(project: LegislativeProject): Promise<string> {
  if (!aiClient) {
    return `Análise Cívica do ${project.code}:\n\n` +
      `1. O Que É: Trata-se de uma proposta sobre ${project.theme} voltada a "${project.shortDescription}".\n` +
      `2. Impacto no Cotidiano: ${project.impactSummary}\n` +
      `3. Relação com o Plano de Governo: A posição oficial do Poder Executivo é classificada como ${project.governmentPosition}. ` +
      (project.isGovernmentPriority ? 'Esta matéria é prioritária na agenda legislativa federal.' : 'Não compõe o núcleo imediato de prioridades do Executivo.');
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Você é um analista político sênior e especialista em direito legislativo brasileiro do portal Radar Legislativo.
Explique de forma imparcial, clara, direta e acessível ao cidadão comum brasileiro o seguinte projeto em tramitação no Congresso Nacional:

Código: ${project.code}
Título: ${project.title}
Ementa: ${project.fullEmenta}
Tema: ${project.theme}
Casa: ${project.house === 'senado' ? 'Senado Federal' : project.house === 'camara' ? 'Câmara dos Deputados' : 'Congresso Nacional'}
Urgência: ${project.urgencyLabel}
Posição do Governo: ${project.governmentPosition}

Estruture a resposta estritamente em 3 tópicos claros:
1. Resumo em linguagem cidadã (o que muda na prática).
2. Principais argumentos de quem apoia vs. de quem é contra.
3. Alinhamento com o Plano de Governo vigente e impacto econômico/social.
Responda em português com elegância e neutralidade analítica.`,
    });

    return response.text || 'Análise indisponível no momento.';
  } catch (error) {
    console.warn('Gemini API call failed, falling back to structured synthesis:', error);
    return `Síntese Analítica do ${project.code}:\n\n` +
      `• O Que Muda: ${project.shortDescription}\n` +
      `• Ponto Central de Debate: ${project.impactSummary}\n` +
      `• Orientação Federal: Matéria com status ${project.governmentPosition} pela liderança de governo.`;
  }
}

export async function auditPoliticianCoherenceWithAI(
  politician: PoliticianProfile,
  vote: PoliticianVoteSummary
): Promise<string> {
  if (!aiClient) {
    return `Auditoria de Coerência: O parlamentar ${politician.name} (${politician.party}/${politician.state}) declarou ideologia voltada a "${politician.declaredIdeology}". ` +
      `Em relação ao ${vote.projectCode} (${vote.projectTitle}), seu voto foi "${vote.vote}". ` +
      `Avaliação: ${vote.coherenceRating}. Contexto: ${vote.coherenceExplanation}`;
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Você é um auditor de transparência e ciência política comparada do Radar Legislativo Brasil.
Faça uma análise rigorosa e neutra de coerência ideológica e de alinhamento com o plano de governo para o seguinte caso:

Parlamentar: ${politician.name} (${politician.party} - ${politician.state})
Casa: ${politician.house === 'senado' ? 'Senado Federal' : 'Câmara dos Deputados'}
Ideologia declarada publicamente pelo parlamentar: "${politician.declaredIdeology}"
Bandeiras públicas de mandato: ${politician.publicBanners.join(', ')}

Matéria votada: ${vote.projectCode} - ${vote.projectTitle}
Voto do parlamentar: ${vote.vote}
Posição/Orientação do Governo Federal: ${vote.governmentPosition}
Faz parte do Plano de Governo Oficial?: ${vote.partOfGovernmentPlan ? 'SIM' : 'NÃO'}

Por favor, elabore um parecer conciso (máximo 150 palavras) abordando:
1. Grau de coerência com o discurso público do parlamentar e suas bandeiras.
2. Análise de alinhamento ou rompimento com a agenda do Governo Federal.
3. Se o voto reflete compromisso partidário, pressão regional ou posicionamento individual.
Mantenha tom estritamente jornalístico, analítico e sem viés partidário.`,
    });

    return response.text || 'Análise de auditoria concluída com os dados cadastrais.';
  } catch (error) {
    console.warn('Gemini API call failed for audit:', error);
    return `Parecer Cívico: Voto ${vote.vote} no projeto ${vote.projectCode}. Classificação: ${vote.coherenceRating}. ${vote.coherenceExplanation}`;
  }
}
