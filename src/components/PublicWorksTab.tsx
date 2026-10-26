import React, { useState, useMemo } from 'react';
import {
  HardHat,
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Coins,
  CheckCircle2,
  TrendingUp,
  Building2,
  Layers,
  ArrowRight,
  UserCheck,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  MessageCircle
} from 'lucide-react';
import { PublicWork, PublicWorkStatus, PublicWorkCategory } from '../types/legislative';
import { PUBLIC_WORKS_DATABASE, BRAZILIAN_STATES } from '../data/publicWorksData';
import { sharePublicWorkWhatsApp } from '../utils/whatsappShare';

interface PublicWorksTabProps {
  onSelectPoliticianById?: (id: string) => void;
}

export const PublicWorksTab: React.FC<PublicWorksTabProps> = ({
  onSelectPoliticianById
}) => {
  const [selectedState, setSelectedState] = useState<string>('TODOS');
  const [selectedCity, setSelectedCity] = useState<string>('TODAS');
  const [selectedStatus, setSelectedStatus] = useState<string>('TODOS');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWorkForModal, setSelectedWorkForModal] = useState<PublicWork | null>(null);

  // Available cities dependent on selected state
  const availableCities = useMemo(() => {
    if (selectedState === 'TODOS') {
      const citiesSet = new Set<string>();
      PUBLIC_WORKS_DATABASE.forEach(w => citiesSet.add(w.city));
      return Array.from(citiesSet).sort((a, b) => a.localeCompare(b));
    }
    const citiesSet = new Set<string>();
    PUBLIC_WORKS_DATABASE
      .filter(w => w.state === selectedState)
      .forEach(w => citiesSet.add(w.city));
    return Array.from(citiesSet).sort((a, b) => a.localeCompare(b));
  }, [selectedState]);

  // Categories list
  const categories: PublicWorkCategory[] = [
    'Transporte & Rodovias',
    'Saúde & Hospitais',
    'Educação & Creches',
    'Saneamento & Água',
    'Habitação (MCMV)',
    'Energia & Barragens',
    'Segurança Pública'
  ];

  // Filtering logic
  const filteredWorks = useMemo(() => {
    return PUBLIC_WORKS_DATABASE.filter(work => {
      // State filter
      if (selectedState !== 'TODOS' && work.state !== selectedState) {
        return false;
      }
      // City filter
      if (selectedCity !== 'TODAS' && work.city !== selectedCity) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'TODOS' && work.status !== selectedStatus) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'TODAS' && work.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inName = work.name.toLowerCase().includes(query);
        const inCity = work.city.toLowerCase().includes(query);
        const inDesc = work.description.toLowerCase().includes(query);
        const inSimple = work.simpleCitizenDescription.toLowerCase().includes(query);
        const inEntity = work.executingEntity?.toLowerCase().includes(query);
        const inSponsor = work.parliamentarySponsor?.name.toLowerCase().includes(query);
        if (!inName && !inCity && !inDesc && !inSimple && !inEntity && !inSponsor) {
          return false;
        }
      }
      return true;
    });
  }, [selectedState, selectedCity, selectedStatus, selectedCategory, searchQuery]);

  // High-level statistics
  const stats = useMemo(() => {
    const totalCount = filteredWorks.length;
    const planningCount = filteredWorks.filter(w => w.status === 'planejamento').length;
    const inProgressCount = filteredWorks.filter(w => w.status === 'em_andamento').length;
    const deliveringCount = filteredWorks.filter(w => w.status === 'sendo_entregue').length;

    const totalInvestment = filteredWorks.reduce((acc, curr) => acc + curr.investmentValue, 0);

    // Format total in Billions / Millions
    let totalInvestFormatted = 'R$ 0';
    if (totalInvestment >= 1_000_000_000) {
      totalInvestFormatted = `R$ ${(totalInvestment / 1_000_000_000).toFixed(1).replace('.', ',')} bilhões`;
    } else if (totalInvestment >= 1_000_000) {
      totalInvestFormatted = `R$ ${(totalInvestment / 1_000_000).toFixed(0)} milhões`;
    }

    return {
      totalCount,
      planningCount,
      inProgressCount,
      deliveringCount,
      totalInvestFormatted
    };
  }, [filteredWorks]);

  const handleStateChange = (stateUf: string) => {
    setSelectedState(stateUf);
    setSelectedCity('TODAS'); // reset city when state changes
  };

  const getStatusBadge = (status: PublicWorkStatus) => {
    switch (status) {
      case 'planejamento':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Em Planejamento
          </span>
        );
      case 'em_andamento':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            Em Andamento
          </span>
        );
      case 'sendo_entregue':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Sendo Entregue
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <HardHat className="w-3.5 h-3.5 text-emerald-400" />
            Transparência de Infraestrutura & Gastos Públicos
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Monitor de Obras Públicas por Estado e Município
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Acompanhe em linguagem simples o andamento das obras federais e estaduais no Brasil.
            Veja o valor de investimento em reais, a contagem de dias restantes até a entrega, o estágio físico de execução
            e quais parlamentares destinaram emendas ou patrocinaram o projeto.
          </p>

          {/* Last Update Notice */}
          <div
            className="inline-flex items-center gap-2 mt-3 bg-slate-800/90 border border-slate-700 text-xs px-3 py-1.5 rounded-lg text-emerald-300 cursor-help"
            title="Momento em que o sistema extraiu os relatórios de execução física do Ministério da Gestão e Inovação / CGU. Não é o horário do seu celular."
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Coleta de dados nas bases de obras federais: <strong className="text-white font-mono">25/10/2026 às 14:00 (Brasília)</strong></span>
            <span className="text-slate-400 hidden md:inline">· Fonte: Transferegov.br & Painel de Obras</span>
          </div>
        </div>

        {/* Real-time KPIs Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-700/60">
          <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-medium block">Investimento Filtrado</span>
            <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
              {stats.totalInvestFormatted}
            </span>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-medium block">Sendo Entregues</span>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black text-emerald-300 font-mono">
                {stats.deliveringCount}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/80 px-1.5 py-0.5 rounded">
                Fase Final
              </span>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-medium block">Em Andamento</span>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black text-blue-400 font-mono">
                {stats.inProgressCount}
              </span>
              <span className="text-[10px] text-blue-400 font-medium bg-blue-950/80 px-1.5 py-0.5 rounded">
                No Canteiro
              </span>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-medium block">Em Planejamento</span>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black text-amber-400 font-mono">
                {stats.planningCount}
              </span>
              <span className="text-[10px] text-amber-400 font-medium bg-amber-950/80 px-1.5 py-0.5 rounded">
                Projetos/Licitação
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Query Control Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
        {/* Main Filters: State & City dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* State (UF) selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Estado (UF):
            </label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-8"
              >
                <option value="TODOS">Todos os Estados (Brasil)</option>
                {BRAZILIAN_STATES.map(s => (
                  <option key={s.uf} value={s.uf}>
                    {s.name} ({s.uf})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* City selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              Município / Cidade:
            </label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-8"
              >
                <option value="TODAS">
                  {selectedState === 'TODOS' ? 'Todas as Cidades' : `Todas de ${selectedState}`}
                </option>
                {availableCities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Status selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              Situação da Obra:
            </label>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-8"
              >
                <option value="TODOS">Todas as Situações</option>
                <option value="planejamento">Em Planejamento</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="sendo_entregue">Sendo Entregues (Fase Final)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Category selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              Área Temática:
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-8"
              >
                <option value="TODAS">Todas as Áreas</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Free text search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome da obra, hospital, rodovia, ferrovia, escola, metrô ou político envolvido..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-semibold"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Status quick tabs */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100 text-xs">
          <span className="font-semibold text-slate-500 py-1">Atalhos de Status:</span>
          <button
            onClick={() => setSelectedStatus('TODOS')}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              selectedStatus === 'TODOS'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas ({PUBLIC_WORKS_DATABASE.length})
          </button>
          <button
            onClick={() => setSelectedStatus('sendo_entregue')}
            className={`px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
              selectedStatus === 'sendo_entregue'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            Sendo Entregues
          </button>
          <button
            onClick={() => setSelectedStatus('em_andamento')}
            className={`px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
              selectedStatus === 'em_andamento'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            <TrendingUp className="w-3 h-3" />
            Em Andamento
          </button>
          <button
            onClick={() => setSelectedStatus('planejamento')}
            className={`px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
              selectedStatus === 'planejamento'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Clock className="w-3 h-3" />
            Em Planejamento
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>
          Exibindo <strong>{filteredWorks.length}</strong> {filteredWorks.length === 1 ? 'obra pública' : 'obras públicas'}
          {selectedState !== 'TODOS' && ` em ${selectedState}`}
          {selectedCity !== 'TODAS' && ` (${selectedCity})`}
        </span>
        <span>Ordenado por volume de investimento e prazo</span>
      </div>

      {/* Works Grid */}
      {filteredWorks.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Nenhuma obra encontrada para estes filtros</h3>
          <p className="text-slate-500 text-xs max-w-md mx-auto">
            Tente remover alguns filtros ou selecionar "Todos os Estados" e "Todas as Situações" para visualizar todas as intervenções cadastradas.
          </p>
          <button
            onClick={() => {
              setSelectedState('TODOS');
              setSelectedCity('TODAS');
              setSelectedStatus('TODOS');
              setSelectedCategory('TODAS');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Restaurar Filtros Padrão
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredWorks.map((work) => {
            const isDelivering = work.status === 'sendo_entregue';
            const isPlanning = work.status === 'planejamento';

            return (
              <div
                key={work.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Top strip with State, City, Status and Category */}
                <div className="p-5 pb-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900 text-white font-mono">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {work.city} / {work.state}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                        {work.category}
                      </span>
                    </div>

                    <div>{getStatusBadge(work.status)}</div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {work.name}
                  </h3>

                  {/* Plain Language for Laypersons */}
                  <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-xs text-emerald-950 space-y-1">
                    <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <span>💬 Em bom português (o que muda na sua vida):</span>
                    </div>
                    <p className="leading-relaxed text-emerald-900/90 font-medium">
                      {work.simpleCitizenDescription}
                    </p>
                  </div>

                  {/* Technical description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {work.description}
                  </p>
                </div>

                {/* Quantitative Data Section: Investment & Days Remaining */}
                <div className="bg-slate-50/90 px-5 py-3.5 border-t border-slate-100 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Investment value */}
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                        <Coins className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Investimento Total</span>
                      </div>
                      <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5">
                        {work.investmentFormatted}
                      </div>
                    </div>

                    {/* Days remaining */}
                    <div className={`p-2.5 rounded-lg border ${
                      isDelivering
                        ? 'bg-emerald-50 border-emerald-200'
                        : isPlanning
                        ? 'bg-amber-50/60 border-amber-200'
                        : 'bg-white border-slate-200/80'
                    }`}>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                        <Clock className={`w-3.5 h-3.5 ${isDelivering ? 'text-emerald-600 animate-bounce' : 'text-slate-600'}`} />
                        <span>Prazo Previsto</span>
                      </div>
                      <div className="text-sm font-extrabold font-mono mt-0.5 flex items-center gap-1">
                        {work.daysRemaining === 0 ? (
                          <span className="text-emerald-700">Concluída</span>
                        ) : work.daysRemaining <= 60 ? (
                          <span className="text-emerald-700 font-bold">
                            Restam {work.daysRemaining} dias 🔥
                          </span>
                        ) : (
                          <span className="text-slate-800">
                            Restam {work.daysRemaining} dias
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
                      <span>Avanço físico da obra:</span>
                      <span className="font-mono font-bold text-slate-900">{work.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isDelivering
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                            : isPlanning
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                            : 'bg-gradient-to-r from-blue-500 to-emerald-500'
                        }`}
                        style={{ width: `${work.progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Início: {work.startDate}</span>
                      <span>Conclusão: {work.estimatedEndDate}</span>
                    </div>
                  </div>

                  {/* Origin of Resources & Parliamentary Sponsor */}
                  <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="font-semibold text-slate-700">Origem:</span>
                      <span className="px-2 py-0.5 bg-slate-200/70 rounded text-[11px] font-medium text-slate-800">
                        {work.fundingSource}
                      </span>
                    </div>

                    {work.parliamentarySponsor && (
                      <div className="flex items-center gap-1 text-[11px]">
                        <span className="text-slate-500">Articulação:</span>
                        {onSelectPoliticianById ? (
                          <button
                            onClick={() => onSelectPoliticianById(work.parliamentarySponsor!.id)}
                            className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-0.5"
                          >
                            <UserCheck className="w-3 h-3" />
                            {work.parliamentarySponsor.name}
                          </button>
                        ) : (
                          <span className="font-bold text-slate-700">
                            {work.parliamentarySponsor.name}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer action button */}
                <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="text-slate-600 truncate max-w-[170px]" title={work.executingEntity}>
                      Executor: {work.executingEntity || 'Governo do Estado'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Sincronizado: 25/10/2026 às 14:00
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sharePublicWorkWhatsApp(
                          work.name,
                          work.city,
                          work.state,
                          work.investmentFormatted,
                          work.daysRemaining,
                          work.simpleCitizenDescription
                        );
                      }}
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                      title="Mandar no WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedWorkForModal(work)}
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                    >
                      Auditoria
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Full Audit & Details of the selected work */}
      {selectedWorkForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-900 text-white font-mono">
                    {selectedWorkForModal.city} / {selectedWorkForModal.state}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {selectedWorkForModal.category}
                  </span>
                  {getStatusBadge(selectedWorkForModal.status)}
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedWorkForModal.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedWorkForModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg"
              >
                &times;
              </button>
            </div>

            {/* Layperson summary box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-950 space-y-1.5">
              <h4 className="font-bold text-sm text-emerald-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                Resumo Cidadão (Linguagem Acessível sem jargão):
              </h4>
              <p className="text-sm leading-relaxed font-medium">
                {selectedWorkForModal.simpleCitizenDescription}
              </p>
            </div>

            {/* Official Description */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Detalhamento Técnico do Projeto
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedWorkForModal.description}
              </p>
            </div>

            {/* Key Grid Data */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Valor de Investimento</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {selectedWorkForModal.investmentFormatted}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Dias Restantes</span>
                <span className="text-base font-bold text-emerald-700 font-mono">
                  {selectedWorkForModal.daysRemaining} dias
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Execução Física</span>
                <span className="text-base font-bold text-blue-700 font-mono">
                  {selectedWorkForModal.progressPercentage}% concluído
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Data de Início</span>
                <span className="font-semibold text-slate-800 font-mono">
                  {selectedWorkForModal.startDate}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Previsão de Conclusão</span>
                <span className="font-semibold text-slate-800 font-mono">
                  {selectedWorkForModal.estimatedEndDate}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">População Beneficiada</span>
                <span className="font-semibold text-slate-800">
                  {selectedWorkForModal.beneficiariesEstimate || 'População regional'}
                </span>
              </div>
            </div>

            {/* Responsible entities & Sponsors */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Fonte de Financiamento:</span>
                <span className="font-bold text-slate-800">{selectedWorkForModal.fundingSource}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Órgão Executor:</span>
                <span className="font-semibold text-slate-800">{selectedWorkForModal.executingEntity || 'Governo Local'}</span>
              </div>
              {selectedWorkForModal.parliamentarySponsor && (
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Político Articulador / Emenda:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {selectedWorkForModal.parliamentarySponsor.name}
                  </span>
                </div>
              )}
            </div>

            {/* Official Source Note */}
            <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div>
                <span>Fonte: Transferegov.br & Painel de Obras · </span>
                <span className="font-semibold text-slate-800">Última atualização: 25/10/2026 às 14:00</span>
              </div>
              <a
                href="https://portaldatransparencia.gov.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                Checar no Portal da Transparência
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2">
              <button
                onClick={() => {
                  sharePublicWorkWhatsApp(
                    selectedWorkForModal.name,
                    selectedWorkForModal.city,
                    selectedWorkForModal.state,
                    selectedWorkForModal.investmentFormatted,
                    selectedWorkForModal.daysRemaining,
                    selectedWorkForModal.simpleCitizenDescription
                  );
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Mandar no WhatsApp
              </button>

              <button
                onClick={() => setSelectedWorkForModal(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
