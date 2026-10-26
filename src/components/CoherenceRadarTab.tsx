import React, { useState } from 'react';
import {
  Scale,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  BarChart3,
  Landmark
} from 'lucide-react';
import { PoliticianProfile, LegislativeProject } from '../types/legislative';

interface CoherenceRadarTabProps {
  politicians: PoliticianProfile[];
  projects: LegislativeProject[];
  onSelectPolitician: (politician: PoliticianProfile) => void;
  onSelectProject: (project: LegislativeProject) => void;
}

export const CoherenceRadarTab: React.FC<CoherenceRadarTabProps> = ({
  politicians,
  projects,
  onSelectPolitician,
  onSelectProject
}) => {
  const [selectedCaseProject, setSelectedCaseProject] = useState<string>('plp-68-2024');

  // Group party alignment stats
  const partyStats = [
    { party: 'PT / Federação Brasil da Esperança', govAlignment: 99, fidelity: 99, stance: 'Base Governista Central', color: 'bg-red-600' },
    { party: 'PSB / PDT', govAlignment: 82, fidelity: 88, stance: 'Base Aliada Progressista', color: 'bg-rose-500' },
    { party: 'Republicanos', govAlignment: 68, fidelity: 94, stance: 'Centro Independente / Diálogo Institucional', color: 'bg-amber-600' },
    { party: 'União Brasil / MDB / PSD', govAlignment: 65, fidelity: 78, stance: 'Centro-Direita Dividido / Negociação Pontual', color: 'bg-blue-600' },
    { party: 'PP', govAlignment: 54, fidelity: 85, stance: 'Centro-Direita / Pautas Econômicas', color: 'bg-indigo-600' },
    { party: 'PL', govAlignment: 14, fidelity: 96, stance: 'Oposição Conservadora Firme', color: 'bg-emerald-700' },
    { party: 'NOVO', govAlignment: 11, fidelity: 98, stance: 'Oposição Liberal Estrita', color: 'bg-orange-600' }
  ];

  const currentProject = projects.find(p => p.id === selectedCaseProject) || projects[0];

  return (
    <div className="space-y-6">
      {/* Intro Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Observatório Cívico de Coerência</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Radar de Coerência: Votos em Plenário vs. Discurso Público & Plano de Governo
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Esta ferramenta audita se a conduta prática dos deputados federais e senadores respeita o que eles prometem aos eleitores e como se posicionam em relação ao plano de diretrizes do Governo Federal.
          </p>
        </div>
      </div>

      {/* 2-Column Overview: Party Alignment vs Notable Case Studies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Party Alignment with Government Plan */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-600" />
              <h3 className="font-bold text-slate-900 text-sm">
                Alinhamento Partidário ao Plano de Governo
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Legislatura 2023–2027</span>
          </div>

          <div className="space-y-3.5 pt-1">
            {partyStats.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="font-semibold text-slate-800">{item.party}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {item.govAlignment}% alinhamento
                  </span>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.govAlignment}%` }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>

                <div className="text-[11px] text-slate-500">
                  Posicionamento: {item.stance}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Methodology & Criteria */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Critérios de Avaliação de Coerência
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
              <strong className="text-emerald-900 block font-semibold">
                1. Alta Coerência Ideológica
              </strong>
              <p className="mt-0.5 text-emerald-800 leading-relaxed">
                O voto nominal em plenário espelha diretamente as bandeiras centrais, compromissos eleitorais e os discursos feitos pelo parlamentar na tribuna e em suas redes oficiais.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
              <strong className="text-amber-900 block font-semibold">
                2. Voto Pragmático / Negociação Federativa
              </strong>
              <p className="mt-0.5 text-amber-800 leading-relaxed">
                O parlamentar flexibilizou sua orientação doutrinária para assegurar benefícios diretos ao seu Estado (ex: Zona Franca, Fundo Constitucional) ou cedeu mediante acordo com a presidência da Casa.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-rose-50 border border-rose-100">
              <strong className="text-rose-900 block font-semibold">
                3. Divergência Ideológica ou Ruptura c/ Governo
              </strong>
              <p className="mt-0.5 text-rose-800 leading-relaxed">
                O parlamentar contrariou abertamente seu discurso público (ex: pregou corte de impostos mas votou a favor de aumento de tributo) ou rompeu com a orientação do Plano de Governo ao qual pertence sua legenda.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Matrix by Project */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Auditoria em Pautas Paradigmáticas
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Escolha uma matéria para comparar como cada polo do Congresso se posicionou e como justificou sua decisão.
            </p>
          </div>

          {/* Project selector */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedCaseProject}
              onChange={(e) => setSelectedCaseProject(e.target.value)}
              className="w-full sm:w-80 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.code} - {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Project Summary */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-mono font-bold text-emerald-800 text-sm">{currentProject.code}</span>
            <h4 className="font-bold text-slate-900 text-sm mt-0.5">{currentProject.title}</h4>
            <p className="text-slate-600 mt-1 line-clamp-2">{currentProject.shortDescription}</p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => onSelectProject(currentProject)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
            >
              Ver Projeto na Íntegra
            </button>
          </div>
        </div>

        {/* Comparison Cards of key politicians on this specific project */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {politicians.map((pol) => {
            const voteItem = pol.recentVotes.find(v => v.projectCode === currentProject.code || v.projectId === currentProject.id);
            if (!voteItem) return null;

            return (
              <div
                key={pol.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs ${pol.avatarColor}`}>
                      {pol.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{pol.name}</div>
                      <div className="text-[11px] text-slate-500">{pol.party}/{pol.state} · {pol.ideologyCategory}</div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                    voteItem.vote === 'SIM'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}>
                    {voteItem.vote}
                  </span>
                </div>

                <div className="text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Coerência c/ Discurso:</span>
                    <span className={`font-semibold ${
                      voteItem.coherenceRating === 'Alta Coerência'
                        ? 'text-emerald-700'
                        : voteItem.coherenceRating === 'Voto Pragmático'
                        ? 'text-amber-700'
                        : 'text-rose-700'
                    }`}>
                      {voteItem.coherenceRating}
                    </span>
                  </div>

                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100 leading-relaxed text-[11px]">
                    {voteItem.coherenceExplanation}
                  </p>
                </div>

                <button
                  onClick={() => onSelectPolitician(pol)}
                  className="w-full py-1 text-center text-xs text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
                >
                  Abrir histórico completo de {pol.name} →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
