import React from 'react';
import {
  Landmark,
  ExternalLink,
  ShieldCheck,
  FileText,
  Database,
  CheckCircle2,
  Scale,
  Award,
  Globe
} from 'lucide-react';

interface OfficialSource {
  id: string;
  name: string;
  organType: string;
  description: string;
  dataRetrieved: string[];
  url: string;
  badgeLabel: string;
}

const OFFICIAL_SOURCES: OfficialSource[] = [
  {
    id: 'tse',
    name: 'Tribunal Superior Eleitoral (TSE) - DivulgaCandContas',
    organType: 'Poder Judiciário Eleitoral',
    description: 'Sistema oficial da Justiça Eleitoral brasileira onde são obrigatoriamente registrados os Planos de Governo dos candidatos à Presidência da República no momento do registro de candidatura, além de dados cadastrais partidários, declarações de bens e coligações.',
    dataRetrieved: [
      'Diretrizes oficiais e compromissos do Plano de Governo (Eleições 2022 e 2026)',
      'Registro oficial de candidaturas, coligações partidárias e vice-presidência',
      'Estatutos e orientações programáticas dos partidos políticos'
    ],
    url: 'https://divulgacandcontas.tse.jus.br',
    badgeLabel: 'Domínio Oficial .jus.br'
  },
  {
    id: 'camara',
    name: 'Câmara dos Deputados - Portal de Dados Abertos',
    organType: 'Poder Legislativo Federal',
    description: 'Portal oficial mantido pela Mesa Diretora da Câmara dos Deputados para transparência ativa das matérias em tramitação no Plenário Ulysses Guimarães e comissões temáticas.',
    dataRetrieved: [
      'Projetos de Lei (PL), Leis Complementares (PLP) e Propostas de Emenda à Constituição (PEC)',
      'Votações nominais (painel eletrônico de votação de cada deputado)',
      'Quórum em tempo real das sessões deliberativas ordinárias e extraordinárias',
      'Relatorias, pareceres de comissões (CCJC, CFT) e discursos em plenário'
    ],
    url: 'https://dadosabertos.camara.leg.br',
    badgeLabel: 'Domínio Oficial .leg.br'
  },
  {
    id: 'senado',
    name: 'Senado Federal - Portal de Dados Abertos e Legislação',
    organType: 'Poder Legislativo Federal',
    description: 'Repositório de dados abertos e sistema de tramitação legislativa do Senado Federal, responsável pelas matérias que passam pelo Plenário do Senado e comissões permanentes.',
    dataRetrieved: [
      'Projetos de Lei do Senado (PLS) e matérias remetidas pela Câmara',
      'Ordem do Dia de sessões plenárias e pautas com regime de urgência aprovado',
      'Registros de votação nominal de todos os 81 senadores da República',
      'Comissões temáticas de mérito (CCJ, CAE, CMA, CRE)'
    ],
    url: 'https://www12.senado.leg.br/dados-abertos',
    badgeLabel: 'Domínio Oficial .leg.br'
  },
  {
    id: 'planalto',
    name: 'Presidência da República - Portal da Legislação (Planalto)',
    organType: 'Poder Executivo Federal',
    description: 'Base oficial de leis federais da República Federativa do Brasil mantida pela Casa Civil da Presidência da República e Diário Oficial da União (DOU).',
    dataRetrieved: [
      'Textos finais de Leis Sancionadas, Emendas Constitucionais e Medidas Provisórias',
      'Mensagens de veto total ou parcial com as justificativas do Executivo',
      'Decretos presidenciais de regulamentação de programas sociais e tributários'
    ],
    url: 'https://www.planalto.gov.br/legislacao',
    badgeLabel: 'Domínio Oficial .gov.br'
  },
  {
    id: 'transparencia',
    name: 'Controladoria-Geral da União (CGU) - Portal da Transparência',
    organType: 'Poder Executivo Federal / Controle Governamental',
    description: 'Canal oficial do Governo Federal para acompanhamento da execução orçamentária, transferências voluntárias e destinação de emendas parlamentares.',
    dataRetrieved: [
      'Execução orçamentária de programas prioritários federais',
      'Rastreabilidade e dados de emendas de bancada e de comissão',
      'Desonerações fiscais e benefícios sociais distribuídos'
    ],
    url: 'https://portaldatransparencia.gov.br',
    badgeLabel: 'Domínio Oficial .gov.br'
  },
  {
    id: 'stf',
    name: 'Supremo Tribunal Federal (STF) - Portal Jurisprudencial',
    organType: 'Poder Judiciário Federal',
    description: 'Guardião da Constituição Federal de 1988, de onde são extraídas decisões com repercussão no processo legislativo.',
    dataRetrieved: [
      'Julgamentos de Ações Diretas de Inconstitucionalidade (ADI)',
      'Decisões e liminares sobre a execução de emendas parlamentares (ADPF 854)',
      'Teses fixadas sobre porte de entorpecentes e regras tributárias'
    ],
    url: 'https://portal.stf.jus.br',
    badgeLabel: 'Domínio Oficial .jus.br'
  }
];

export const OfficialSourcesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Transparência e Fidelidade Documental</span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Fontes Governamentais & Bibliografia Oficial
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Para garantir total <strong>neutralidade e credibilidade cívica</strong>, o Radar Legislativo Brasil utiliza <strong>exclusivamente portais governamentais oficiais da República Federativa do Brasil</strong> (domínios <code className="text-emerald-700 font-mono font-bold">.gov.br</code>, <code className="text-emerald-700 font-mono font-bold">.leg.br</code> e <code className="text-emerald-700 font-mono font-bold">.jus.br</code>). Nenhum dado é baseado em estimativas não oficiais ou blogs opinativos.
        </p>

        {/* Legal disclaimer banner */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 mt-2">
          <div className="flex items-start gap-3">
            <Globe className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block font-semibold mb-0.5">
                Consulta Direta pelo Cidadão:
              </strong>
              Abaixo estão centralizados os portais oficiais onde cada cidadão pode auditar por conta própria a tramitação de cada projeto de lei, a ata das votações nominais e o plano de governo original protocolado pelos candidatos.
            </div>
          </div>

          <div className="shrink-0 bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-1.5 rounded-lg text-left sm:text-right">
            <span className="block text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Ciclo de Atualização</span>
            <span className="text-xs font-semibold">25/10/2026 às 15:42 BRT</span>
          </div>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {OFFICIAL_SOURCES.map((source) => (
          <div
            key={source.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs hover:shadow-md p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Badge & organ */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                  {source.badgeLabel}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {source.organType}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                {source.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {source.description}
              </p>

              {/* Data list */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Informações extraídas desta fonte:
                </span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {source.dataRetrieved.map((info, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Official Link Button */}
            <div className="pt-3 border-t border-slate-100">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
              >
                <span>Acessar Portal Oficial</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              </a>
              <span className="block text-center text-[10px] text-slate-400 font-mono mt-1.5 truncate">
                {source.url}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance statement */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="space-y-0.5">
          <strong className="text-slate-900 block font-semibold">
            Lei de Acesso à Informação (Lei nº 12.527/2011)
          </strong>
          <p className="text-slate-500">
            Esta plataforma atua em estrita conformidade com os princípios constitucionais da publicidade, transparência e controle social da administração pública.
          </p>
        </div>

        <div className="shrink-0 text-slate-400 font-mono text-[11px]">
          República Federativa do Brasil
        </div>
      </div>
    </div>
  );
};
