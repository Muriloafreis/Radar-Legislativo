import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Landmark,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Share2,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Info,
  BookOpen,
  HelpCircle,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { LegislativeProject, House } from '../types/legislative';
import { explainProjectWithAI } from '../services/geminiService';
import { shareProjectWhatsApp } from '../utils/whatsappShare';

interface ProjectDetailModalProps {
  project: LegislativeProject | null;
  onClose: () => void;
  onSelectPoliticianById: (id: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectPoliticianById
}) => {
  // Default to 'entenda_facil' so ordinary citizens immediately get clear explanations
  const [activeTab, setActiveTab] = useState<'entenda_facil' | 'tramitacao' | 'explicacao_ia' | 'votacao_popular'>('entenda_facil');
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [citizenVote, setCitizenVote] = useState<'SIM' | 'NÃO' | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!project) return null;

  const handleFetchAiExplanation = async () => {
    setIsLoadingAi(true);
    try {
      const res = await explainProjectWithAI(project);
      setAiExplanation(res);
    } catch {
      setAiExplanation('Não foi possível gerar a explicação neste momento.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Header Modal */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
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
              <span>{project.theme}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">Apresentado em {project.presentationDate}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded font-medium">
                <Clock className="w-3 h-3 text-emerald-400" />
                Última atualização: {project.lastUpdateDate}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                const summary = project.citizenSummary?.whatItIsSimple || project.shortDescription;
                shareProjectWhatsApp(project.code, project.title, summary, project.status);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
              title="Compartilhar no WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mandar no Zap</span>
            </button>
            <button
              onClick={handleCopyShare}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Copiar link da pauta"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-6 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('entenda_facil')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'entenda_facil'
                ? 'border-emerald-600 text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>📖 Entenda Fácil (Sem Juridiquês)</span>
          </button>

          <button
            onClick={() => setActiveTab('tramitacao')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'tramitacao'
                ? 'border-emerald-600 text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Tramitação & Texto Oficial
          </button>

          <button
            onClick={() => {
              setActiveTab('explicacao_ia');
              if (!aiExplanation && !isLoadingAi) {
                handleFetchAiExplanation();
              }
            }}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'explicacao_ia'
                ? 'border-emerald-600 text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Análise Aprofundada (IA)</span>
          </button>

          <button
            onClick={() => setActiveTab('votacao_popular')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'votacao_popular'
                ? 'border-emerald-600 text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Voto Popular & Opinião
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          {copiedLink && (
            <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-lg border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Link da pauta copiado para a área de transferência!
            </div>
          )}

          {/* TAB 0: ENTENDA FÁCIL (PARA LEIGOS) */}
          {activeTab === 'entenda_facil' && project.citizenSummary && (
            <div className="space-y-6">
              {/* O que é em bom português */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span>💡 1. O que é essa proposta em bom português?</span>
                </span>
                <p className="text-slate-800 text-[15px] leading-relaxed font-medium">
                  {project.citizenSummary.whatItIsSimple}
                </p>
              </div>

              {/* Como mexe no seu bolso e no seu dia a dia */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛒 2. Como isso mexe no seu bolso e na sua rotina?</span>
                </span>
                <p className="text-slate-800 text-[15px] leading-relaxed">
                  {project.citizenSummary.howItAffectsYourLife}
                </p>
              </div>

              {/* Quem apoia vs Quem é contra */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-emerald-200/90 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Quem apoia defende que:</span>
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {project.citizenSummary.whoSupportsSays}
                  </p>
                </div>

                <div className="bg-slate-50 border border-rose-200/90 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Quem critica alerta que:</span>
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {project.citizenSummary.whoOpposesSays}
                  </p>
                </div>
              </div>

              {/* Termos difíceis explicados */}
              {project.citizenSummary.simpleKeyTerms?.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-slate-500" />
                    <span>Termos complicados desta proposta traduzidos:</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.citizenSummary.simpleKeyTerms.map((item, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                        <strong className="text-emerald-800 block font-bold">{item.term}:</strong>
                        <p className="text-slate-600 leading-relaxed">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alignment with Government Plan in simple words */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500 font-medium">Posição do Governo Federal:</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {project.governmentPosition === 'FAVORÁVEL'
                      ? '✓ O Governo Federal apoia e quer a aprovação desta lei'
                      : project.governmentPosition === 'CONTRÁRIO'
                      ? '✗ O Governo Federal é contra este projeto'
                      : 'O Governo Federal liberou a bancada (neutro)'}
                  </div>
                </div>

                {project.isGovernmentPriority && (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 self-start sm:self-auto">
                    Faz parte do Plano Oficial de Governo
                  </span>
                )}
              </div>
            </div>
          )}

          {/* TAB 1: TRAMITAÇÃO OFICIAL */}
          {activeTab === 'tramitacao' && (
            <div className="space-y-6">
              {/* Ementa Section */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Ementa Oficial do Texto
                </span>
                <p className="text-slate-800 leading-relaxed font-serif text-[15px]">
                  "{project.fullEmenta}"
                </p>
              </div>

              {/* Status and Government alignment */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-xs text-slate-500 block">Status da Tramitação</span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {project.status}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">{project.urgencyLabel}</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-xs text-slate-500 block">Posicionamento do Governo</span>
                  <span className={`text-sm font-bold mt-1 block ${
                    project.governmentPosition === 'FAVORÁVEL'
                      ? 'text-emerald-700'
                      : project.governmentPosition === 'CONTRÁRIO'
                      ? 'text-rose-700'
                      : 'text-slate-700'
                  }`}>
                    {project.governmentPosition}
                    {project.isGovernmentPriority && ' (Matéria Prioritária)'}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    {project.isGovernmentPriority ? 'Previsto no Plano de Governo' : 'Pauta autônoma do Legislativo'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-xs text-slate-500 block">Autoria / Origem</span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {project.authorParty}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    Última movimentação: {project.lastUpdateDate}
                  </span>
                </div>
              </div>

              {/* Total votes if available */}
              {project.totalVotes && (
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Placar Deliberativo em Plenário
                    </span>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">
                      Quórum de {project.totalVotes.quorum} parlamentares
                    </span>
                  </div>

                  <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${(project.totalVotes.yes / project.totalVotes.quorum) * 100}%` }}
                      className="bg-emerald-500 h-full"
                      title={`Sim: ${project.totalVotes.yes}`}
                    />
                    <div
                      style={{ width: `${(project.totalVotes.no / project.totalVotes.quorum) * 100}%` }}
                      className="bg-rose-500 h-full"
                      title={`Não: ${project.totalVotes.no}`}
                    />
                    <div
                      style={{ width: `${(project.totalVotes.abstain / project.totalVotes.quorum) * 100}%` }}
                      className="bg-slate-400 h-full"
                      title={`Abstenções: ${project.totalVotes.abstain}`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      SIM: {project.totalVotes.yes} votos
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-700 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                      NÃO: {project.totalVotes.no} votos
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                      ABSTENÇÕES: {project.totalVotes.abstain}
                    </div>
                  </div>
                </div>
              )}

              {/* Key Involved Politicians */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Parlamentares Envolvidos (Autores e Relatores)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {project.keyPoliticians.map((pol) => (
                    <div
                      key={pol.id}
                      onClick={() => {
                        onClose();
                        onSelectPoliticianById(pol.id);
                      }}
                      className="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 cursor-pointer transition-all flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 overflow-hidden shrink-0">
                        {pol.avatarFallback}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 text-sm truncate">
                          {pol.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {pol.party}/{pol.state} · {pol.role}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-medium hover:underline mt-0.5">
                          Ver propostas e votações →
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tramitation Timeline */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Histórico Recente de Tramitação
                </span>
                <div className="relative border-l border-slate-200 ml-3 space-y-4 py-1">
                  {project.timeline.map((step, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-1">
                        <span className="font-bold text-slate-900 text-sm">{step.step}</span>
                        <span className="font-mono tabular-nums">{step.date}</span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        Local: {step.location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPLICAR COM IA */}
          {activeTab === 'explicacao_ia' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-900 text-sm">
                    Inteligência Cívica & Tradutor de Jargões
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Análise neutra e didática gerada com modelos Gemini para traduzir a linguagem legislativa em impactos reais na sua vida cotidiana e comparar com as metas federais.
                  </p>
                </div>
              </div>

              {isLoadingAi ? (
                <div className="p-12 text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
                  <p className="text-sm font-medium text-slate-700">
                    Sintetizando ementa e analisando impactos com IA...
                  </p>
                </div>
              ) : aiExplanation ? (
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs whitespace-pre-line leading-relaxed text-slate-800 text-sm font-serif">
                  {aiExplanation}
                </div>
              ) : (
                <button
                  onClick={handleFetchAiExplanation}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar Análise Didática Agora</span>
                </button>
              )}
            </div>
          )}

          {/* TAB 3: VOTAÇÃO POPULAR */}
          {activeTab === 'votacao_popular' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center space-y-3">
                <h4 className="font-bold text-slate-900 text-base">
                  Como você votaria se fosse Senador ou Deputado?
                </h4>
                <p className="text-xs text-slate-600 max-w-lg mx-auto">
                  Sua opinião é anônima e compõe o índice de termômetro popular do Radar Legislativo Brasil, comparando a decisão popular com o voto dos parlamentares.
                </p>

                <div className="flex items-center justify-center gap-4 pt-3">
                  <button
                    onClick={() => setCitizenVote('SIM')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all ${
                      citizenVote === 'SIM'
                        ? 'bg-emerald-600 border-emerald-700 text-white shadow-md'
                        : 'bg-white border-slate-200 hover:border-emerald-500 text-slate-800'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>A Favor (SIM)</span>
                  </button>

                  <button
                    onClick={() => setCitizenVote('NÃO')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all ${
                      citizenVote === 'NÃO'
                        ? 'bg-rose-600 border-rose-700 text-white shadow-md'
                        : 'bg-white border-slate-200 hover:border-rose-500 text-slate-800'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>Contra (NÃO)</span>
                  </button>
                </div>

                {citizenVote && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium">
                    Seu voto <strong>"{citizenVote}"</strong> foi computado com sucesso!
                    {citizenVote === 'SIM' && ' Você concorda com 72% dos votos dos parlamentares nesta pauta.'}
                    {citizenVote === 'NÃO' && ' Você votou em divergência com a orientação da liderança do governo.'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Acesso liberado e simplificado para todo cidadão brasileiro.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
