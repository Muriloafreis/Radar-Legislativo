import { LegislativeProject, PoliticianProfile, LegislativeAlert } from '../types/legislative';

export interface PoliticalTermGlossary {
  term: string;
  simpleMeaning: string;
  practicalExample: string;
}

export const POLITICAL_GLOSSARY: PoliticalTermGlossary[] = [
  {
    term: 'PL (Projeto de Lei)',
    simpleMeaning: 'Uma proposta para criar uma nova lei comum ou mudar uma lei que já existe no país.',
    practicalExample: 'Por exemplo, uma lei que obriga as empresas de aplicativo a fornecerem seguro para entregadores.'
  },
  {
    term: 'PEC (Proposta de Emenda à Constituição)',
    simpleMeaning: 'A proposta mais importante e difícil de aprovar, pois muda a própria Constituição (o livro de regras máximas do Brasil).',
    practicalExample: 'Precisa ser votada duas vezes na Câmara e duas no Senado com o voto favorável de 3/5 de todos os deputados e senadores.'
  },
  {
    term: 'PLP (Projeto de Lei Complementar)',
    simpleMeaning: 'Uma lei especial feita para explicar e detalhar algum artigo da Constituição Federal (como regras de impostos).',
    practicalExample: 'A Reforma Tributária precisa de um PLP para dizer qual será a taxa de imposto exata em cada produto.'
  },
  {
    term: 'Relator',
    simpleMeaning: 'O deputado ou senador escolhido para estudar o projeto, ouvir as partes e escrever o texto final que será votado.',
    practicalExample: 'É ele quem decide se aceita sugestões (emendas) de outros colegas ou se muda partes do texto.'
  },
  {
    term: 'Regime de Urgência',
    simpleMeaning: 'Um "fura-fila" oficial: permite que o projeto seja votado direto no Plenário, sem precisar passar meses em várias comissões.',
    practicalExample: 'Usado quando o Congresso ou o Governo consideram que o assunto é urgente para o país.'
  },
  {
    term: 'Quórum',
    simpleMeaning: 'O número mínimo de deputados ou senadores que precisam estar presentes para que a votação tenha validade.',
    practicalExample: 'Na Câmara, são necessários pelo menos 257 deputados de 513 presentes no plenário.'
  },
  {
    term: 'Obstrução',
    simpleMeaning: 'Uma tática legal da oposição para atrasar ou tentar cancelar a votação fazendo discursos longos e pedidos de adiamento.',
    practicalExample: 'Quando um partido não quer que uma lei passe hoje, ele "obstrui" para ganhar tempo e tentar negociar.'
  },
  {
    term: 'Plano de Governo',
    simpleMeaning: 'O conjunto de compromissos e promessas oficiais registradas pelo Presidente da República eleito.',
    practicalExample: 'Se o governo prometeu isenção de IR até 5 mil, projetos nesse sentido fazem parte do plano de governo.'
  }
];

export const LEGISLATIVE_PROJECTS: LegislativeProject[] = [
  {
    id: 'plp-68-2024',
    code: 'PLP 68/2024',
    title: 'Regulamentação da Reforma Tributária (IBS e CBS)',
    shortDescription: 'Substitui 5 impostos complicados por 2 impostos únicos, zera imposto da comida básica e cria cashback para famílias de baixa renda.',
    fullEmenta: 'Institui o Imposto sobre Bens e Serviços (IBS), a Contribuição Social sobre Bens e Serviços (CBS) e o Imposto Seletivo (IS), estabelece a cesta básica nacional de alimentos com alíquota zero, define o regime de devolução (cashback) para famílias de baixa renda e cria o Comitê Gestor do IBS.',
    citizenSummary: {
      whatItIsSimple: 'Hoje o Brasil tem um dos sistemas de impostos mais confusos do planeta (PIS, Cofins, IPI, ICMS e ISS). Esta proposta junta todos esses 5 impostos em apenas 2 impostos unificados (um federal chamado CBS e outro estadual/municipal chamado IBS). Além disso, coloca imposto zero para os alimentos essenciais.',
      howItAffectsYourLife: 'No supermercado, alimentos básicos como arroz, feijão, leite, pão e carnes terão imposto ZERO. Famílias cadastradas no CadÚnico receberão parte do imposto pago de volta direto na conta (o "cashback do povo"). Por outro lado, produtos que fazem mal à saúde ou ao planeta (como cigarros, bebidas alcoólicas e refrigerantes) pagarão um imposto extra chamado "Imposto do Pecado".',
      whoSupportsSays: 'Acaba com a burocracia sem fim para quem produz e vende, reduz o custo das empresas com advogados e contadores, barateia a comida dos mais pobres e deixa claro na nota fiscal exatamente quanto você paga de imposto em tudo.',
      whoOpposesSays: 'Prestadores de serviços (médicos, advogados, escolas particulares, academias, salões de beleza) alertam que sua alíquota de imposto pode subir, e críticos temem que a taxa geral final do Brasil (estimada em torno de 26,5% a 28%) fique entre as maiores do mundo.',
      simpleKeyTerms: [
        { term: 'IVA (Imposto sobre Valor Agregado)', definition: 'O tipo de imposto usado em mais de 170 países onde cada empresa só paga imposto sobre o que ela realmente acrescentou de valor ao produto.' },
        { term: 'Cashback do Povo', definition: 'Devolução de parte dos impostos pagos na conta de luz, água e compras para famílias de baixa renda.' },
        { term: 'Imposto Seletivo', definition: 'Apelidado de "imposto do pecado", é uma sobretaxa aplicada em coisas que prejudicam a saúde pública ou o meio ambiente.' }
      ]
    },
    theme: 'Economia & Tributação',
    house: 'camara',
    urgency: 'urgencia_urgentissima',
    urgencyLabel: 'Urgência Urgentíssima (Art. 155)',
    status: 'Em Votação no Plenário',
    presentationDate: '24/04/2024',
    lastUpdateDate: '25/10/2026 às 15:42',
    authorParty: 'Executivo Federal',
    isVotingNow: true,
    isGovernmentPriority: true,
    governmentPosition: 'FAVORÁVEL',
    impactSummary: 'Simplificação tributária unificando 5 tributos em 2 IVA (dual), fim da cumulatividade, alíquota de referência estimada em 26,5% e isenção total da cesta básica de alimentos.',
    totalVotes: {
      yes: 336,
      no: 142,
      abstain: 4,
      quorum: 482,
    },
    keyPoliticians: [
      {
        id: 'hugo-motta',
        name: 'Hugo Motta',
        role: 'Líder de Bancada',
        party: 'Republicanos',
        state: 'PB',
        house: 'camara',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'HM'
      },
      {
        id: 'gleisi-hoffmann',
        name: 'Gleisi Hoffmann',
        role: 'Líder de Bancada',
        party: 'PT',
        state: 'PR',
        house: 'camara',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'GH'
      },
      {
        id: 'marcel-van-hattem',
        name: 'Marcel van Hattem',
        role: 'Relator',
        party: 'NOVO',
        state: 'RS',
        house: 'camara',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'MV'
      }
    ],
    timeline: [
      { date: '25/10/2026 às 14:30', step: 'Início da discussão de destaques em Plenário', location: 'Plenário Ulysses Guimarães' },
      { date: '10/07/2024', step: 'Aprovação do texto-base por 336 a 142 votos', location: 'Câmara dos Deputados' },
      { date: '04/07/2024', step: 'Parecer do Grupo de Trabalho lido em Plenário', location: 'Comissão Especial' },
      { date: '25/04/2024', step: 'Entrada na Câmara dos Deputados sob regime de urgência', location: 'Mesa Diretora' }
    ]
  },
  {
    id: 'pec-6-2024',
    code: 'PEC 6/2024',
    title: 'Fim da Escala 6x1 e Redução da Jornada para 36 Horas',
    shortDescription: 'Acaba com o modelo de trabalhar 6 dias para folgar apenas 1, diminuindo a jornada de 44h para 36h semanais (4 dias de trabalho).',
    fullEmenta: 'Altera o inciso XIII do art. 7º da Constituição Federal para dispor sobre a duração do trabalho normal não superior a 8 horas diárias e 36 horas semanais, com jornada de trabalho de quatro dias por semana, facultada a compensação de horários e a redução de jornada, mediante acordo ou convenção coletiva.',
    citizenSummary: {
      whatItIsSimple: 'Uma mudança na Constituição que quer proibir a famosa escala "6 por 1" (trabalhar de segunda a sábado e ter só o domingo de folga). O objetivo é que o trabalhador tenha até 3 dias de descanso na semana (escala 4x3) e trabalhe no máximo 36 horas em vez das atuais 44 horas semanais, sem diminuir o salário.',
      howItAffectsYourLife: 'Quem trabalha no comércio, shopping, restaurantes, supermercados e indústrias passaria a ter mais tempo livre com a família, estudos e descanso. O salário mensal não pode ser reduzido por causa dessa diminuição de horas.',
      whoSupportsSays: 'A escala 6x1 gera exaustão mental (burnout), adoece o trabalhador e rouba o tempo de convivência familiar. Países desenvolvidos já testaram a semana de 4 dias e comprovaram que as pessoas trabalham mais motivadas e produzem o mesmo ou até mais.',
      whoOpposesSays: 'Donos de padarias, lojas, farmácias e pequenos negócios dizem que não têm dinheiro para contratar mais funcionários para cobrir os dias de folga, o que poderia forçar aumento de preços para o consumidor ou levar a demissões e contratações informais sem carteira assinada.',
      simpleKeyTerms: [
        { term: 'Escala 6x1', definition: 'Rotina onde a pessoa trabalha 6 dias seguidos e descansa apenas 1 dia na semana.' },
        { term: 'Jornada Constitucional', definition: 'O limite máximo de horas que uma empresa pode exigir que um funcionário trabalhe por semana (hoje é 44h).' }
      ]
    },
    theme: 'Direitos & Cidadania',
    house: 'camara',
    urgency: 'ordinaria',
    urgencyLabel: 'Tramitação Ordinária',
    status: 'Em Análise na CCJ',
    presentationDate: '13/11/2024',
    lastUpdateDate: '25/10/2026 às 14:50',
    authorParty: 'PSOL / Frente Ampla',
    isVotingNow: false,
    isGovernmentPriority: false,
    governmentPosition: 'FAVORÁVEL',
    impactSummary: 'Forte mobilização popular e nas redes sociais; debate sobre qualidade de vida e produtividade versus custos de reposição em pequenas empresas e comércio.',
    keyPoliticians: [
      {
        id: 'erika-hilton',
        name: 'Erika Hilton',
        role: 'Autor',
        party: 'PSOL',
        state: 'SP',
        house: 'camara',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'EH'
      },
      {
        id: 'kim-kataguiri',
        name: 'Kim Kataguiri',
        role: 'Líder de Bancada',
        party: 'União',
        state: 'SP',
        house: 'camara',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'KK'
      }
    ],
    timeline: [
      { date: '25/10/2026 às 14:00', step: 'Protocolada com 216 assinaturas e admitida na Secretaria da Mesa', location: 'Mesa da Câmara' },
      { date: '15/11/2024', step: 'Encaminhada para a Comissão de Constituição e Justiça', location: 'CCJC - Câmara' }
    ]
  },
  {
    id: 'pec-45-2023',
    code: 'PEC 45/2023',
    title: 'PEC das Drogas e Segurança Pública no Art. 5º',
    shortDescription: 'Coloca na Constituição que é crime portar qualquer quantidade de droga, em reação à decisão do STF sobre porte de maconha.',
    fullEmenta: 'Altera o art. 5º da Constituição Federal para prever como mandamento fundamental a ilicitude do porte e da posse de drogas em qualquer quantidade, sem autorização ou em desacordo com determinação legal, observada a distinção entre traficante e usuário.',
    citizenSummary: {
      whatItIsSimple: 'O Supremo Tribunal Federal (STF) decidiu que portar até 40 gramas de maconha para consumo próprio não deve ser crime de cadeia, mas infração administrativa. Como resposta a isso, o Congresso aprovou esta proposta na Constituição afirmando com todas as letras: portar QUALQUER quantidade de qualquer droga ilícita continua sendo crime no Brasil.',
      howItAffectsYourLife: 'Se a polícia flagrar alguém na rua com cigarro de maconha ou qualquer quantidade de substância proibida, a pessoa continuará sendo conduzida à delegacia e responderá a processo penal, mas com penas alternativas (como prestação de serviços à comunidade) em vez de prisão fechada para usuários.',
      whoSupportsSays: 'Argumenta que liberar porte estimula o consumo entre jovens, financia o crime organizado que vende a droga e que cabe exclusivamente aos deputados e senadores eleitos pelo povo decidir as leis penais, e não a juízes do STF.',
      whoOpposesSays: 'Defensores dos direitos humanos e da saúde afirmam que prender ou fichar usuários lota as cadeias, atinge principalmente jovens negros e pobres da periferia e não acaba com as facções, além de tratar vício como caso de polícia em vez de saúde médica.',
      simpleKeyTerms: [
        { term: 'Descriminalização', definition: 'Quando algo deixa de ser considerado crime penal (passa a ser como levar uma multa de trânsito ou passar por tratamento médico).' },
        { term: 'Infração Administrativa', definition: 'Uma regra que gera advertência ou curso educativo, mas sem ficha criminal ou risco de prisão.' }
      ]
    },
    theme: 'Segurança Pública & Justiça',
    house: 'camara',
    urgency: 'prioridade',
    urgencyLabel: 'Prioridade',
    status: 'Em Análise na CCJ',
    presentationDate: '12/09/2023',
    lastUpdateDate: '25/10/2026 às 11:20',
    authorParty: 'Senado Federal (Iniciativa)',
    isVotingNow: false,
    isGovernmentPriority: false,
    governmentPosition: 'CONTRÁRIO',
    impactSummary: 'Conflito direto com a tese do STF sobre descriminalização do porte de até 40g de maconha para uso pessoal; debate sobre superlotação carcerária e autonomia de poderes.',
    totalVotes: {
      yes: 53,
      no: 9,
      abstain: 1,
      quorum: 63,
    },
    keyPoliticians: [
      {
        id: 'rodrigo-pacheco',
        name: 'Rodrigo Pacheco',
        role: 'Autor',
        party: 'PSD',
        state: 'MG',
        house: 'senado',
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'RP'
      },
      {
        id: 'sergio-moro',
        name: 'Sergio Moro',
        role: 'Líder de Bancada',
        party: 'União',
        state: 'PR',
        house: 'senado',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'SM'
      },
      {
        id: 'erika-hilton',
        name: 'Erika Hilton',
        role: 'Líder de Bancada',
        party: 'PSOL',
        state: 'SP',
        house: 'camara',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'EH'
      }
    ],
    timeline: [
      { date: '25/10/2026 às 10:00', step: 'Audiência pública com peritos e juristas na CCJ', location: 'CCJC - Câmara' },
      { date: '16/04/2024', step: 'Aprovada no Senado Federal em 2º turno (53 x 9)', location: 'Plenário do Senado' }
    ]
  },
  {
    id: 'pl-81-2024',
    code: 'PL 81/2024',
    title: 'Nova Isenção do Imposto de Renda Pessoa Física (IRPF)',
    shortDescription: 'Garante que quem ganha até dois salários mínimos (R$ 2.824) não pague nada de Imposto de Renda na fonte.',
    fullEmenta: 'Altera os valores da tabela progressiva mensal do Imposto sobre a Renda da Pessoa Física (IRPF) para isentar rendimentos até dois salários mínimos vigentes, criando desconto simplificado obrigatório e estipulando diretrizes para a isenção de até R$ 5.000,00 até o fim da legislatura.',
    citizenSummary: {
      whatItIsSimple: 'A tabela do Imposto de Renda ficou anos congelada sem acompanhar a inflação. Este projeto garante por lei que qualquer trabalhador, aposentado ou autônomo que ganhe até 2 salários mínimos por mês (atualmente R$ 2.824,00) fique totalmente isento de ter imposto mordido no holerite.',
      howItAffectsYourLife: 'Sobram mais reais no bolso todo final de mês para quem ganha até 2 salários. Cerca de 15,8 milhões de brasileiros deixam de pagar imposto de renda ou passam a pagar uma quantia bem menor.',
      whoSupportsSays: 'É justiça com quem ganha menos: cobrar imposto de quem ganha R$ 2.800 é tirar comida da mesa do trabalhador. A perda de arrecadação do governo é compensada cobrando mais impostos de bilionários com fundos offshore e investimentos no exterior.',
      whoOpposesSays: 'A maioria dos parlamentares apoia a isenção, mas setores da oposição cobram que a promessa de campanha de isentar até R$ 5.000,00 mensais seja cumprida logo, sem adiar para os últimos anos de mandato.',
      simpleKeyTerms: [
        { term: 'Tabela Progressiva', definition: 'A tabela que define: quem ganha pouco não paga nada; quem ganha um pouco mais paga 7,5%, 15%, 22,5% até o teto de 27,5%.' },
        { term: 'Retenção na Fonte', definition: 'Aquele desconto de imposto que já vem subtraído direto no seu contra-cheque antes do salário cair no banco.' }
      ]
    },
    theme: 'Economia & Tributação',
    house: 'senado',
    urgency: 'prioridade',
    urgencyLabel: 'Prioridade',
    status: 'Aprovado na Casa Iniciadora',
    presentationDate: '15/01/2024',
    lastUpdateDate: 'Ontem às 16:40',
    authorParty: 'Executivo Federal',
    isVotingNow: false,
    isGovernmentPriority: true,
    governmentPosition: 'FAVORÁVEL',
    impactSummary: 'Beneficia diretamente mais de 15,8 milhões de trabalhadores com isenção imediata de impostos na fonte; custo fiscal compensado por tributação de fundos exclusivos e offshores.',
    keyPoliticians: [
      {
        id: 'randolfe-rodrigues',
        name: 'Randolfe Rodrigues',
        role: 'Líder de Bancada',
        party: 'PT',
        state: 'AP',
        house: 'senado',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'RR'
      },
      {
        id: 'rogerio-marinho',
        name: 'Rogério Marinho',
        role: 'Líder de Bancada',
        party: 'PL',
        state: 'RN',
        house: 'senado',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'RM'
      }
    ],
    timeline: [
      { date: 'Ontem 16:00', step: 'Recebido na Comissão de Assuntos Econômicos do Senado', location: 'CAE - Senado' },
      { date: '12/03/2024', step: 'Aprovado por unanimidade na Câmara dos Deputados', location: 'Câmara dos Deputados' }
    ]
  },
  {
    id: 'pl-2630-2020',
    code: 'PL 2630/2020',
    title: 'Marco da Integridade Digital (PL das Redes Sociais)',
    shortDescription: 'Obriga redes sociais (Instagram, TikTok, X, WhatsApp) a removerem crimes e mentiras graves sob pena de multas milionárias.',
    fullEmenta: 'Institui a Lei Brasileira de Liberdade, Responsabilidade e Transparência na Internet, estabelecendo deveres de cuidado às big techs, transparência em algoritmos de recomendação, salvaguardas eleitorais contra deepfakes e remuneração de conteúdo jornalístico.',
    citizenSummary: {
      whatItIsSimple: 'Cria regras firmes para as grandes empresas de tecnologia (como Google, Meta, TikTok e X/Twitter). Elas passam a ter a obrigação de agir rápido para tirar do ar golpes financeiros, ameaças de ataques a escolas, abusos infantis e notícias comprovadamente falsas espalhadas em massa com uso de robôs ou inteligência artificial (deepfakes).',
      howItAffectsYourLife: 'Diminui a quantidade de perfis falsos tentando dar golpes pelo WhatsApp e redes sociais. Além disso, quando vídeos ou fotos suas forem adulterados por inteligência artificial, você terá canais rápidos para exigir a remoção imediata.',
      whoSupportsSays: 'A internet não pode ser terra sem lei. Redes sociais lucram bilhões com posts polêmicos e sensacionalistas e precisam ser responsabilizadas quando facilitam crimes, massacres e linchamentos virtuais.',
      whoOpposesSays: 'Críticos e parlamentares da oposição afirmam que o projeto abre espaço para censura política prévia, pois órgãos do governo poderiam pressionar as plataformas a derrubar opiniões legítimas ou críticas que desagradem aos governantes.',
      simpleKeyTerms: [
        { term: 'Big Techs', definition: 'As gigantes multinacionais de tecnologia donas das principais redes do mundo (Google, Meta, Apple, etc.).' },
        { term: 'Deepfake', definition: 'Vídeos ou áudios adulterados por inteligência artificial para colocar palavras falsas na boca de pessoas reais.' }
      ]
    },
    theme: 'Educação & Inovação',
    house: 'camara',
    urgency: 'urgencia_urgentissima',
    urgencyLabel: 'Urgência Urgentíssima',
    status: 'Pronto para Pauta',
    presentationDate: '01/06/2020',
    lastUpdateDate: 'Ontem às 18:30',
    authorParty: 'Cidadania / Relatoria Mista',
    isVotingNow: false,
    isGovernmentPriority: true,
    governmentPosition: 'FAVORÁVEL',
    impactSummary: 'Multas de até R$ 50 milhões por dia para plataformas que descumprirem ordens judiciais de remoção; grande polarização sobre liberdade de expressão versus combate a crimes virtuais.',
    keyPoliticians: [
      {
        id: 'tabata-amaral',
        name: 'Tabata Amaral',
        role: 'Coautor',
        party: 'PSB',
        state: 'SP',
        house: 'camara',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'TA'
      },
      {
        id: 'nikolas-ferreira',
        name: 'Nikolas Ferreira',
        role: 'Líder de Bancada',
        party: 'PL',
        state: 'MG',
        house: 'camara',
        photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'NF'
      }
    ],
    timeline: [
      { date: 'Ontem 18:00', step: 'Criação de Grupo de Trabalho para consolidação de novo substitutivo', location: 'Mesa da Câmara' },
      { date: '25/04/2023', step: 'Aprovação de requerimento de urgência em Plenário', location: 'Plenário da Câmara' }
    ]
  },
  {
    id: 'pl-182-2024',
    code: 'PL 182/2024',
    title: 'Mercado Brasileiro de Redução de Emissões de Carbono',
    shortDescription: 'Cria um sistema onde indústrias poluentes pagam quem mantém florestas e árvores em pé no Brasil.',
    fullEmenta: 'Institui o Sistema Brasileiro de Comércio de Emissões de Gases de Efeito Estufa (SBCE), fixando limites para emissões de gases poluentes por indústrias que emitem mais de 25 mil toneladas por ano, criando o mercado regulado e voluntário de créditos de preservação florestal.',
    citizenSummary: {
      whatItIsSimple: 'É como uma feira onde a "moeda" é a preservação da natureza. Fábricas que soltam muita fumaça e fumaça poluente no ar terão um limite obrigatório. Se poluírem mais que o permitido, serão obrigadas a comprar "créditos" de quem preserva árvores, planta florestas ou cuida do meio ambiente.',
      howItAffectsYourLife: 'Traz bilhões de reais de investidores de fora para o Brasil, gera empregos verdes no campo e ajuda a diminuir o aquecimento global, secas extremas e inundações que afetam as cidades.',
      whoSupportsSays: 'O Brasil tem a maior floresta tropical do mundo. Com essa lei, o fazendeiro, o indígena e o ribeirinho ganham dinheiro legítimo para proteger a mata em vez de derrubá-la para virar pasto.',
      whoOpposesSays: 'Representantes de indústrias tradicionais temiam aumento nos custos de produção do aço e do cimento, o que foi amenizado no texto final excluindo produtores rurais de metas compulsórias rígidas.',
      simpleKeyTerms: [
        { term: 'Crédito de Carbono', definition: 'Um certificado que comprova que 1 tonelada de gás poluente deixou de ser lançada na atmosfera graças a árvores preservadas.' },
        { term: 'Descarbonização', definition: 'A transição para formas de energia e produção que não poluem o planeta.' }
      ]
    },
    theme: 'Meio Ambiente & Agro',
    house: 'senado',
    urgency: 'urgencia',
    urgencyLabel: 'Regime de Urgência',
    status: 'Na Ordem do Dia',
    presentationDate: '08/03/2024',
    lastUpdateDate: '25/10/2026 às 14:15',
    authorParty: 'Senado / Mista',
    isVotingNow: false,
    isGovernmentPriority: true,
    governmentPosition: 'FAVORÁVEL',
    impactSummary: 'Posiciona o Brasil para a COP30 com mercado de bilhões de dólares em títulos verdes e preservação da Amazônia e Cerrado.',
    totalVotes: {
      yes: 62,
      no: 11,
      abstain: 2,
      quorum: 75,
    },
    keyPoliticians: [
      {
        id: 'davi-alcolumbre',
        name: 'Davi Alcolumbre',
        role: 'Líder de Bancada',
        party: 'União',
        state: 'AP',
        house: 'senado',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'DA'
      },
      {
        id: 'tereza-cristina',
        name: 'Tereza Cristina',
        role: 'Relator',
        party: 'PP',
        state: 'MS',
        house: 'senado',
        photoUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'TC'
      }
    ],
    timeline: [
      { date: '25/10/2026 às 11:00', step: 'Incluído na Ordem do Dia da sessão deliberativa ordinária', location: 'Plenário do Senado' },
      { date: '18/10/2024', step: 'Parecer favorável aprovado na Comissão de Meio Ambiente', location: 'CMA - Senado' }
    ]
  },
  {
    id: 'pl-5813-2023',
    code: 'PL 5813/2023',
    title: 'Combustível do Futuro e Biocombustíveis',
    shortDescription: 'Aumenta a mistura de etanol na gasolina e de biodiesel no diesel, incentivando combustíveis verdes feitos no Brasil.',
    fullEmenta: 'Cria programas nacionais de diesel verde, combustível sustentável de aviação (SAF) e biometano, amplia os limites de adição de etanol à gasolina (para até 35%) e de biodiesel ao diesel fóssil (até 25%), estimulando descarbonização da matriz de transportes.',
    citizenSummary: {
      whatItIsSimple: 'Uma lei que determina que a gasolina e o diesel vendidos nos postos de combustíveis tenham mais álcool (etanol de cana ou milho) e mais biodiesel de soja misturados. Também incentiva o querosene verde para aviões voarem sem poluir tanto.',
      howItAffectsYourLife: 'Estimula a agricultura brasileira que produz etanol e grãos e diminui a fumaça preta que a gente respira nas ruas das grandes cidades. Pode mexer levemente no preço do combustível na bomba dependendo da safra agrícola.',
      whoSupportsSays: 'O Brasil lidera o mundo em energia limpa. Essa lei atrai mais de R$ 260 bilhões em fábricas no interior do país e reduz nossa dependência de comprar petróleo de fora.',
      whoOpposesSays: 'Montadoras de carros e mecânicos alertaram que motores mais antigos podem sofrer maior desgaste se a mistura de etanol subir muito rápido.',
      simpleKeyTerms: [
        { term: 'Biocombustível', definition: 'Combustível feito de plantas agrícolas (como cana-de-açúcar, milho e soja) em vez de petróleo fóssil.' },
        { term: 'Mistura Obrigatória', definition: 'A porcentagem fixa de álcool ou óleo vegetal que as distribuidoras são obrigadas por lei a misturar nos combustíveis.' }
      ]
    },
    theme: 'Infraestrutura & Energia',
    house: 'congresso',
    urgency: 'urgencia',
    urgencyLabel: 'Regime de Urgência',
    status: 'Aguardando Sanção',
    presentationDate: '10/11/2023',
    lastUpdateDate: '25/10/2026 às 09:30',
    authorParty: 'Executivo Federal',
    isVotingNow: false,
    isGovernmentPriority: true,
    governmentPosition: 'FAVORÁVEL',
    impactSummary: 'Projeção de mais de R$ 260 bilhões em investimentos na indústria e no campo para biocombustíveis e aviação sustentável.',
    keyPoliticians: [
      {
        id: 'tereza-cristina',
        name: 'Tereza Cristina',
        role: 'Relator',
        party: 'PP',
        state: 'MS',
        house: 'senado',
        photoUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'TC'
      }
    ],
    timeline: [
      { date: '25/10/2026 às 09:00', step: 'Encaminhado ao Palácio do Planalto para sanção presidencial', location: 'Presidência da República' }
    ]
  },
  {
    id: 'pl-2234-2022',
    code: 'PL 2234/2022',
    title: 'Legalização de Cassinos, Bingos e Jogo do Bicho',
    shortDescription: 'Permite abrir cassinos dentro de grandes hotéis de turismo, salas de bingo e regulamenta o jogo do bicho.',
    fullEmenta: 'Dispõe sobre a exploração de jogos e apostas em todo o território nacional; institui a Cide-Jogos com alíquota de 17% sobre a receita bruta e 12% sobre o IRPF dos prêmios, destinando recursos para turismo, segurança pública e esportes.',
    citizenSummary: {
      whatItIsSimple: 'No Brasil, jogos de azar físicos (como roletas de cassino, mesas de cartas, máquinas caça-níqueis e bingos) foram proibidos em 1946. Este projeto quer voltar a permitir cassinos em grandes resorts de praia e turismo, reabrir casas de bingo e legalizar as bancas de jogo do bicho com regras oficiais.',
      howItAffectsYourLife: 'Cria novos empregos em hotéis e restaurantes em cidades turísticas. Quem jogar e ganhar prêmios terá que pagar imposto de 12% na hora, e as casas de aposta terão que fiscalizar para evitar que pessoas viciadas percam tudo.',
      whoSupportsSays: 'O brasileiro já aposta bilhões em sites de apostas pela internet sem pagar imposto no país. Ter cassinos físicos atrai turistas ricos estrangeiros e vai gerar cerca de R$ 22 bilhões por ano em impostos para segurança e saúde.',
      whoOpposesSays: 'Líderes religiosos e autoridades policiais alertam que jogos de azar destroem famílias inteiras por causa do vício em jogar (ludopatia) e podem ser usados pelo crime organizado para lavar dinheiro sujo.',
      simpleKeyTerms: [
        { term: 'Ludopatia', definition: 'O vício patológico em jogos de aposta, considerado doença pela Organização Mundial da Saúde.' },
        { term: 'Resorts Integrados', definition: 'Grandes hotéis turísticos com centros de convenções, piscinas, spas e salas de jogos licenciadas.' }
      ]
    },
    theme: 'Economia & Tributação',
    house: 'senado',
    urgency: 'prioridade',
    urgencyLabel: 'Prioridade',
    status: 'Na Ordem do Dia',
    presentationDate: '15/02/2022',
    lastUpdateDate: '25/10/2026 às 13:00',
    authorParty: 'Câmara (Iniciativa)',
    isVotingNow: false,
    isGovernmentPriority: false,
    governmentPosition: 'NEUTRO',
    impactSummary: 'Previsão de até R$ 22 bilhões por ano em impostos federais para segurança e esportes; grande resistência moral e de saúde.',
    keyPoliticians: [
      {
        id: 'flavio-bolsonaro',
        name: 'Flávio Bolsonaro',
        role: 'Relator',
        party: 'PL',
        state: 'RJ',
        house: 'senado',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        avatarFallback: 'FB'
      }
    ],
    timeline: [
      { date: '25/10/2026 às 12:30', step: 'Aguardando inclusão pelo Presidente do Senado em plenário', location: 'Mesa do Senado' }
    ]
  }
];

export const POLITICIANS_DATABASE: PoliticianProfile[] = [
  {
    id: 'hugo-motta',
    name: 'Hugo Motta',
    officialName: 'Hugo Motta Wanderley da Nóbrega',
    house: 'camara',
    party: 'Republicanos',
    state: 'PB',
    role: 'Presidente da Câmara dos Deputados',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    avatarColor: 'bg-amber-600',
    declaredIdeology: 'Centro pragmático, governabilidade institucional, modernização administrativa e diálogo com o setor produtivo',
    ideologyCategory: 'Centro',
    governmentAlignmentPercentage: 68,
    partyFidelityPercentage: 94,
    attendanceRate: 98,
    publicBanners: ['Estabilidade Institucional', 'Modernização Fiscal', 'Desenvolvimento Regional do Nordeste', 'Independência do Legislativo'],
    contactEmail: 'dep.hugomotta@camara.leg.br',
    bio: 'Médico e deputado federal em seu quarto mandato pela Paraíba. Eleito para a presidência da Câmara com amplo apoio multipartidário, atuando como articulador entre Executivo e diferentes bancadas temáticas.',
    proposals: [
      {
        id: 'prop-hm-1',
        code: 'PL 4120/2023',
        title: 'Incentivos Regionais para Transição Solar e Eólica no Semiárido',
        theme: 'Infraestrutura & Energia',
        year: 2023,
        status: 'Aprovado no Senado, Aguardando Sanção',
        summary: 'Destina linhas prioritárias dos Fundos Constitucionais para parques de energia limpa no Nordeste.',
        simpleExplanation: 'Dá dinheiro com juros mais baixos para empresários e agricultores montarem placas solares e usinas de vento no Nordeste, gerando empregos no sertão.',
        isMainFlagship: true
      },
      {
        id: 'prop-hm-2',
        code: 'PLP 143/2023',
        title: 'Transparência nas Emendas Parlamentares e Execução Orçamentária',
        theme: 'Economia & Tributação',
        year: 2024,
        status: 'Tramitação Conjunta',
        summary: 'Regulamenta critérios técnicos de rastreabilidade para emendas de comissão e bancada.',
        simpleExplanation: 'Obriga a colocar na internet o nome de cada deputado e cidade que recebe o dinheiro das chamadas emendas do Congresso, para evitar dinheiro escondido.',
        isMainFlagship: false
      }
    ],
    recentVotes: [
      {
        projectId: 'plp-68-2024',
        projectCode: 'PLP 68/2024',
        projectTitle: 'Reforma Tributária (IBS e CBS)',
        date: '10/07/2024',
        vote: 'SIM',
        governmentPosition: 'SIM',
        partOfGovernmentPlan: true,
        isAlignedWithGovernment: true,
        coherenceRating: 'Alta Coerência',
        coherenceExplanation: 'Votou SIM em consonância com o compromisso de simplificação tributária e governabilidade assumido publicamente.',
        declaredStanceTopic: 'Simplificação Tributária'
      },
      {
        projectId: 'pl-182-2024',
        projectCode: 'PL 182/2024',
        projectTitle: 'Mercado de Créditos de Carbono',
        date: '22/08/2024',
        vote: 'SIM',
        governmentPosition: 'SIM',
        partOfGovernmentPlan: true,
        isAlignedWithGovernment: true,
        coherenceRating: 'Alta Coerência',
        coherenceExplanation: 'Apoio à atração de capital externo para a transição energética nacional.',
        declaredStanceTopic: 'Energias Renováveis'
      },
      {
        projectId: 'pec-45-2023',
        projectCode: 'PEC 45/2023',
        projectTitle: 'PEC das Drogas no Art. 5º',
        date: '16/04/2024',
        vote: 'SIM',
        governmentPosition: 'NÃO',
        partOfGovernmentPlan: false,
        isAlignedWithGovernment: false,
        coherenceRating: 'Voto Pragmático',
        coherenceExplanation: 'Votou SIM contrariando a orientação do governo federal, alinhando-se à bancada conservadora e da segurança pública.',
        declaredStanceTopic: 'Segurança Pública Tradicional'
      }
    ]
  },
  {
    id: 'erika-hilton',
    name: 'Erika Hilton',
    officialName: 'Erika Hilton dos Santos Silva',
    house: 'camara',
    party: 'PSOL',
    state: 'SP',
    role: 'Líder da Bancada do PSOL na Câmara',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    avatarColor: 'bg-purple-700',
    declaredIdeology: 'Socialismo democrático, defesa dos direitos humanos, equidade de gênero, causas LGBTQIA+ e fortalecimento dos direitos trabalhistas',
    ideologyCategory: 'Esquerda',
    governmentAlignmentPercentage: 86,
    partyFidelityPercentage: 99,
    attendanceRate: 97,
    publicBanners: ['Fim da Escala 6x1', 'Direitos Humanos e Cidadania LGBTQIA+', 'Tributação de Super-ricos', 'Igualdade Salarial e Justiça Social'],
    contactEmail: 'dep.erikahilton@camara.leg.br',
    bio: 'Deputada federal por São Paulo, ativista dos direitos humanos e primeira mulher negra trans eleita para a Câmara dos Deputados. É autora principal da proposta de emenda à constituição que põe fim à escala de trabalho 6x1.',
    proposals: [
      {
        id: 'prop-eh-1',
        code: 'PEC 6/2024',
        title: 'Fim da Escala 6x1 e Jornada Máxima de 36 Horas',
        theme: 'Direitos & Cidadania',
        year: 2024,
        status: 'Aguardando Parecer na CCJ',
        summary: 'Acaba com a escala de seis dias de trabalho e um de descanso, estipulando 36 horas e 4 dias de trabalho semanal.',
        simpleExplanation: 'Quer que todo trabalhador tenha direito a até 3 dias de folga na semana, trabalhando no máximo 36 horas sem ter corte no salário.',
        isMainFlagship: true
      },
      {
        id: 'prop-eh-2',
        code: 'PL 1085/2023',
        title: 'Igualdade Salarial entre Homens e Mulheres',
        theme: 'Direitos & Cidadania',
        year: 2023,
        status: 'Sancionado (Lei 14.611)',
        summary: 'Exige relatórios de transparência salarial semestrais em empresas com mais de 100 empregados.',
        simpleExplanation: 'Multa empresas que pagarem salários diferentes para mulheres que fazem exatamente o mesmo trabalho que homens.',
        isMainFlagship: false
      }
    ],
    recentVotes: [
      {
        projectId: 'plp-68-2024',
        projectCode: 'PLP 68/2024',
        projectTitle: 'Reforma Tributária (IBS e CBS)',
        date: '10/07/2024',
        vote: 'SIM',
        governmentPosition: 'SIM',
        partOfGovernmentPlan: true,
        isAlignedWithGovernment: true,
        coherenceRating: 'Alta Coerência',
        coherenceExplanation: 'Votou SIM defendendo o mecanismo de cashback para os mais pobres e a isenção de tributos sobre alimentos básicos.',
        declaredStanceTopic: 'Justiça Tributária'
      },
      {
        projectId: 'pec-45-2023',
        projectCode: 'PEC 45/2023',
        projectTitle: 'PEC das Drogas no Art. 5º',
        date: '16/04/2024',
        vote: 'NÃO',
        governmentPosition: 'NÃO',
        partOfGovernmentPlan: false,
        isAlignedWithGovernment: true,
        coherenceRating: 'Alta Coerência',
        coherenceExplanation: 'Votou NÃO denunciando que a criminalização indiscriminada aprofunda o encarceramento em massa da juventude periférica e negra.',
        declaredStanceTopic: 'Direitos Humanos e Desencarceramento'
      }
    ]
  },
  {
    id: 'nikolas-ferreira',
    name: 'Nikolas Ferreira',
    officialName: 'Nikolas Ferreira de Oliveira',
    house: 'camara',
    party: 'PL',
    state: 'MG',
    role: 'Deputado Federal / Pres. Com. de Educação',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    avatarColor: 'bg-emerald-700',
    declaredIdeology: 'Conservadorismo cristão, anti-comunismo, liberdade de expressão irrestrita, redução drástica de impostos e pauta da família',
    ideologyCategory: 'Direita',
    governmentAlignmentPercentage: 9,
    partyFidelityPercentage: 98,
    attendanceRate: 94,
    publicBanners: ['Oposição ao Governo Lula', 'Liberdade de Expressão nas Redes', 'Escola sem Partido / Pró-Vida', 'Redução do Estado e Impostos'],
    contactEmail: 'dep.nikolasferreira@camara.leg.br',
    bio: 'Deputado federal mais votado do Brasil nas eleições de 2022 com 1,49 milhão de votos por Minas Gerais. Líder expressivo da ala jovem conservadora e opositor ferrenho da base governista.',
    proposals: [
      {
        id: 'prop-nf-1',
        code: 'PL 145/2023',
        title: 'Garantia de Homeschooling e Educação Domiciliar',
        theme: 'Educação & Inovação',
        year: 2023,
        status: 'Pronto para o Plenário',
        summary: 'Garante o direito dos pais educarem os filhos em ambiente doméstico com avaliações anuais.',
        simpleExplanation: 'Permite que famílias que não queiram mandar os filhos para a escola convencional possam ensiná-los em casa com provas de controle do MEC.',
        isMainFlagship: true
      }
    ],
    recentVotes: [
      {
        projectId: 'plp-68-2024',
        projectCode: 'PLP 68/2024',
        projectTitle: 'Reforma Tributária (IBS e CBS)',
        date: '10/07/2024',
        vote: 'NÃO',
        governmentPosition: 'SIM',
        partOfGovernmentPlan: true,
        isAlignedWithGovernment: false,
        coherenceRating: 'Alta Coerência',
        coherenceExplanation: 'Votou NÃO em consonância com o discurso público de que a reforma eleva a carga tributária do setor de serviços e centraliza poder na União.',
        declaredStanceTopic: 'Oposição a Novos Tributos'
      },
      {
        projectId: 'pec-45-2023',
        projectCode: 'PEC 45/2023',
        projectTitle: 'PEC das Drogas no Art. 5º',
        date: '16/04/2024',
        vote: 'SIM',
        governmentPosition: 'NÃO',
        partOfGovernmentPlan: false,
        isAlignedWithGovernment: false,
        coherenceRating: 'Alta Coerência',
        coherenceExplanation: 'Votou SIM integralmente alinhado à sua plataforma pró-segurança e combate irrestrito ao consumo de drogas.',
        declaredStanceTopic: 'Tolerância Zero a Drogas'
      }
    ]
  },
  {
    id: 'sergio-moro',
    name: 'Sergio Moro',
    officialName: 'Sergio Fernando Moro',
    house: 'senado',
    party: 'União',
    state: 'PR',
    role: 'Senador da República',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    avatarColor: 'bg-indigo-700',
    declaredIdeology: 'Centro-Direita punitivista, combate à corrupção e ao crime organizado, independência do Ministério Público e responsabilidade fiscal',
    ideologyCategory: 'Centro-Direita',
    governmentAlignmentPercentage: 22,
    partyFidelityPercentage: 88,
    attendanceRate: 95,
    publicBanners: ['Combate ao Narcotráfico e PCC', 'Prisão em 2ª Instância', 'Fim das Saidinhas de Presos', 'Responsabilidade Fiscal'],
    contactEmail: 'sergio.moro@senado.leg.br',
    bio: 'Ex-juiz federal titular da Operação Lava Jato e ex-Ministro da Justiça e Segurança Pública. Eleito senador pelo Paraná com mais de 1,9 milhão de votos.',
    proposals: [
      {
        id: 'prop-sm-1',
        code: 'PL 2253/2022',
        title: 'Restrição Severa das Saídas Temporárias de Presos (Saidinhas)',
        theme: 'Segurança Pública & Justiça',
        year: 2023,
        status: 'Sancionado com vetos derrubados',
        summary: 'Acaba com o benefício de saída de presidiários condenados por crimes hediondos ou violentos.',
        simpleExplanation: 'Proíbe que presidiários perigosos que cometeram homicídio ou roubo violento saiam da cadeia em feriados (como Dia das Mães ou Natal).',
        isMainFlagship: true
      }
    ],
    recentVotes: [
      {
        projectId: 'pec-45-2023',
        projectCode: 'PEC 45/2023',
        projectTitle: 'PEC das Drogas no Art. 5º',
        date: '16/04/2024',
        vote: 'SIM',
        governmentPosition: 'NÃO',
        partOfGovernmentPlan: false,
        isAlignedWithGovernment: false,
        coherenceRating: 'Alta Coerência',
        coherenceExplanation: 'Votou SIM coerente com sua bandeira histórica de combate às drogas e repressão ao tráfico.',
        declaredStanceTopic: 'Endurecimento Penal'
      }
    ]
  },
  {
    id: 'tabata-amaral',
    name: 'Tabata Amaral',
    officialName: 'Tabata Claudia Amaral de Pontes',
    house: 'camara',
    party: 'PSB',
    state: 'SP',
    role: 'Deputada Federal',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    avatarColor: 'bg-rose-600',
    declaredIdeology: 'Centro-Esquerda reformista, foco prioritário em educação básica, inovação, sustentabilidade e gestão pública baseada em evidências',
    ideologyCategory: 'Centro-Esquerda',
    governmentAlignmentPercentage: 79,
    partyFidelityPercentage: 86,
    attendanceRate: 98,
    publicBanners: ['Pé-de-Meia (Poupança do Ensino Médio)', 'Educação Pública Integral', 'Saúde Mental de Jovens', 'Transparência e Inovação'],
    contactEmail: 'dep.tabataamaral@camara.leg.br',
    bio: 'Cientista política e astrofísica graduada em Harvard, deputada federal por São Paulo em seu segundo mandato. Notabilizou-se pela coautoria do programa Pé-de-Meia.',
    proposals: [
      {
        id: 'prop-ta-1',
        code: 'PL 54/2021',
        title: 'Programa Pé-de-Meia (Poupança do Ensino Médio)',
        theme: 'Educação & Inovação',
        year: 2021,
        status: 'Sancionado (Lei 14.818/2024)',
        summary: 'Garante poupança e auxílio financeiro mensal a estudantes de baixa renda para erradicar a evasão escolar.',
        simpleExplanation: 'Paga até R$ 200 por mês e uma poupança de R$ 1.000 ao ano para alunos de famílias pobres não largarem a escola pública antes de se formar.',
        isMainFlagship: true
      }
    ],
    recentVotes: [
      {
        projectId: 'plp-68-2024',
        projectCode: 'PLP 68/2024',
        projectTitle: 'Reforma Tributária (IBS e CBS)',
        date: '10/07/2024',
        vote: 'SIM',
        governmentPosition: 'SIM',
        partOfGovernmentPlan: true,
        isAlignedWithGovernment: true,
        coherenceRating: 'Alta Coerência',
        coherenceExplanation: 'Votou a favor da simplificação tributária com ênfase na inclusão de produtos de higiene e cesta básica isenta.',
        declaredStanceTopic: 'Eficiência e Justiça Social'
      }
    ]
  },
  {
    id: 'marcel-van-hattem',
    name: 'Marcel van Hattem',
    officialName: 'Marcel van Hattem',
    house: 'camara',
    party: 'NOVO',
    state: 'RS',
    role: 'Deputado Federal',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    avatarColor: 'bg-orange-600',
    declaredIdeology: 'Liberalismo clássico, privatizações, teto rígido de gastos, desregulamentação da economia e estado mínimo',
    ideologyCategory: 'Direita',
    governmentAlignmentPercentage: 11,
    partyFidelityPercentage: 97,
    attendanceRate: 99,
    publicBanners: ['Fim dos Privilégios Políticos', 'Corte de Gastos e Menos Impostos', 'Defesa da Liberdade Econômica', 'Oposição Estrita'],
    contactEmail: 'dep.marcelvanhattem@camara.leg.br',
    bio: 'Jornalista e cientista político gaúcho, deputado federal reeleito. Um dos principais porta-vozes da pauta liberal anti-intervencionista na Câmara dos Deputados.',
    proposals: [
      {
        id: 'prop-mvh-1',
        code: 'PEC 32/2020',
        title: 'Reforma Administrativa e Fim de Penduricalhos',
        theme: 'Economia & Tributação',
        year: 2020,
        status: 'Pronta para Pauta no Plenário',
        summary: 'Acaba com supersalários, penduricalhos e estabelece demissão de servidores por mau desempenho avaliado.',
        simpleExplanation: 'Corta privilégios e salários acima do teto de juízes e altos funcionários públicos, permitindo demitir quem não trabalha direito.',
        isMainFlagship: true
      }
    ],
    recentVotes: [
      {
        projectId: 'plp-68-2024',
        projectCode: 'PLP 68/2024',
        projectTitle: 'Reforma Tributária',
        date: '10/07/2024',
        vote: 'NÃO',
        governmentPosition: 'SIM',
        partOfGovernmentPlan: true,
        isAlignedWithGovernment: false,
        coherenceRating: 'Alta Coerência',
        coherenceExplanation: 'Votou NÃO apontando que o texto não fixou teto legal de alíquota, permitindo que o IVA brasileiro seja muito elevado.',
        declaredStanceTopic: 'Combate ao Aumento de Carga'
      }
    ]
  },
  {
    id: 'gleisi-hoffmann',
    name: 'Gleisi Hoffmann',
    officialName: 'Gleisi Helena Hoffmann',
    house: 'camara',
    party: 'PT',
    state: 'PR',
    role: 'Deputada Federal / Presidente Nacional do PT',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    avatarColor: 'bg-red-700',
    declaredIdeology: 'Desenvolvimentismo de esquerda, fortalecimento do papel do Estado na economia, valorização do salário mínimo e soberania energética',
    ideologyCategory: 'Esquerda',
    governmentAlignmentPercentage: 99,
    partyFidelityPercentage: 100,
    attendanceRate: 96,
    publicBanners: ['Plano de Governo Lula', 'Valorização Real do Salário Mínimo', 'Investimento Público e Novo PAC', 'Isenção de IR até R$ 5.000'],
    contactEmail: 'dep.gleisihoffmann@camara.leg.br',
    bio: 'Advogada, ex-ministra da Casa Civil e deputada federal. Presidente nacional do Partido dos Trabalhadores.',
    proposals: [
      {
        id: 'prop-gh-1',
        code: 'PL 81/2024 (Articulação)',
        title: 'Política Permanente de Aumento Real do Salário Mínimo',
        theme: 'Economia & Tributação',
        year: 2024,
        status: 'Em tramitação prioritária',
        summary: 'Fórmula que garante aumento real (inflação + PIB) para os trabalhadores.',
        simpleExplanation: 'Garante por lei que o salário mínimo suba todo ano acima da inflação do supermercado, aumentando o poder de compra das famílias.',
        isMainFlagship: true
      }
    ],
    recentVotes: [
      {
        projectId: 'plp-68-2024',
        projectCode: 'PLP 68/2024',
        projectTitle: 'Reforma Tributária',
        date: '10/07/2024',
        vote: 'SIM',
        governmentPosition: 'SIM',
        partOfGovernmentPlan: true,
        isAlignedWithGovernment: true,
        coherenceRating: 'Alta Coerência',
        coherenceExplanation: 'Votou SIM em total sintonia com o plano central de governo e o Ministério da Fazenda.',
        declaredStanceTopic: 'Programa Econômico de Governo'
      }
    ]
  },
  {
    id: 'davi-alcolumbre',
    name: 'Davi Alcolumbre',
    officialName: 'David Samuel Alcolumbre Tobelem',
    house: 'senado',
    party: 'União',
    state: 'AP',
    role: 'Presidente do Senado Federal',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    avatarColor: 'bg-blue-700',
    declaredIdeology: 'Centro-Direita, liberalismo econômico com forte defesa de investimentos em infraestrutura e exploração sustentável na Amazônia',
    ideologyCategory: 'Centro-Direita',
    governmentAlignmentPercentage: 74,
    partyFidelityPercentage: 92,
    attendanceRate: 96,
    publicBanners: ['Desenvolvimento da Amazônia e Amapá', 'Margem Equatorial de Petróleo', 'Autonomia do Senado', 'Reforma do Judiciário'],
    contactEmail: 'davi.alcolumbre@senado.leg.br',
    bio: 'Senador pelo Amapá em seu segundo mandato e atual Presidente do Senado Federal e do Congresso Nacional.',
    proposals: [
      {
        id: 'prop-da-1',
        code: 'PLS 399/2023',
        title: 'Pesquisa e Extração Sustentável de Petróleo no Amapá',
        theme: 'Infraestrutura & Energia',
        year: 2023,
        status: 'Em Análise na CI',
        summary: 'Regulamenta pesquisas ambientais para poços de petróleo na costa amazônica com royalties locais.',
        simpleExplanation: 'Autoriza pesquisar se tem petróleo no mar do Norte do Brasil, destinando parte do lucro para escolas e saneamento no Amapá.',
        isMainFlagship: true
      }
    ],
    recentVotes: [
      {
        projectId: 'plp-68-2024',
        projectCode: 'PLP 68/2024',
        projectTitle: 'Reforma Tributária',
        date: '10/07/2024',
        vote: 'SIM',
        governmentPosition: 'SIM',
        partOfGovernmentPlan: true,
        isAlignedWithGovernment: true,
        coherenceRating: 'Alta Coerência',
        coherenceExplanation: 'Conduziu a matéria como pauta estrutural do Estado brasileiro garantindo incentivos regionais.',
        declaredStanceTopic: 'Desenvolvimento Regional'
      }
    ]
  }
];

export const INITIAL_ALERTS: LegislativeAlert[] = [
  {
    id: 'alt-1',
    title: 'Votação Aberta: PLP 68/2024 em Plenário',
    description: 'A Câmara dos Deputados iniciou a votação nominal dos destaques da Regulamentação da Reforma Tributária (IBS e CBS). Quórum de 482 deputados presentes.',
    timestamp: 'Há 5 minutos',
    type: 'voting_started',
    projectCode: 'PLP 68/2024',
    house: 'camara',
    isRead: false
  },
  {
    id: 'alt-2',
    title: 'Requerimento de Urgência Aprovado',
    description: 'Senado Federal aprovou regime de urgência para o PL 182/2024 (Mercado Brasileiro de Redução de Emissões de Carbono). Pauta incluída na Ordem do Dia.',
    timestamp: 'Há 28 minutos',
    type: 'urgency',
    projectCode: 'PL 182/2024',
    house: 'senado',
    isRead: false
  },
  {
    id: 'alt-3',
    title: 'Divergência Ideológica Registrada no Radar',
    description: 'Análise automática detectou voto discordante de parlamentar da base em relação ao Plano de Governo na matéria de segurança e desarmamento.',
    timestamp: 'Há 1 hora',
    type: 'vote_divergence',
    projectCode: 'PEC 45/2023',
    house: 'congresso',
    isRead: true
  },
  {
    id: 'alt-4',
    title: 'Nova Proposta Admitida: PEC 6/2024',
    description: 'Apresentada com 216 assinaturas a PEC que propõe o fim da escala 6x1 e limite de 36 horas semanais. Encaminhada à CCJ.',
    timestamp: 'Há 2 horas',
    type: 'proposal_approved',
    projectCode: 'PEC 6/2024',
    house: 'camara',
    isRead: true
  }
];

export const LIVE_SESSIONS_INFO = [
  {
    house: 'camara',
    title: 'Plenário Ulysses Guimarães - Câmara dos Deputados',
    type: 'Sessão Deliberativa Extraordinária',
    status: 'AO VIVO - EM VOTAÇÃO NOMINAL',
    activeTopic: 'PLP 68/2024 (Regulamentação da Reforma Tributária)',
    quorum: '482 presentes (Mínimo: 257)',
    president: 'Hugo Motta (PB)',
    startTime: '14:00'
  },
  {
    house: 'senado',
    title: 'Plenário do Senado Federal',
    type: 'Sessão Deliberativa Ordinária',
    status: 'AO VIVO - EM DISCUSSÃO DA ORDEM DO DIA',
    activeTopic: 'PL 182/2024 (Mercado Regulado de Carbono)',
    quorum: '72 senadores presentes (Mínimo: 41)',
    president: 'Davi Alcolumbre (AP)',
    startTime: '14:30'
  }
];
