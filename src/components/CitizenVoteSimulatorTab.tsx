import React, { useState } from 'react';
import {
  Vote,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { LegislativeProject, PoliticianProfile } from '../types/legislative';

interface CitizenVoteSimulatorTabProps {
  projects: LegislativeProject[];
  politicians: PoliticianProfile[];
  onSelectPolitician: (politician: PoliticianProfile) => void;
  onSelectProject: (project: LegislativeProject) => void;
}

export const CitizenVoteSimulatorTab: React.FC<CitizenVoteSimulatorTabProps> = ({
  projects,
  politicians,
  onSelectPolitician,
  onSelectProject
}) => {
  // Key bills for citizen polling
  const pollProjects = projects.slice(0, 5);

  const [userVotes, setUserVotes] = useState<Record<string, 'SIM' | 'NÃO'>>({
    'plp-68-2024': 'SIM',
    'pl-182-2024': 'SIM',
    'pec-45-2023': 'NÃO',
    'pec-6-2024': 'SIM'
  });

  const handleVote = (projectId: string, vote: 'SIM' | 'NÃO') => {
    setUserVotes(prev => ({
      ...prev,
      [projectId]: vote
    }));
  };

  const resetVotes = () => {
    setUserVotes({});
  };

  // Compute affinity with each politician based on matching votes
  const politicianAffinities = politicians.map(pol => {
    let matchCount = 0;
    let eligibleCount = 0;

    pollProjects.forEach(proj => {
      const citizenChoice = userVotes[proj.id];
      if (!citizenChoice) return;

      const polVoteRecord = pol.recentVotes.find(v => v.projectCode === proj.code || v.projectId === proj.id);
      if (polVoteRecord) {
        eligibleCount++;
        if (polVoteRecord.vote === citizenChoice) {
          matchCount++;
        }
      }
    });

    const score = eligibleCount > 0 ? Math.round((matchCount / eligibleCount) * 100) : 50;

    return {
      politician: pol,
      score,
      matches: matchCount,
      total: eligibleCount
    };
  }).sort((a, b) => b.score - a.score);

  // Compute alignment with government plan
  let govMatches = 0;
  let govTotal = 0;
  pollProjects.forEach(proj => {
    const citizenChoice = userVotes[proj.id];
    if (!citizenChoice) return;
    govTotal++;
    const govFav = proj.governmentPosition === 'FAVORÁVEL';
    if ((citizenChoice === 'SIM' && govFav) || (citizenChoice === 'NÃO' && !govFav)) {
      govMatches++;
    }
  });
  const govAlignmentScore = govTotal > 0 ? Math.round((govMatches / govTotal) * 100) : 50;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <Vote className="w-4 h-4" />
            <span>Simulador de Afinidade Legislativa</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Descubra quais deputados e senadores votam como você
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Vote nas principais matérias em pauta no Congresso Nacional e nosso algoritmo comparará suas escolhas com os votos nominais de cada parlamentar e com o Plano de Governo Federal.
          </p>
        </div>

        <button
          onClick={resetVotes}
          className="self-start md:self-center flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reiniciar Escolhas</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Poll Questions (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Pautas em Julgamento Popular:
          </h3>

          <div className="space-y-4">
            {pollProjects.map((proj) => {
              const currentChoice = userVotes[proj.id];

              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono font-bold text-slate-900">{proj.code}</span>
                    <span>{proj.theme}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base leading-snug">
                    {proj.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.shortDescription}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      Sua Decisão Cidadã:
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVote(proj.id, 'SIM')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          currentChoice === 'SIM'
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                            : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>A Favor (SIM)</span>
                      </button>

                      <button
                        onClick={() => handleVote(proj.id, 'NÃO')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          currentChoice === 'NÃO'
                            ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                            : 'bg-slate-50 hover:bg-rose-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span>Contra (NÃO)</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Affinity Results (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Seu Diagnóstico de Representatividade:
          </h3>

          {/* Government plan gauge */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Alinhamento c/ Plano de Governo
              </span>
              <span className="text-lg font-bold font-mono text-blue-700 tabular-nums">
                {govAlignmentScore}%
              </span>
            </div>

            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${govAlignmentScore}%` }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {govAlignmentScore >= 70
                ? 'Suas escolhas coincidem majoritariamente com as diretrizes e prioridades do Governo Federal.'
                : govAlignmentScore <= 35
                ? 'Seus votos representam forte oposição às matérias e reformas propostas pelo Executivo.'
                : 'Posicionamento moderado e independente em relação à agenda oficial.'}
            </p>
          </div>

          {/* Politician Match Rank */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Parlamentares com Maior Afinidade aos seus Votos:
            </span>

            <div className="space-y-3">
              {politicianAffinities.slice(0, 5).map(({ politician, score, matches, total }) => (
                <div
                  key={politician.id}
                  onClick={() => onSelectPolitician(politician)}
                  className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 bg-slate-50 hover:bg-white cursor-pointer transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs ${politician.avatarColor}`}>
                      {politician.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">
                        {politician.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {politician.party}/{politician.state} · {politician.ideologyCategory}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold font-mono tabular-nums text-emerald-700">
                      {score}%
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      afinidade
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
