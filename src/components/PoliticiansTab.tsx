import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Users,
  CheckCircle,
  FileText,
  Vote,
  Scale,
  ArrowRight,
  TrendingUp,
  Percent
} from 'lucide-react';
import { PoliticianProfile, House } from '../types/legislative';

interface PoliticiansTabProps {
  politicians: PoliticianProfile[];
  onSelectPolitician: (politician: PoliticianProfile) => void;
  onOpenProjectByCode: (code: string) => void;
}

export const PoliticiansTab: React.FC<PoliticiansTabProps> = ({
  politicians,
  onSelectPolitician,
  onOpenProjectByCode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHouse, setSelectedHouse] = useState<House | 'todas'>('todas');
  const [selectedParty, setSelectedParty] = useState<string>('todos');
  const [selectedIdeology, setSelectedIdeology] = useState<string>('todas');
  const [minGovAlignment, setMinGovAlignment] = useState<number>(0);

  // Available parties
  const parties = useMemo(() => {
    const list = new Set<string>();
    politicians.forEach(p => list.add(p.party));
    return Array.from(list).sort();
  }, [politicians]);

  // Filtered politicians
  const filteredPoliticians = useMemo(() => {
    return politicians.filter(pol => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = pol.name.toLowerCase().includes(query) || pol.officialName.toLowerCase().includes(query);
        const matchesParty = pol.party.toLowerCase().includes(query);
        const matchesState = pol.state.toLowerCase().includes(query);
        const matchesIdeology = pol.declaredIdeology.toLowerCase().includes(query);
        const matchesProposal = pol.proposals.some(pr => pr.title.toLowerCase().includes(query) || pr.code.toLowerCase().includes(query));

        if (!matchesName && !matchesParty && !matchesState && !matchesIdeology && !matchesProposal) {
          return false;
        }
      }

      if (selectedHouse !== 'todas' && pol.house !== selectedHouse) {
        return false;
      }

      if (selectedParty !== 'todos' && pol.party !== selectedParty) {
        return false;
      }

      if (selectedIdeology !== 'todas' && pol.ideologyCategory !== selectedIdeology) {
        return false;
      }

      if (pol.governmentAlignmentPercentage < minGovAlignment) {
        return false;
      }

      return true;
    });
  }, [politicians, searchQuery, selectedHouse, selectedParty, selectedIdeology, minGovAlignment]);

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            Monitoramento de Mandatos
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Parlamentares, Propostas e Coerência de Votos
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Consulte as propostas de autoria de cada deputado federal e senador da República. Compare como cada parlamentar votou nas principais pautas e verifique se as decisões em plenário acompanham o <strong>Plano de Governo oficial</strong> ou as <strong>ideologias que ele defende publicamente</strong> em discursos e redes.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-sans font-medium">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              Última atualização de votos e propostas: <strong>25/10/2026 às 15:42</strong> (57ª Legislatura)
            </span>
            <span className="text-xs text-slate-400">· Dados oficiais da Câmara e Senado</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar parlamentar por nome, partido (ex: PL, PT, União), estado ou proposta..."
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
              <option value="todas">Senado e Câmara</option>
              <option value="camara">Câmara dos Deputados</option>
              <option value="senado">Senado Federal</option>
            </select>
          </div>

          {/* Partido */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Partido Político
            </label>
            <select
              value={selectedParty}
              onChange={(e) => setSelectedParty(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="todos">Todos os Partidos</option>
              {parties.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Espectro Político */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Espectro / Ideologia Declarada
            </label>
            <select
              value={selectedIdeology}
              onChange={(e) => setSelectedIdeology(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="todas">Todas as Posições</option>
              <option value="Direita">Direita</option>
              <option value="Centro-Direita">Centro-Direita</option>
              <option value="Centro">Centro</option>
              <option value="Centro-Esquerda">Centro-Esquerda</option>
              <option value="Esquerda">Esquerda</option>
            </select>
          </div>

          {/* Alignment slider */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center justify-between">
              <span>Alinhamento c/ Governo:</span>
              <span className="font-mono text-emerald-700">Min. {minGovAlignment}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="90"
              step="10"
              value={minGovAlignment}
              onChange={(e) => setMinGovAlignment(Number(e.target.value))}
              className="w-full accent-emerald-600 mt-1"
            />
          </div>
        </div>
      </div>

      {/* Grid of Politicians */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPoliticians.map((pol) => (
          <div
            key={pol.id}
            className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs hover:shadow-md p-5 flex flex-col justify-between space-y-4"
          >
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-xs shrink-0 ${pol.avatarColor}`}>
                    {pol.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-bold text-slate-800">{pol.party}</span>
                      <span>/</span>
                      <span>{pol.state}</span>
                      <span>·</span>
                      <span>{pol.house === 'senado' ? 'Senado' : 'Câmara'}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {pol.name}
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                  {pol.ideologyCategory}
                </span>
              </div>

              {/* Declared ideology excerpt */}
              <p className="text-xs text-slate-600 line-clamp-2 italic font-serif">
                "{pol.declaredIdeology}"
              </p>

              {/* Government Alignment Metric */}
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
                    Alinhamento c/ Governo Federal:
                  </span>
                  <span className={`font-mono font-bold tabular-nums ${
                    pol.governmentAlignmentPercentage >= 70
                      ? 'text-emerald-700'
                      : pol.governmentAlignmentPercentage <= 25
                      ? 'text-rose-700'
                      : 'text-amber-700'
                  }`}>
                    {pol.governmentAlignmentPercentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${pol.governmentAlignmentPercentage}%` }}
                    className={`h-full rounded-full ${
                      pol.governmentAlignmentPercentage >= 70
                        ? 'bg-emerald-600'
                        : pol.governmentAlignmentPercentage <= 25
                        ? 'bg-rose-600'
                        : 'bg-amber-500'
                    }`}
                  />
                </div>
              </div>

              {/* Propostas em Destaque */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Proposta de Destaque:
                </span>
                {pol.proposals.slice(0, 1).map(pr => (
                  <div key={pr.id} className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-slate-900">{pr.code}</span>
                      <span className="text-slate-400">·</span>
                      <span className="font-semibold text-slate-800 truncate">{pr.title}</span>
                    </div>
                    {pr.simpleExplanation && (
                      <p className="text-[11px] text-emerald-900 font-medium line-clamp-2">
                        💡 {pr.simpleExplanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-700 font-semibold font-mono tabular-nums">
                  {pol.recentVotes.length} votações nominais
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Sincronizado: 25/10/2026 às 15:42
                </span>
              </div>

              <button
                onClick={() => onSelectPolitician(pol)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <span>Ver Propostas & Votos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
