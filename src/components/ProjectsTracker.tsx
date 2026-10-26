import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Flame,
  Clock,
  Landmark,
  UserCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FileText,
  Vote,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  LegislativeProject,
  LegislativeTheme,
  UrgencyLevel,
  House
} from '../types/legislative';
import { PoliticalGlossaryModal } from './PoliticalGlossaryModal';

interface ProjectsTrackerProps {
  projects: LegislativeProject[];
  onSelectProject: (project: LegislativeProject) => void;
  onExplainWithAI: (project: LegislativeProject) => void;
  onSimulateCitizenVote: (project: LegislativeProject) => void;
  onSelectPoliticianById: (politicianId: string) => void;
}

export const ProjectsTracker: React.FC<ProjectsTrackerProps> = ({
  projects,
  onSelectProject,
  onExplainWithAI,
  onSimulateCitizenVote,
  onSelectPoliticianById
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHouse, setSelectedHouse] = useState<House | 'todas'>('todas');
  const [selectedParty, setSelectedParty] = useState<string>('todos');
  const [selectedTheme, setSelectedTheme] = useState<LegislativeTheme | 'todos'>('todos');
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyLevel | 'todas'>('todas');
  const [onlyVotingNow, setOnlyVotingNow] = useState<boolean>(false);
  const [onlyGovPriority, setOnlyGovPriority] = useState<boolean>(false);

  // Modo Cidadão: default true to enable clear language for everyday people
  const [citizenMode, setCitizenMode] = useState<boolean>(true);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpandCard = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Extract all distinct parties involved in projects
  const availableParties = useMemo(() => {
    const parties = new Set<string>();
    projects.forEach(p => {
      if (p.authorParty && p.authorParty !== 'Executivo Federal') {
        parties.add(p.authorParty);
      }
      p.keyPoliticians.forEach(pol => {
        if (pol.party) parties.add(pol.party);
      });
    });
    return Array.from(parties).sort();
  }, [projects]);

  // Filtered list
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search query (code, title, summary, politicians, citizen explanation)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesCode = project.code.toLowerCase().includes(query);
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.shortDescription.toLowerCase().includes(query);
        const matchesEmenta = project.fullEmenta.toLowerCase().includes(query);
        const matchesSimple = project.citizenSummary?.whatItIsSimple.toLowerCase().includes(query) ||
                              project.citizenSummary?.howItAffectsYourLife.toLowerCase().includes(query);
        const matchesPolitician = project.keyPoliticians.some(p => p.name.toLowerCase().includes(query) || p.party.toLowerCase().includes(query));

        if (!matchesCode && !matchesTitle && !matchesDesc && !matchesEmenta && !matchesPolitician && !matchesSimple) {
          return false;
        }
      }

      // House filter
      if (selectedHouse !== 'todas' && project.house !== selectedHouse) {
        return false;
      }

      // Party filter
      if (selectedParty !== 'todos') {
        const hasParty =
          project.authorParty.toLowerCase().includes(selectedParty.toLowerCase()) ||
          project.keyPoliticians.some(p => p.party.toLowerCase() === selectedParty.toLowerCase());
        if (!hasParty) return false;
      }

      // Theme filter
      if (selectedTheme !== 'todos' && project.theme !== selectedTheme) {
        return false;
      }

      // Urgency filter
      if (selectedUrgency !== 'todas' && project.urgency !== selectedUrgency) {
        return false;
      }

      // Only voting now
      if (onlyVotingNow && !project.isVotingNow) {
        return false;
      }

      // Only gov priority
      if (onlyGovPriority && !project.isGovernmentPriority) {
        return false;
      }

      return true;
    });
  }, [
    projects,
    searchQuery,
    selectedHouse,
    selectedParty,
    selectedTheme,
    selectedUrgency,
    onlyVotingNow,
    onlyGovPriority
  ]);

  // Quick stats
  const totalVotingNow = projects.filter(p => p.isVotingNow).length;
  const totalUrgent = projects.filter(p => p.urgency === 'urgencia_urgentissima' || p.urgency === 'urgencia').length;
  const totalGovPriority = projects.filter(p => p.isGovernmentPriority).length;

  return (
    <div className="space-y-6">
      {/* Citizen Access Mode Announcement Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-2xl p-5 shadow-sm border border-emerald-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Política sem Complicação para Todo Cidadão</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Todas as leis explicadas em português claro e direto
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Criado para quem não entende de política ou quer saber logo: <strong>o que é a proposta</strong>, <strong>como ela mexe no seu bolso</strong> e <strong>quem ganha ou perde com ela</strong>, sem termos difíceis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsGlossaryOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-800/60 hover:bg-emerald-700/80 text-white border border-emerald-600/40 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span>Dicionário de Termos</span>
          </button>

          <button
            onClick={() => setCitizenMode(!citizenMode)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
              citizenMode
                ? 'bg-emerald-400 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{citizenMode ? 'Modo Cidadão Ativado' : 'Ativar Modo Cidadão'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Total de Pautas Ativas
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            {projects.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Câmara e Senado Federal</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs relative overflow-hidden">
          <div className="text-xs font-medium text-emerald-700 uppercase tracking-wider flex items-center justify-between">
            <span>Em Votação Agora</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-1 font-mono tabular-nums">
            {totalVotingNow}
          </div>
          <div className="text-xs text-emerald-600 mt-1">Plenário Deliberativo</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
          <div className="text-xs font-medium text-amber-700 uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            <span>Regime de Urgência</span>
          </div>
          <div className="text-2xl font-bold text-amber-800 mt-1 font-mono tabular-nums">
            {totalUrgent}
          </div>
          <div className="text-xs text-amber-600 mt-1">Votações antecipadas</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs">
          <div className="text-xs font-medium text-blue-700 uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Plano de Governo</span>
          </div>
          <div className="text-2xl font-bold text-blue-800 mt-1 font-mono tabular-nums">
            {totalGovPriority}
          </div>
          <div className="text-xs text-blue-600 mt-1">Pautas prioritárias do Executivo</div>
        </div>
      </div>

      {/* Control / Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
        {/* Top Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por código (ex: PLP 68, PEC 45), comida, imposto, salário, escala 6x1 ou político..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Casa */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Casa Legislativa
            </label>
            <select
              value={selectedHouse}
              onChange={(e) => setSelectedHouse(e.target.value as House | 'todas')}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="todas">Todas as Casas (Congresso)</option>
              <option value="camara">Câmara dos Deputados</option>
              <option value="senado">Senado Federal</option>
              <option value="congresso">Sessão Conjunta</option>
            </select>
          </div>

          {/* Tema */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Tema / Assunto
            </label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value as LegislativeTheme | 'todos')}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="todos">Todos os Assuntos</option>
              <option value="Economia & Tributação">Economia & Tributação (Preços e Impostos)</option>
              <option value="Segurança Pública & Justiça">Segurança Pública & Justiça</option>
              <option value="Meio Ambiente & Agro">Meio Ambiente & Agro</option>
              <option value="Educação & Inovação">Educação & Inovação (Redes e Escolas)</option>
              <option value="Direitos & Cidadania">Direitos & Cidadania (Trabalho e Direitos)</option>
              <option value="Infraestrutura & Energia">Infraestrutura & Energia (Combustíveis e Luz)</option>
              <option value="Saúde & Seguridade Social">Saúde & Previdência</option>
            </select>
          </div>

          {/* Urgência */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Urgência de Votação
            </label>
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value as UrgencyLevel | 'todas')}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="todas">Qualquer Regime</option>
              <option value="urgencia_urgentissima">Urgência Urgentíssima (Votação Imediata)</option>
              <option value="urgencia">Regime de Urgência (Fura-Fila)</option>
              <option value="prioridade">Prioridade</option>
              <option value="ordinaria">Tramitação Normal</option>
            </select>
          </div>

          {/* Partido Envolvido */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Partido Envolvido (Autor/Relator)
            </label>
            <select
              value={selectedParty}
              onChange={(e) => setSelectedParty(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="todos">Todos os Partidos</option>
              {availableParties.map(party => (
                <option key={party} value={party}>{party}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={onlyVotingNow}
                onChange={(e) => setOnlyVotingNow(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Apenas em votação agora no plenário</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={onlyGovPriority}
                onChange={(e) => setOnlyGovPriority(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Apenas metas do Plano de Governo</span>
            </label>
          </div>

          <div className="flex items-center gap-2 text-slate-500 font-mono text-xs tabular-nums">
            <span
              className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-sans font-medium cursor-help"
              title="Horário em que o sistema consultou as bases da Câmara e do Senado. Não é o relógio do seu celular."
            >
              <Clock className="w-3 h-3 text-emerald-600" />
              Coleta nas bases oficiais: <strong>25/10/2026 às 15:42 (Brasília)</strong>
            </span>
            <span>·</span>
            <span>Mostrando <strong>{filteredProjects.length}</strong> de {projects.length} pautas</span>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">
              Nenhuma pauta encontrada com estes filtros
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Tente redefinir os filtros de partido, casa legislativa ou urgência para visualizar outras matérias pautadas no Congresso.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedHouse('todas');
                setSelectedParty('todos');
                setSelectedTheme('todos');
                setSelectedUrgency('todas');
                setOnlyVotingNow(false);
                setOnlyGovPriority(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              Limpar Todos os Filtros
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const isExpanded = expandedCards[project.id];

            return (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 transition-all shadow-xs hover:shadow-md p-5 space-y-4"
              >
                {/* Card Header & Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-900 font-mono">
                        {project.code}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {project.house === 'senado'
                          ? 'Senado Federal'
                          : project.house === 'camara'
                          ? 'Câmara dos Deputados'
                          : 'Congresso Nacional'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-600 font-medium">{project.theme}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-medium cursor-help"
                        title="Momento da última movimentação ou votação registrada oficialmente na Câmara ou Senado"
                      >
                        <Clock className="w-3 h-3 text-emerald-600" />
                        Última tramitação oficial: {project.lastUpdateDate}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  {/* Urgency and Live Status */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {project.isVotingNow && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Votando Agora
                      </div>
                    )}

                    <div className={`px-2.5 py-1 rounded text-xs font-medium border ${
                      project.urgency === 'urgencia_urgentissima'
                        ? 'bg-rose-50 text-rose-700 border-rose-200 font-semibold'
                        : project.urgency === 'urgencia'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {project.urgencyLabel}
                    </div>
                  </div>
                </div>

                {/* CITIZEN MODE HIGHLIGHT (Linguagem para Leigos) */}
                {citizenMode && project.citizenSummary ? (
                  <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-200/80 space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 uppercase tracking-wide">
                        <span>💬 Em bom português: o que é essa proposta?</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {project.citizenSummary.whatItIsSimple}
                      </p>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-emerald-200/60">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 uppercase tracking-wide">
                        <span>🛒 Como isso mexe no seu bolso e no seu dia a dia?</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {project.citizenSummary.howItAffectsYourLife}
                      </p>
                    </div>

                    {/* Expandable Pros & Cons */}
                    {isExpanded && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-emerald-200/60 text-xs">
                        <div className="p-3 bg-white rounded-lg border border-emerald-100">
                          <strong className="text-emerald-900 block font-bold mb-1">
                            👍 Quem apoia diz que:
                          </strong>
                          <p className="text-slate-700 leading-relaxed">
                            {project.citizenSummary.whoSupportsSays}
                          </p>
                        </div>

                        <div className="p-3 bg-white rounded-lg border border-rose-100">
                          <strong className="text-rose-900 block font-bold mb-1">
                            👎 Quem critica alerta que:
                          </strong>
                          <p className="text-slate-700 leading-relaxed">
                            {project.citizenSummary.whoOpposesSays}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <button
                        onClick={() => toggleExpandCard(project.id)}
                        className="text-emerald-800 font-bold hover:underline flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>
                            <span>Esconder argumentos de quem apoia e quem critica</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Ver argumentos: Por que alguns apoiam e outros são contra?</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setIsGlossaryOpen(true)}
                        className="text-slate-500 hover:text-slate-800 hover:underline flex items-center gap-1"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>Dúvidas em termos políticos?</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Standard Technical Description */
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {project.shortDescription}
                  </p>
                )}

                {/* Alignment Strip */}
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="font-semibold text-slate-900 shrink-0">Plano de Governo:</span>
                    <span className={`font-semibold ${
                      project.governmentPosition === 'FAVORÁVEL'
                        ? 'text-emerald-700'
                        : project.governmentPosition === 'CONTRÁRIO'
                        ? 'text-rose-700'
                        : 'text-slate-700'
                    }`}>
                      O Governo Federal é {project.governmentPosition} a esta pauta
                      {project.isGovernmentPriority && ' (Consta como meta prioritária)'}
                    </span>
                  </div>

                  <div className="text-slate-500 font-mono text-[11px]">
                    Status: <strong className="text-slate-700">{project.status}</strong>
                  </div>
                </div>

                {/* Involved Politicians and Action Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                  {/* Politicians Involved */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0">
                      Políticos Envolvidos:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.keyPoliticians.map((pol) => (
                        <button
                          key={pol.id}
                          onClick={() => onSelectPoliticianById(pol.id)}
                          className="group flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all text-xs text-left"
                          title={`Ver perfil, propostas e histórico de votos de ${pol.name}`}
                        >
                          <div className="w-5 h-5 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center font-bold text-[9px] text-slate-700 shrink-0">
                            {pol.avatarFallback}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800 group-hover:text-emerald-900 transition-colors">
                              {pol.name}
                            </span>
                            <span className="text-slate-500 text-[11px] ml-1">
                              ({pol.party}/{pol.state} · {pol.role})
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onExplainWithAI(project)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
                      title="Explicar proposta em linguagem simples para o cidadão via IA"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Explicar com IA</span>
                    </button>

                    <button
                      onClick={() => onSimulateCitizenVote(project)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
                      title="Dê seu voto popular e compare com os parlamentares"
                    >
                      <Vote className="w-3.5 h-3.5 text-slate-600" />
                      <span>Votar</span>
                    </button>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <span>Ver Completo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Political Glossary Modal */}
      <PoliticalGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
};
