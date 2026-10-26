import React from 'react';
import { Bell, Radio, CheckCircle2, BookOpen } from 'lucide-react';
import { LegislativeAlert } from '../types/legislative';

interface HeaderProps {
  activeTab: 'pautas' | 'plano_governo' | 'obras' | 'politicos' | 'coerencia' | 'simulador' | 'guia_eleitoral' | 'fontes';
  setActiveTab: (tab: 'pautas' | 'plano_governo' | 'obras' | 'politicos' | 'coerencia' | 'simulador' | 'guia_eleitoral' | 'fontes') => void;
  alerts: LegislativeAlert[];
  unreadCount: number;
  onOpenNotifications: () => void;
  onSimulateLiveEvent: () => void;
  isSimulating: boolean;
  onOpenGlossary?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  unreadCount,
  onOpenNotifications,
  onSimulateLiveEvent,
  isSimulating,
  onOpenGlossary
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white">
      {/* Institutional Top Strip */}
      <div className="bg-slate-950/80 px-4 sm:px-8 py-1.5 text-xs text-slate-400 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Transmissão de Dados do Congresso Nacional
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline">Senado Federal & Câmara dos Deputados</span>
        </div>

        {/* Prominent Last Update Timestamp Indicator */}
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <div
            className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 rounded font-sans font-medium cursor-help"
            title="Momento exato em que os dados foram coletados dos portais oficiais do Governo (TSE, Câmara e Senado). Não é o relógio do seu celular."
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Última coleta nos portais do Governo: <strong className="font-mono text-white">25/10/2026 às 15:42</strong></span>
            <span className="hidden md:inline text-emerald-400/80 text-[10px]">(Horário de Brasília)</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-slate-400 font-sans text-[11px]">
            <span className="text-slate-500">Relógio do Congresso:</span>
            <span className="text-slate-300 font-mono tabular-nums">15:45 BRT</span>
          </div>
          <span className="hidden md:inline text-slate-600">·</span>
          <span className="hidden md:inline text-slate-400">Legislatura 57ª</span>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm font-bold text-sm border border-emerald-500/30">
            RL
          </div>
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('pautas');
              }}
              className="text-lg font-bold tracking-tight text-white whitespace-nowrap block leading-tight"
            >
              Radar Legislativo
            </a>
            <span className="text-[11px] text-slate-400 tracking-wider block">
              Senado & Câmara em Tempo Real
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Single-line text with clean hover/active state) */}
        <nav className="hidden lg:flex items-center gap-4 text-sm font-medium">
          <button
            onClick={() => setActiveTab('pautas')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === 'pautas'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            Pautas & Urgências
          </button>
          <button
            onClick={() => setActiveTab('plano_governo')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === 'plano_governo'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            Plano de Governo (TSE)
          </button>
          <button
            onClick={() => setActiveTab('obras')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'obras'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <span>Obras Públicas</span>
            <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] rounded-full font-bold">
              Novo
            </span>
          </button>
          <button
            onClick={() => setActiveTab('politicos')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === 'politicos'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            Parlamentares
          </button>
          <button
            onClick={() => setActiveTab('coerencia')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === 'coerencia'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            Coerência
          </button>
          <button
            onClick={() => setActiveTab('simulador')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === 'simulador'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            Simulador
          </button>
          <button
            onClick={() => setActiveTab('guia_eleitoral')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'guia_eleitoral'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <span>Guia Eleitoral & Colinha</span>
            <span className="px-1.5 py-0.2 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-[10px] rounded-full font-bold">
              Eleições
            </span>
          </button>
          <button
            onClick={() => setActiveTab('fontes')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === 'fontes'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            Fontes Oficiais
          </button>
        </nav>

        {/* Zone 3: Primary Action & Live Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onOpenGlossary && (
            <button
              onClick={onOpenGlossary}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 transition-colors"
              title="Abrir dicionário de termos políticos para iniciantes"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dicionário Cívico</span>
            </button>
          )}

          <button
            onClick={onSimulateLiveEvent}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              isSimulating
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200'
            }`}
            title="Simular atualização de votação em tempo real no plenário"
          >
            {isSimulating ? (
              <>
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span className="hidden sm:inline">Atualizando...</span>
              </>
            ) : (
              <>
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Simular Evento ao Vivo</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Alertas e Notificações Automáticas"
            aria-label="Abrir central de notificações"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="lg:hidden flex items-center overflow-x-auto gap-2 px-4 py-2 bg-slate-950 border-t border-slate-800/80 text-xs font-medium">
        <button
          onClick={() => setActiveTab('pautas')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'pautas' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Pautas & Urgências
        </button>
        <button
          onClick={() => setActiveTab('plano_governo')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'plano_governo' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Plano de Governo (TSE)
        </button>
        <button
          onClick={() => setActiveTab('obras')}
          className={`px-3 py-1.5 rounded whitespace-nowrap flex items-center gap-1 ${
            activeTab === 'obras' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Obras Públicas</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </button>
        <button
          onClick={() => setActiveTab('politicos')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'politicos' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Parlamentares & Propostas
        </button>
        <button
          onClick={() => setActiveTab('coerencia')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'coerencia' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Coerência & Governo
        </button>
        <button
          onClick={() => setActiveTab('simulador')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'simulador' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Simulador Cidadão
        </button>
        <button
          onClick={() => setActiveTab('guia_eleitoral')}
          className={`px-3 py-1.5 rounded whitespace-nowrap flex items-center gap-1 ${
            activeTab === 'guia_eleitoral' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Guia Eleitoral & Colinha</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
        </button>
        <button
          onClick={() => setActiveTab('fontes')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'fontes' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Fontes Oficiais
        </button>
      </div>
    </header>
  );
};
