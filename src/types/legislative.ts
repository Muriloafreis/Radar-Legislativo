export type House = 'camara' | 'senado' | 'congresso';

export type UrgencyLevel = 'urgencia_urgentissima' | 'urgencia' | 'prioridade' | 'ordinaria';

export type LegislativeTheme =
  | 'Economia & Tributação'
  | 'Segurança Pública & Justiça'
  | 'Saúde & Seguridade Social'
  | 'Meio Ambiente & Agro'
  | 'Educação & Inovação'
  | 'Direitos & Cidadania'
  | 'Infraestrutura & Energia';

export type ProjectStatus =
  | 'Em Votação no Plenário'
  | 'Pautado para Hoje'
  | 'Na Ordem do Dia'
  | 'Em Análise na CCJ'
  | 'Pronto para Pauta'
  | 'Aprovado na Casa Iniciadora'
  | 'Aguardando Sanção';

export interface InvolvedPolitician {
  id: string;
  name: string;
  role: 'Autor' | 'Relator' | 'Líder de Bancada' | 'Coautor';
  party: string;
  state: string;
  house: House;
  photoUrl: string;
  avatarFallback: string;
}

export interface VoteRecord {
  politicianId: string;
  politicianName: string;
  party: string;
  state: string;
  house: House;
  photoUrl: string;
  vote: 'SIM' | 'NÃO' | 'ABSTENÇÃO' | 'OBSTRUÇÃO';
  governmentOrientation: 'SIM' | 'NÃO' | 'LIBERADO' | 'NEUTRO';
  isGovernmentPlanAligned: boolean;
  coherenceStatus: 'COERENTE' | 'DIVERGENTE' | 'PRAGMÁTICO';
  coherenceExplanation: string;
  publicIdeologyDeclared: string;
}

export interface CitizenPlainExplanation {
  whatItIsSimple: string; // Explicação básica sem nenhum termo difícil
  howItAffectsYourLife: string; // Impacto concreto no bolso, emprego, compras ou dia a dia
  whoSupportsSays: string; // Por que quem apoia acha bom (em palavras fáceis)
  whoOpposesSays: string; // Por que quem critica é contra (em palavras fáceis)
  simpleKeyTerms: { term: string; definition: string }[]; // Termos complicados traduzidos
}

export interface LegislativeProject {
  id: string;
  code: string; // Ex: "PLP 68/2024" ou "PEC 45/2019"
  title: string;
  shortDescription: string;
  fullEmenta: string;
  citizenSummary: CitizenPlainExplanation;
  theme: LegislativeTheme;
  house: House;
  urgency: UrgencyLevel;
  urgencyLabel: string;
  status: ProjectStatus;
  presentationDate: string;
  lastUpdateDate: string;
  authorParty: string;
  keyPoliticians: InvolvedPolitician[];
  isVotingNow: boolean;
  isGovernmentPriority: boolean;
  governmentPosition: 'FAVORÁVEL' | 'CONTRÁRIO' | 'NEUTRO';
  impactSummary: string;
  totalVotes?: {
    yes: number;
    no: number;
    abstain: number;
    quorum: number;
  };
  votesHistory?: VoteRecord[];
  timeline: {
    date: string;
    step: string;
    location: string;
  }[];
}

export interface PoliticianProposal {
  id: string;
  code: string;
  title: string;
  theme: LegislativeTheme;
  year: number;
  status: string;
  summary: string;
  simpleExplanation: string; // Resumo para leigos sem termos difíceis
  isMainFlagship: boolean;
}

export interface PoliticianVoteSummary {
  projectId: string;
  projectCode: string;
  projectTitle: string;
  date: string;
  vote: 'SIM' | 'NÃO' | 'ABSTENÇÃO' | 'OBSTRUÇÃO';
  governmentPosition: 'SIM' | 'NÃO' | 'LIBERADO' | 'NEUTRO';
  partOfGovernmentPlan: boolean;
  isAlignedWithGovernment: boolean;
  coherenceRating: 'Alta Coerência' | 'Divergência Ideológica' | 'Voto Pragmático';
  coherenceExplanation: string;
  declaredStanceTopic: string;
}

export interface PoliticianProfile {
  id: string;
  name: string;
  officialName: string;
  house: House;
  party: string;
  state: string;
  role: string;
  photoUrl: string;
  avatarColor: string;
  declaredIdeology: string; // Ex: "Conservadorismo liberal, foco em responsabilidade fiscal e pauta da segurança"
  ideologyCategory: 'Direita' | 'Centro-Direita' | 'Centro' | 'Centro-Esquerda' | 'Esquerda';
  governmentAlignmentPercentage: number; // Ex: 18% para oposição dura, 92% para base
  partyFidelityPercentage: number; // Ex: 95%
  publicBanners: string[]; // Bandeiras públicas principais
  proposals: PoliticianProposal[];
  recentVotes: PoliticianVoteSummary[];
  attendanceRate: number; // Presença em plenário %
  bio: string;
  contactEmail: string;
}

export interface LegislativeAlert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'urgency' | 'voting_started' | 'vote_divergence' | 'proposal_approved';
  projectCode?: string;
  house: House;
  isRead: boolean;
}

export interface NotificationSettings {
  enableUrgencyAlerts: boolean;
  enableVotingLiveAlerts: boolean;
  enableIdeologyDivergenceAlerts: boolean;
  enableSound: boolean;
  selectedThemes: LegislativeTheme[];
  selectedHouses: House[];
}

export type PromiseStatus = 'cumprida' | 'em_andamento' | 'em_atraso' | 'nao_cumprida';

export interface GovernmentPromise {
  id: string;
  mandate: '2023-2026' | '2027-2030';
  axis: 'Economia & Emprego' | 'Combate à Fome & Social' | 'Tributação & Renda' | 'Educação & Juventude' | 'Meio Ambiente & Clima' | 'Trabalho & Previdência' | 'Saúde & SUS' | 'Direitos & Mulheres';
  title: string;
  tseDirectiveNumber: string; // Ex: "Diretriz 14" ou "Compromisso Eleitoral TSE"
  tseOfficialQuote: string; // Citação literal do documento registrado no TSE
  simpleCitizenSummary: string; // Resumo direto para quem é leigo
  status: PromiseStatus;
  statusLabel: string;
  completionPercentage: number; // 0% a 100%
  relatedLegislation?: string; // Ex: "EC 132/2023", "PLP 68/2024", "Lei 14.601"
  relatedProjectId?: string; // Se tem projeto no nosso radar para abrir modal
  concreteDeliveryDetails: string; // O que foi feito na prática
  pendingChallenges: string; // O que ainda falta ou onde está travado
  congressReaction: string; // Como o Congresso votou nessa pauta
  lastCheckDate: string;
}

export interface GovernmentPlanCycle {
  mandateId: '2023-2026' | '2027-2030';
  mandateTitle: string;
  candidateName: string;
  coalitionName: string;
  tseRegistrationDate: string;
  startDate: string;
  endDate: string;
  isCurrentMandate: boolean;
  totalPromises: number;
  completedCount: number;
  inProgressCount: number;
  delayedCount: number;
  notCompletedCount: number;
  promises: GovernmentPromise[];
}

export type PublicWorkStatus = 'planejamento' | 'em_andamento' | 'sendo_entregue' | 'paralisada';

export type PublicWorkCategory =
  | 'Transporte & Rodovias'
  | 'Saúde & Hospitais'
  | 'Educação & Creches'
  | 'Saneamento & Água'
  | 'Habitação (MCMV)'
  | 'Energia & Barragens'
  | 'Segurança Pública';

export interface PublicWork {
  id: string;
  name: string;
  description: string;
  simpleCitizenDescription: string;
  state: string; // UF: SP, RJ, MG, BA, etc.
  city: string; // São Paulo, Campinas, etc.
  status: PublicWorkStatus;
  statusLabel: string;
  investmentValue: number; // Em reais numérico
  investmentFormatted: string; // Ex: "R$ 450.000.000"
  progressPercentage: number; // 0% a 100%
  startDate: string;
  estimatedEndDate: string;
  daysRemaining: number; // Dias que restam para concluir (0 se entregue)
  category: PublicWorkCategory;
  fundingSource: 'Novo PAC / Governo Federal' | 'Emenda Parlamentar' | 'Convênio Federativo';
  parliamentarySponsor?: {
    id: string;
    name: string;
    party: string;
    state: string;
  };
  beneficiariesEstimate: string; // Ex: "Aproximadamente 420.000 moradores da região"
  executingEntity: string; // Ex: "DNIT / Ministério dos Transportes"
}

export type UrnaCargoId =
  | 'deputado_federal'
  | 'deputado_estadual'
  | 'senador_1'
  | 'senador_2'
  | 'governador'
  | 'presidente';

export interface ElectoralBallotChoice {
  cargoId: UrnaCargoId;
  cargoLabel: string;
  orderInUrna: number;
  digitsCount: number;
  candidateNumber: string;
  candidateName: string;
  party: string;
  keyReason?: string;
}



