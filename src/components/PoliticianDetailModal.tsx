import React, { useState } from 'react';
import {
  X,
  Sparkles,
  FileText,
  Vote,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Mail,
  Scale,
  Award,
  MessageCircle
} from 'lucide-react';
import { PoliticianProfile, PoliticianVoteSummary } from '../types/legislative';
import { auditPoliticianCoherenceWithAI } from '../services/geminiService';
import { sharePoliticianWhatsApp } from '../utils/whatsappShare';

interface PoliticianDetailModalProps {
  politician: PoliticianProfile | null;
  onClose: () => void;
  onOpenProjectByCode: (code: string) => void;
}

export const PoliticianDetailModal: React.FC<PoliticianDetailModalProps> = ({
  politician,
  onClose,
  onOpenProjectByCode
}) => {
  const [activeTab, setActiveTab] = useState<'propostas' | 'votacoes' | 'ideologia'>('votacoes');
  const [selectedVoteForAudit, setSelectedVoteForAudit] = useState<PoliticianVoteSummary | null>(null);
  const [auditResult, setAuditResult] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  if (!politician) return null;

  const handleRunAudit = async (vote: PoliticianVoteSummary) => {
    setSelectedVoteForAudit(vote);
    setIsAuditing(true);
    setAuditResult(null);
    try {
      const res = await auditPoliticianCoherenceWithAI(politician, vote);
      setAuditResult(res);
    } catch {
      setAuditResult('Não foi possível gerar a auditoria com IA no momento.');
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Top Header Card */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md ${politician.avatarColor}`}>
              {politician.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-white">
                  {politician.house === 'senado' ? 'Senador(a)' : 'Deputado(a) Federal'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-bold text-emerald-400">{politician.party}</span>
                <span aria-hidden="true">·</span>
                <span>{politician.state}</span>
                <span aria-hidden="true">·</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                  {politician.ideologyCategory}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {politician.name}
              </h2>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span>{politician.role}</span>
                <span>·</span>
                <span className="text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-mono">
                  Sincronizado: 25/10/2026 às 15:42 (57ª Legislatura)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => {
                const flagProposal = politician.proposals[0]?.title || 'Projetos no Congresso Nacional';
                sharePoliticianWhatsApp(politician.name, politician.party, politician.state, politician.governmentAlignmentPercentage, flagProposal);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
              title="Compartilhar histórico no WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mandar no Zap</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Coherence & Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-slate-200 bg-slate-50 border-b border-slate-200 text-xs">
          <div className="p-3 text-center">
            <span className="text-slate-500 block">Alinhamento c/ Governo</span>
            <span className={`text-base font-bold font-mono tabular-nums block mt-0.5 ${
              politician.governmentAlignmentPercentage >= 70
                ? 'text-emerald-700'
                : politician.governmentAlignmentPercentage <= 25
                ? 'text-rose-700'
                : 'text-amber-700'
            }`}>
              {politician.governmentAlignmentPercentage}%
            </span>
          </div>

          <div className="p-3 text-center">
            <span className="text-slate-500 block">Fidelidade Partidária</span>
            <span className="text-base font-bold text-slate-900 font-mono tabular-nums block mt-0.5">
              {politician.partyFidelityPercentage}%
            </span>
          </div>

          <div className="p-3 text-center">
            <span className="text-slate-500 block">Presença em Plenário</span>
            <span className="text-base font-bold text-emerald-700 font-mono tabular-nums block mt-0.5">
              {politician.attendanceRate}%
            </span>
          </div>

          <div className="p-3 text-center">
            <span className="text-slate-500 block">Propostas no Radar</span>
            <span className="text-base font-bold text-slate-900 font-mono tabular-nums block mt-0.5">
              {politician.proposals.length} projetos
            </span>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-white border-b border-slate-200 px-6 flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('votacoes')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'votacoes'
                ? 'border-emerald-600 text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Vote className="w-4 h-4 text-emerald-600" />
            <span>Votações Recentes & Análise de Coerência ({politician.recentVotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('propostas')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'propostas'
                ? 'border-emerald-600 text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Propostas Apresentadas ({politician.proposals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ideologia')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'ideologia'
                ? 'border-emerald-600 text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Ideologia Declarada & Discursos</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          {/* TAB 1: VOTAÇÕES RECENTES & COERÊNCIA */}
          {activeTab === 'votacoes' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Comparativo de Votação Nominal vs. Plano de Governo e Ideologia
                  </h4>
                  <p className="text-slate-600 mt-0.5">
                    Cada voto é checado em relação ao alinhamento com a diretriz federal e à fidelidade com o discurso público do parlamentar durante seu mandato.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {politician.recentVotes.map((vote, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-all shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <button
                            onClick={() => onOpenProjectByCode(vote.projectCode)}
                            className="font-mono font-bold text-emerald-700 hover:underline"
                          >
                            {vote.projectCode}
                          </button>
                          <span>·</span>
                          <span className="font-medium text-slate-700">{vote.projectTitle}</span>
                          <span>·</span>
                          <span className="font-mono tabular-nums">{vote.date}</span>
                        </div>
                      </div>

                      {/* Vote badge */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-slate-500 font-medium">Voto do Parlamentar:</span>
                        <span className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                          vote.vote === 'SIM'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : vote.vote === 'NÃO'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          {vote.vote}
                        </span>
                      </div>
                    </div>

                    {/* Comparison Strip */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                      <div>
                        <span className="font-semibold text-slate-700 block">
                          Relação com o Plano de Governo:
                        </span>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={vote.partOfGovernmentPlan ? 'text-blue-700 font-semibold' : 'text-slate-600'}>
                            {vote.partOfGovernmentPlan ? '✓ Faz parte do Plano de Governo' : '✗ Pauta não constante no Plano'}
                          </span>
                          <span>·</span>
                          <span className="text-slate-600">
                            Orientação: <strong>{vote.governmentPosition}</strong>
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-700 block">
                          Classificação de Coerência Ideológica:
                        </span>
                        <div className="mt-1 flex items-center gap-1.5">
                          {vote.coherenceRating === 'Alta Coerência' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                              <CheckCircle className="w-3.5 h-3.5" />
                              {vote.coherenceRating}
                            </span>
                          ) : vote.coherenceRating === 'Voto Pragmático' ? (
                            <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              {vote.coherenceRating}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-700 font-bold">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              {vote.coherenceRating}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Detailed explanation */}
                    <div className="text-xs text-slate-700 bg-white p-2.5 rounded border border-slate-100 leading-relaxed">
                      <span className="font-semibold text-slate-900">Análise de Justificativa:</span>{' '}
                      {vote.coherenceExplanation}
                    </div>

                    {/* AI Audit Action */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => onOpenProjectByCode(vote.projectCode)}
                        className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
                      >
                        Ver detalhes do projeto na íntegra →
                      </button>

                      <button
                        onClick={() => handleRunAudit(vote)}
                        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Auditar Voto com IA</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Audit Output Box */}
              {selectedVoteForAudit && (
                <div className="mt-6 p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                        Parecer de Auditoria por IA para {selectedVoteForAudit.projectCode}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedVoteForAudit(null)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                    >
                      Fechar Auditoria
                    </button>
                  </div>

                  {isAuditing ? (
                    <div className="py-6 text-center text-xs text-emerald-900 font-medium animate-pulse">
                      Avaliando discursos públicos, plataformas partidárias e votação nominal com o Gemini...
                    </div>
                  ) : auditResult ? (
                    <div className="bg-white p-4 rounded-lg border border-emerald-200 text-xs text-slate-800 leading-relaxed whitespace-pre-line font-serif">
                      {auditResult}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROPOSTAS APRESENTADAS */}
          {activeTab === 'propostas' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Projetos de Lei, Propostas de Emenda à Constituição e Relatorias de autoria direta do parlamentar:
              </div>

              <div className="space-y-3">
                {politician.proposals.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-mono font-bold text-slate-900">{prop.code}</span>
                          <span>·</span>
                          <span className="text-slate-600">{prop.theme}</span>
                          <span>·</span>
                          <span className="font-mono tabular-nums">{prop.year}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">
                          {prop.title}
                        </h4>
                      </div>

                      {prop.isMainFlagship && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                          Bandeira Principal
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {prop.summary}
                    </p>

                    {prop.simpleExplanation && (
                      <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-lg p-2.5 text-xs text-emerald-950">
                        <strong className="block font-bold mb-0.5">💡 Em bom português para o cidadão:</strong>
                        <p className="text-slate-800">{prop.simpleExplanation}</p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Status: <strong className="text-slate-700">{prop.status}</strong></span>
                      <button
                        onClick={() => onOpenProjectByCode(prop.code)}
                        className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
                      >
                        Acompanhar tramitação →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: IDEOLOGIA DECLARADA & DISCURSOS */}
          {activeTab === 'ideologia' && (
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Posicionamento Ideológico Declarado
                </span>
                <p className="text-slate-900 font-serif text-[15px] leading-relaxed">
                  "{politician.declaredIdeology}"
                </p>
                <div className="text-xs text-slate-500">
                  Campo político registrado: <strong>{politician.ideologyCategory}</strong>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Bandeiras Públicas Defendidas no Mandato
                </span>
                <div className="flex flex-wrap gap-2">
                  {politician.publicBanners.map((banner, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-2xs"
                    >
                      {banner}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Biografia Parlamentar
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {politician.bio}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>Contato Oficial de Gabinete: {politician.contactEmail}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Atualização diária pelo Observatório de Coerência Parlamentar
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Fechar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};
