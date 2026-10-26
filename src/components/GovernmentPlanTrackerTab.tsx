import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Calendar,
  FileCheck,
  Scale,
  TrendingUp,
  Info,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { getGovernmentPlanCycles } from '../data/governmentPlanData';
import { GovernmentPromise, PromiseStatus } from '../types/legislative';

interface GovernmentPlanTrackerTabProps {
  onOpenProjectByCode: (code: string) => void;
}

export const GovernmentPlanTrackerTab: React.FC<GovernmentPlanTrackerTabProps> = ({
  onOpenProjectByCode
}) => {
  const planCycles = useMemo(() => getGovernmentPlanCycles(), []);

  // Selected mandate cycle (2023-2026 or 2027-2030)
  const defaultCycle = planCycles.find(c => c.isCurrentMandate) || planCycles[0];
  const [selectedMandateId, setSelectedMandateId] = useState<'2023-2026' | '2027-2030'>(defaultCycle.mandateId);

  const [statusFilter, setStatusFilter] = useState<PromiseStatus | 'todos'>('todos');
  const [axisFilter, setAxisFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentCycle = planCycles.find(c => c.mandateId === selectedMandateId) || planCycles[0];

  // Distinct axes
  const availableAxes = useMemo(() => {
    const set = new Set<string>();
    currentCycle.promises.forEach(p => set.add(p.axis));
    return Array.from(set).sort();
  }, [currentCycle]);

  // Filtered list
  const filteredPromises = useMemo(() => {
    return currentCycle.promises.filter(promise => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = promise.title.toLowerCase().includes(query);
        const matchesQuote = promise.tseOfficialQuote.toLowerCase().includes(query);
        const matchesSimple = promise.simpleCitizenSummary.toLowerCase().includes(query);
        const matchesDetails = promise.concreteDeliveryDetails.toLowerCase().includes(query);
        const matchesLeg = promise.relatedLegislation?.toLowerCase().includes(query);

        if (!matchesTitle && !matchesQuote && !matchesSimple && !matchesDetails && !matchesLeg) {
          return false;
        }
      }

      if (statusFilter !== 'todos' && promise.status !== statusFilter) {
        return false;
      }

      if (axisFilter !== 'todos' && promise.axis !== axisFilter) {
        return false;
      }

      return true;
    });
  }, [currentCycle, statusFilter, axisFilter, searchQuery]);

  // General percentage of overall completion
  const percentCompleted = Math.round((currentCycle.completedCount / currentCycle.totalPromises) * 100);
  const percentInProgress = Math.round((currentCycle.inProgressCount / currentCycle.totalPromises) * 100);
  const percentDelayed = Math.round((currentCycle.delayedCount / currentCycle.totalPromises) * 100);
  const percentNotCompleted = Math.round((currentCycle.notCompletedCount / currentCycle.totalPromises) * 100);

  return (
    <div className="space-y-6">
      {/* Header Panel with Cycle Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <FileCheck className="w-4 h-4" />
              <span>Auditoria de Compromissos Eleitorais</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Plano de Governo Registrado no TSE: Promessas vs. Realidade
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Acompanhamento detalhado e neutro das diretrizes oficiais protocoladas na candidatura presidencial. Veja o que já virou lei, o que está em votação no Congresso Nacional e o que ainda não saiu do papel.
            </p>
          </div>

          {/* Mandate Switcher Buttons */}
          <div className="bg-slate-100 p-1.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-1 shrink-0">
            <button
              onClick={() => setSelectedMandateId('2023-2026')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all text-left sm:text-center ${
                selectedMandateId === '2023-2026'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="font-bold">Mandato 2023–2026</div>
              <div className="text-[10px] text-slate-500 font-normal">Plano TSE 2022 (Vigente)</div>
            </button>

            <button
              onClick={() => setSelectedMandateId('2027-2030')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all text-left sm:text-center ${
                selectedMandateId === '2027-2030'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="font-bold">Mandato 2027–2030</div>
              <div className="text-[10px] text-emerald-700 font-normal">Transição em 05/01/2027</div>
            </button>
          </div>
        </div>

        {/* Temporal Auto-Transition Notice */}
        <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Garantia de Atualização de Ciclo:</strong> Assim que a linha do tempo atingir <strong>05/01/2027</strong>, o sistema migra automaticamente este checklist para as metas registradas nas eleições de 2026.
            </span>
          </div>

          <span className="font-mono text-[11px] text-emerald-800 shrink-0">
            {selectedMandateId === '2023-2026' ? 'Ciclo Eleitoral Ativo' : 'Visualizando Novo Ciclo'}
          </span>
        </div>
      </div>

      {/* Scoreboard / Termômetro do Mandato */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Termômetro de Cumprimento do Plano: {currentCycle.mandateTitle}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>Candidatura: <strong>{currentCycle.candidateName}</strong></span>
              <span>·</span>
              <span>Registro TSE em {currentCycle.tseRegistrationDate}</span>
              <span>·</span>
              <span
                className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-sans font-medium cursor-help"
                title="Momento em que foram checadas as edições do Diário Oficial da União e do TSE. Não é o relógio do seu celular."
              >
                <Clock className="w-3 h-3 text-emerald-600" />
                Auditoria nas bases oficiais: <strong>25/10/2026 às 16:30 (Brasília)</strong>
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
              {percentCompleted}%
            </span>
            <span className="text-xs text-slate-500 block">taxa de entrega concluída</span>
          </div>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-2xs">
          <div
            style={{ width: `${percentCompleted}%` }}
            className="bg-emerald-600 h-full transition-all"
            title={`Cumpridas: ${currentCycle.completedCount}`}
          />
          <div
            style={{ width: `${percentInProgress}%` }}
            className="bg-blue-500 h-full transition-all"
            title={`Em Andamento: ${currentCycle.inProgressCount}`}
          />
          <div
            style={{ width: `${percentDelayed}%` }}
            className="bg-amber-500 h-full transition-all"
            title={`Em Atraso: ${currentCycle.delayedCount}`}
          />
          <div
            style={{ width: `${percentNotCompleted}%` }}
            className="bg-rose-500 h-full transition-all"
            title={`Não Cumpridas: ${currentCycle.notCompletedCount}`}
          />
        </div>

        {/* 4 Stat KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <button
            onClick={() => setStatusFilter(statusFilter === 'cumprida' ? 'todos' : 'cumprida')}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === 'cumprida'
                ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400'
                : 'bg-slate-50 hover:bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cumpridas</span>
            </div>
            <div className="text-xl font-bold font-mono text-emerald-900 mt-1 tabular-nums">
              {currentCycle.completedCount}
              <span className="text-xs font-normal text-slate-500 ml-1">({percentCompleted}%)</span>
            </div>
          </button>

          <button
            onClick={() => setStatusFilter(statusFilter === 'em_andamento' ? 'todos' : 'em_andamento')}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === 'em_andamento'
                ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-400'
                : 'bg-slate-50 hover:bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-800">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Em Andamento</span>
            </div>
            <div className="text-xl font-bold font-mono text-blue-900 mt-1 tabular-nums">
              {currentCycle.inProgressCount}
              <span className="text-xs font-normal text-slate-500 ml-1">({percentInProgress}%)</span>
            </div>
          </button>

          <button
            onClick={() => setStatusFilter(statusFilter === 'em_atraso' ? 'todos' : 'em_atraso')}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === 'em_atraso'
                ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400'
                : 'bg-slate-50 hover:bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Em Atraso</span>
            </div>
            <div className="text-xl font-bold font-mono text-amber-900 mt-1 tabular-nums">
              {currentCycle.delayedCount}
              <span className="text-xs font-normal text-slate-500 ml-1">({percentDelayed}%)</span>
            </div>
          </button>

          <button
            onClick={() => setStatusFilter(statusFilter === 'nao_cumprida' ? 'todos' : 'nao_cumprida')}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === 'nao_cumprida'
                ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400'
                : 'bg-slate-50 hover:bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-800">
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Não Cumpridas</span>
            </div>
            <div className="text-xl font-bold font-mono text-rose-900 mt-1 tabular-nums">
              {currentCycle.notCompletedCount}
              <span className="text-xs font-normal text-slate-500 ml-1">({percentNotCompleted}%)</span>
            </div>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por compromisso (ex: Bolsa Família, 5 mil, Salário Mínimo, Desmatamento, Impostos)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Status filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Situação da Promessa
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as PromiseStatus | 'todos')}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="todos">Todos os Status ({currentCycle.promises.length})</option>
              <option value="cumprida">Apenas Cumpridas ({currentCycle.completedCount})</option>
              <option value="em_andamento">Apenas Em Andamento ({currentCycle.inProgressCount})</option>
              <option value="em_atraso">Apenas Em Atraso / Travadas ({currentCycle.delayedCount})</option>
              <option value="nao_cumprida">Apenas Não Cumpridas ({currentCycle.notCompletedCount})</option>
            </select>
          </div>

          {/* Eixo filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Eixo Temático
            </label>
            <select
              value={axisFilter}
              onChange={(e) => setAxisFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="todos">Todos os Eixos</option>
              {availableAxes.map(axis => (
                <option key={axis} value={axis}>{axis}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Exibindo <strong>{filteredPromises.length}</strong> de {currentCycle.promises.length} promessas</span>
          {(statusFilter !== 'todos' || axisFilter !== 'todos' || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter('todos');
                setAxisFilter('todos');
                setSearchQuery('');
              }}
              className="text-emerald-700 font-semibold hover:underline"
            >
              Limpar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Promises Cards List */}
      <div className="space-y-4">
        {filteredPromises.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs hover:shadow-md p-5 sm:p-6 space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-mono font-bold text-slate-800">{item.tseDirectiveNumber}</span>
                  <span>·</span>
                  <span className="font-semibold text-slate-700">{item.axis}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-medium">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    Última checagem: {item.lastCheckDate}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  item.status === 'cumprida'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : item.status === 'em_andamento'
                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                    : item.status === 'em_atraso'
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-rose-50 text-rose-800 border-rose-300'
                }`}>
                  {item.status === 'cumprida' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {item.status === 'em_andamento' && <Clock className="w-3.5 h-3.5 text-blue-600" />}
                  {item.status === 'em_atraso' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                  {item.status === 'nao_cumprida' && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                  <span>{item.statusLabel}</span>
                </span>
              </div>
            </div>

            {/* Official TSE text box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs space-y-1">
              <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">
                Texto Registrado Oficialmente no TSE na Candidatura:
              </span>
              <p className="text-slate-700 font-serif italic text-xs sm:text-[13px] leading-relaxed">
                "{item.tseOfficialQuote}"
              </p>
            </div>

            {/* Plain language citizen explanation */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 text-xs text-emerald-950 space-y-1">
              <span className="font-bold text-emerald-900 uppercase tracking-wider block text-[10px]">
                💬 Em bom português para o cidadão:
              </span>
              <p className="text-slate-800 text-xs sm:text-[13px] font-medium leading-relaxed">
                {item.simpleCitizenSummary}
              </p>
            </div>

            {/* Concrete Execution & Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">
                  ✓ O que foi entregue na prática:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {item.concreteDeliveryDetails}
                </p>
                {item.relatedLegislation && (
                  <div className="pt-1 font-mono text-[11px] text-emerald-700 font-semibold">
                    Lei/Norma: {item.relatedLegislation}
                  </div>
                )}
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">
                  ⚙️ Onde está travado / Como o Congresso votou:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {item.congressReaction}
                </p>
                <p className="text-slate-500 text-[11px] pt-1">
                  <strong>Ponto de Atenção:</strong> {item.pendingChallenges}
                </p>
              </div>
            </div>

            {/* Direct Project Link if exists */}
            {item.relatedProjectId && (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Esta promessa corresponde a uma matéria com votação nominal ativa no Congresso.
                </span>
                <button
                  onClick={() => onOpenProjectByCode(item.relatedProjectId!)}
                  className="flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <span>Acompanhar projeto no Radar Legislativo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
