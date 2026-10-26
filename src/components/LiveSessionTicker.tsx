import React from 'react';
import { Landmark, Users, Clock, AlertCircle } from 'lucide-react';
import { LIVE_SESSIONS_INFO } from '../data/mockLegislativeData';

interface LiveSessionTickerProps {
  onSelectProjectByCode: (code: string) => void;
}

export const LiveSessionTicker: React.FC<LiveSessionTickerProps> = ({ onSelectProjectByCode }) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 py-3 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {LIVE_SESSIONS_INFO.map((session, idx) => (
            <div
              key={idx}
              className="flex-1 bg-slate-800/60 hover:bg-slate-800/90 transition-colors border border-slate-700/70 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${
                  session.house === 'camara' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-white tracking-wide">{session.title}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                      {session.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                    <span className="text-slate-400">Pauta em discussão:</span>{' '}
                    <button
                      onClick={() => {
                        const codeMatch = session.activeTopic.match(/(PLP \d+\/\d+|PL \d+\/\d+|PEC \d+\/\d+)/);
                        if (codeMatch) {
                          onSelectProjectByCode(codeMatch[1]);
                        }
                      }}
                      className="text-emerald-300 hover:text-emerald-200 hover:underline font-medium text-left"
                    >
                      {session.activeTopic}
                    </button>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono tabular-nums sm:border-l sm:border-slate-700/70 sm:pl-4 shrink-0">
                <div className="flex items-center gap-1.5" title="Quórum em plenário">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-200">{session.quorum}</span>
                </div>
                <div className="flex items-center gap-1.5" title="Início da sessão">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{session.startTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
