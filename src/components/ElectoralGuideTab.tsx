import React, { useState, useEffect } from 'react';
import {
  Vote,
  FileText,
  Share2,
  Printer,
  Copy,
  Check,
  AlertTriangle,
  HelpCircle,
  ShieldAlert,
  Coins,
  Building,
  Landmark,
  Compass,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  MessageCircle,
  Lightbulb
} from 'lucide-react';
import { ElectoralBallotChoice, UrnaCargoId, PoliticianProfile } from '../types/legislative';
import { shareColinhaWhatsApp } from '../utils/whatsappShare';

interface ElectoralGuideTabProps {
  politicians?: PoliticianProfile[];
  onSelectPoliticianById?: (id: string) => void;
}

const DEFAULT_BALLOT: ElectoralBallotChoice[] = [
  {
    cargoId: 'deputado_federal',
    cargoLabel: '1º - Deputado(a) Federal',
    orderInUrna: 1,
    digitsCount: 4,
    candidateNumber: '',
    candidateName: '',
    party: '',
    keyReason: ''
  },
  {
    cargoId: 'deputado_estadual',
    cargoLabel: '2º - Deputado(a) Estadual / Distrital',
    orderInUrna: 2,
    digitsCount: 5,
    candidateNumber: '',
    candidateName: '',
    party: '',
    keyReason: ''
  },
  {
    cargoId: 'senador_1',
    cargoLabel: '3º - Senador(a) (1ª Vaga)',
    orderInUrna: 3,
    digitsCount: 3,
    candidateNumber: '',
    candidateName: '',
    party: '',
    keyReason: ''
  },
  {
    cargoId: 'senador_2',
    cargoLabel: '4º - Senador(a) (2ª Vaga, se houver)',
    orderInUrna: 4,
    digitsCount: 3,
    candidateNumber: '',
    candidateName: '',
    party: '',
    keyReason: ''
  },
  {
    cargoId: 'governador',
    cargoLabel: '5º - Governador(a) do Estado',
    orderInUrna: 5,
    digitsCount: 2,
    candidateNumber: '',
    candidateName: '',
    party: '',
    keyReason: ''
  },
  {
    cargoId: 'presidente',
    cargoLabel: '6º - Presidente da República',
    orderInUrna: 6,
    digitsCount: 2,
    candidateNumber: '',
    candidateName: '',
    party: '',
    keyReason: ''
  }
];

export const ElectoralGuideTab: React.FC<ElectoralGuideTabProps> = ({
  politicians = [],
  onSelectPoliticianById
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'colinha' | 'quem_manda' | 'quociente' | 'dinheiro'>('colinha');
  const [ballot, setBallot] = useState<ElectoralBallotChoice[]>(() => {
    try {
      const saved = localStorage.getItem('radar_colinha_eleitoral');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return DEFAULT_BALLOT;
  });

  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<string>('deputado_federal');

  // Persist ballot choices
  useEffect(() => {
    try {
      localStorage.setItem('radar_colinha_eleitoral', JSON.stringify(ballot));
    } catch (e) {
      // ignore
    }
  }, [ballot]);

  const handleUpdateChoice = (index: number, field: keyof ElectoralBallotChoice, value: string) => {
    setBallot(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleClearBallot = () => {
    if (window.confirm('Deseja limpar todos os números preenchidos na sua colinha?')) {
      setBallot(DEFAULT_BALLOT);
    }
  };

  const handleCopyText = () => {
    let text = `🗳️ MINHA COLINHA ELEITORAL (Radar Legislativo Brasil)\n\n`;
    text += `⚠️ Lembre-se: É PROIBIDO celular na cabine. Anote no papel!\n\n`;
    ballot.forEach(b => {
      text += `${b.cargoLabel}:\n`;
      text += `Número: ${b.candidateNumber || '____'} | Nome: ${b.candidateName || 'Não informado'} | Partido: ${b.party || 'N/A'}\n\n`;
    });
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const formatted = ballot.map(b => ({
      cargoLabel: b.cargoLabel,
      candidateNumber: b.candidateNumber,
      candidateName: b.candidateName,
      party: b.party
    }));
    shareColinhaWhatsApp(formatted);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Vote className="w-3.5 h-3.5 text-emerald-400" />
            Especial de Eleições & Cidadania sem Complicação
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Guia do Eleitor Consciente & Colinha Eleitoral
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Feito para quem não entende de política mas quer votar com segurança.
            Monte sua colinha para o dia da eleição, descubra se a promessa do candidato na TV é mentira,
            entenda por que um candidato com muitos votos pode puxar outro, e veja onde vai o dinheiro das campanhas.
          </p>

          {/* Sub-nav Buttons */}
          <div className="flex flex-wrap gap-2 pt-3">
            <button
              onClick={() => setActiveSubTab('colinha')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'colinha'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              1. Colinha para a Urna
            </button>
            <button
              onClick={() => setActiveSubTab('quem_manda')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'quem_manda'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              2. Quem Manda em Quê? (Anti-Fake)
            </button>
            <button
              onClick={() => setActiveSubTab('quociente')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'quociente'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              3. Por Que Meu Voto Elegeu Outro?
            </button>
            <button
              onClick={() => setActiveSubTab('dinheiro')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'dinheiro'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              4. O Dinheiro da Eleição (Fundão & Emendas)
            </button>
          </div>
        </div>
      </div>

      {/* ===================== SUBTAB 1: COLINHA ELEITORAL ===================== */}
      {activeSubTab === 'colinha' && (
        <div className="space-y-6">
          {/* Urna Warning Banner */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-900 shadow-sm">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm space-y-1">
              <strong className="font-bold text-amber-950 block text-sm">
                AVISO OFICIAL DA JUSTIÇA ELEITORAL (TSE):
              </strong>
              <p>
                É <strong>estritamente proibido entrar com aparelho celular</strong> ou câmera dentro da cabine de votação da urna eletrônica.
                Você precisa deixar o celular na mesa dos mesários. <strong>Leve sua colinha anotada em papel ou impressa!</strong>
              </p>
            </div>
          </div>

          {/* Action Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Monte Seus Votos na Ordem Exata da Urna
              </h2>
              <span className="text-xs text-slate-500">
                Preencha os números abaixo. Seus dados ficam salvos automaticamente no seu navegador.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                title="Mandar a colinha no WhatsApp para a família ou para si mesmo"
              >
                <MessageCircle className="w-4 h-4 text-emerald-100" />
                Mandar no WhatsApp
              </button>

              <button
                onClick={handleCopyText}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200 transition-all"
              >
                {copiedSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copiedSuccess ? 'Copiado!' : 'Copiar Texto'}
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200 transition-all"
                title="Imprimir para recortar e levar no bolso no dia da votação"
              >
                <Printer className="w-4 h-4" />
                Imprimir
              </button>

              <button
                onClick={handleClearBallot}
                className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors"
              >
                Limpar
              </button>
            </div>
          </div>

          {/* Interactive Ballot Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ballot.map((item, index) => (
              <div
                key={item.cargoId}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-emerald-300 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                      {item.orderInUrna}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {item.cargoLabel}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.digitsCount} dígitos na urna
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Número:
                    </label>
                    <input
                      type="text"
                      maxLength={item.digitsCount}
                      placeholder={`${'9'.repeat(item.digitsCount)}`}
                      value={item.candidateNumber}
                      onChange={(e) => handleUpdateChoice(index, 'candidateNumber', e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center font-mono font-extrabold text-base py-2 bg-slate-50 border border-slate-300 rounded-lg text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 tracking-widest"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Nome do Candidato(a):
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Nome da urna"
                      value={item.candidateName}
                      onChange={(e) => handleUpdateChoice(index, 'candidateName', e.target.value)}
                      className="w-full text-xs font-semibold py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Partido / Sigla:
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: PL, PT, União..."
                      value={item.party}
                      onChange={(e) => handleUpdateChoice(index, 'party', e.target.value)}
                      className="w-full text-xs font-medium py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Principal Motivo do Voto:
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Saúde, Fim da 6x1..."
                      value={item.keyReason || ''}
                      onChange={(e) => handleUpdateChoice(index, 'keyReason', e.target.value)}
                      className="w-full text-xs font-medium py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paper Mockup Preview for Printing */}
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 max-w-xl mx-auto shadow-sm space-y-4">
            <div className="text-center border-b border-slate-200 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Modelo Oficial de Impressão / Recorte para o Bolso
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                MINHA COLINHA PARA A URNA ELETRÔNICA
              </h3>
              <p className="text-xs text-slate-500">
                Radar Legislativo Brasil · www.radarlegislativo.leg.br
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {ballot.map((b) => (
                <div key={b.cargoId} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-700">{b.cargoLabel}:</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-900 text-white font-extrabold rounded text-sm">
                      {b.candidateNumber || '_____'}
                    </span>
                    <span className="text-slate-600 truncate max-w-[120px]">
                      {b.candidateName || 'Não anotado'}
                    </span>
                    {b.party && (
                      <span className="text-[10px] text-slate-400">({b.party})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir Esta Colinha Agora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 2: QUEM MANDA EM QUÊ? ===================== */}
      {activeSubTab === 'quem_manda' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              Detector de Promessa Falsa de Campanha
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Não caia em papo furado na TV: saiba o que cada cargo realmente faz
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Em época de eleição, muitos candidatos prometem coisas que não têm poder legal para fazer.
              Clique nos cargos abaixo e veja o que é competência de cada um:
            </p>

            {/* Role Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {[
                { id: 'deputado_federal', label: 'Deputado Federal', icon: Landmark },
                { id: 'senador', label: 'Senador', icon: Landmark },
                { id: 'presidente', label: 'Presidente', icon: Building },
                { id: 'governador', label: 'Governador', icon: Building },
                { id: 'prefeito', label: 'Prefeito & Vereador', icon: Compass }
              ].map(role => {
                const Icon = role.icon;
                const isSelected = selectedRoleForDetail === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRoleForDetail(role.id)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 text-xs font-semibold'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs">{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Role Detail Cards */}
          {selectedRoleForDetail === 'deputado_federal' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                  Poder Legislativo Federal (Brasília)
                </span>
                <span className="text-xs text-slate-400">Mandato de 4 anos</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                O que faz um Deputado Federal (Câmara dos Deputados)?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    O que ele REALMENTE pode fazer:
                  </h4>
                  <ul className="space-y-1.5 text-emerald-950 text-xs list-disc pl-4">
                    <li>Criar, alterar e votar leis válidas para <strong>todo o Brasil</strong> (como Reforma Tributária, Código de Trânsito, Código Penal).</li>
                    <li>Votar o <strong>Orçamento Geral da União</strong> (decidir onde o dinheiro de impostos federais será investido).</li>
                    <li>Mandar <strong>Emendas Parlamentares</strong> para o hospital ou escola do seu estado.</li>
                    <li>Fiscalizar os atos do Presidente da República e dos Ministros.</li>
                    <li>Autorizar ou rejeitar a abertura de processo de impeachment.</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-red-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    PROMESSA FALSA (Ele NÃO pode fazer):
                  </h4>
                  <ul className="space-y-1.5 text-red-950 text-xs list-disc pl-4">
                    <li><strong>“Vou asfaltar a rua do seu bairro”</strong> (mentira, isso é função da Prefeitura).</li>
                    <li><strong>“Vou colocar mais policiais na esquina”</strong> (mentira, a PM é comandada pelo Governador).</li>
                    <li><strong>“Vou construir uma creche no município com minhas próprias mãos”</strong> (ele só pode mandar dinheiro por emenda; quem constrói e opera é o prefeito).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedRoleForDetail === 'senador' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full">
                  Senado Federal (Representa os Estados)
                </span>
                <span className="text-xs text-slate-400">Mandato longo: 8 anos</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                O que faz um Senador da República?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Poderes Exclusivos do Senado:
                  </h4>
                  <ul className="space-y-1.5 text-emerald-950 text-xs list-disc pl-4">
                    <li>Sabatina e aprovação dos <strong>Ministros do STF</strong> (Supremo Tribunal Federal).</li>
                    <li>Aprovação do <strong>Presidente do Banco Central</strong> e Diretores.</li>
                    <li>Julgar processos de impeachment contra Presidente, Ministros e membros do STF.</li>
                    <li>Revisar todas as leis que foram aprovadas pelos deputados na Câmara.</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-red-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    O que NÃO é função do Senador:
                  </h4>
                  <ul className="space-y-1.5 text-red-950 text-xs list-disc pl-4">
                    <li>O senador não gerencia contas locais nem comanda obras diretamente.</li>
                    <li>Ele representa os interesses do Estado perante a Federação em Brasília.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedRoleForDetail === 'presidente' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  Poder Executivo Federal
                </span>
                <span className="text-xs text-slate-400">Mandato de 4 anos</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                O que faz o Presidente da República?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Suas Principais Funções:
                  </h4>
                  <ul className="space-y-1.5 text-emerald-950 text-xs list-disc pl-4">
                    <li>Administrar o país, executar os programas federais (Bolsa Família, Farmácia Popular, Novo PAC).</li>
                    <li>Comandar as Forças Armadas e a diplomacia internacional do Brasil.</li>
                    <li>Vetar ou sancionar leis aprovadas pelo Congresso.</li>
                    <li>Nomear ministros, chefes da Polícia Federal e comandantes.</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    Atenção: Ele não governa sozinho!
                  </h4>
                  <p className="text-xs text-amber-950 leading-relaxed">
                    O Presidente <strong>não pode criar leis ou impostos por conta própria</strong>. Ele precisa do apoio de pelo menos <strong>257 deputados e 41 senadores</strong> para aprovar qualquer projeto relevante.
                    Por isso o voto no Deputado e Senador define se o Presidente conseguirá cumprir o plano de governo!
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedRoleForDetail === 'governador' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                  Poder Executivo Estadual
                </span>
                <span className="text-xs text-slate-400">Mandato de 4 anos</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                O que faz o Governador do Estado?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Áreas de Responsabilidade Direta:
                  </h4>
                  <ul className="space-y-1.5 text-emerald-950 text-xs list-disc pl-4">
                    <li><strong>Segurança Pública:</strong> Comanda a Polícia Militar (policiamento na rua) e a Polícia Civil (investigações).</li>
                    <li><strong>Educação:</strong> Administra as escolas de Ensino Médio e Universidades Estaduais.</li>
                    <li><strong>Saúde:</strong> Gerencia os Hospitais Regionais de grande porte e pronto-socorros estaduais.</li>
                    <li><strong>Rodovias Estaduais:</strong> Conserva e fiscaliza as estradas vicinais e estaduais (ex: SP-330, MG-050).</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-red-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    O que NÃO é função do Governador:
                  </h4>
                  <ul className="space-y-1.5 text-red-950 text-xs list-disc pl-4">
                    <li>Não define regras de aposentadoria geral do INSS.</li>
                    <li>Não comanda os postinhos de saúde de bairro (isso é com o prefeito).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedRoleForDetail === 'prefeito' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full">
                  Poder Municipal (Sua Cidade)
                </span>
                <span className="text-xs text-slate-400">Eleições Municipais</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                O que faz o Prefeito e os Vereadores?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Serviços do Dia a Dia:
                  </h4>
                  <ul className="space-y-1.5 text-emerald-950 text-xs list-disc pl-4">
                    <li>Asfalto, iluminação pública, coleta de lixo e limpeza urbana.</li>
                    <li>Transporte coletivo municipal (ônibus e vans).</li>
                    <li>Creches e Ensino Fundamental (1º ao 9º ano).</li>
                    <li>Unidades Básicas de Saúde (UBS / Postinhos) e UPAs.</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-blue-600" />
                    Papel dos Vereadores:
                  </h4>
                  <p className="text-xs text-blue-950 leading-relaxed">
                    Fiscalizar as contas do prefeito, aprovar a Lei do Plano Diretor da cidade e o imposto do IPTU.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================== SUBTAB 3: QUOCIENTE ELEITORAL ===================== */}
      {activeSubTab === 'quociente' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
                Desvendando o Sistema Eleitoral Brasileiro
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                "Meu candidato teve 50 mil votos e não entrou... Por quê?"
              </h2>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                No Brasil, a eleição para <strong>Deputado Federal, Deputado Estadual e Vereador</strong> não é como a de Presidente.
                Ela usa o sistema chamado <strong>Voto Proporcional</strong>. Veja como funciona na prática:
              </p>
            </div>

            {/* Step-by-step visual cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  O voto vai para o PARTIDO primeiro
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Quando você digita o número do seu candidato a deputado, esse voto é somado ao "bolo" de votos de todo o partido dele.
                  A lei calcula quantas cadeiras aquele partido conquistou no total.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  O "Puxador de Votos"
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Se um candidato muito famoso do partido tem 1 milhão de votos (ex: Tiririca, Nikolas, Eduardo Bolsonaro),
                  esses votos sobram e "puxam" candidatos desconhecidos do mesmo partido que tiveram apenas 15 mil votos!
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Lição de Ouro para o Eleitor
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold text-emerald-900">
                  Nunca vote apenas na cara do candidato! Se você não concorda com o partido dele, seu voto pode ajudar a eleger
                  outra pessoa do partido que pensa completamente diferente de você.
                </p>
              </div>
            </div>

            {/* Quociente Eleitoral Formula in Plain Words */}
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-5 space-y-2 text-indigo-950 text-xs sm:text-sm">
              <h4 className="font-bold text-indigo-900 flex items-center gap-2">
                <Coins className="w-4 h-4 text-indigo-600" />
                Como o TSE calcula quem ganha (Quociente Eleitoral):
              </h4>
              <p className="leading-relaxed">
                Pega-se todos os <strong>votos válidos</strong> do estado e divide pelo <strong>número de vagas de deputados</strong> daquele estado.
                <br />
                <em>Exemplo simples:</em> Se um estado tem 1 milhão de votos válidos e 10 vagas, cada cadeira custa <strong>100 mil votos</strong>.
                O partido que somar 300 mil votos leva 3 deputados; o partido que somar menos que 100 mil votos pode ficar sem nenhuma cadeira, mesmo que seu principal candidato tenha tido muitos votos individuais.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 4: DINHEIRO DA ELEIÇÃO ===================== */}
      {activeSubTab === 'dinheiro' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 uppercase tracking-wider">
                Transparência dos Recursos Públicos
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                De onde sai o dinheiro que financia os políticos e as campanhas?
              </h2>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                Entenda os 4 conceitos mais falados nos noticiários sobre dinheiro público, campanhas e o Congresso Nacional:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Fundão Eleitoral */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Coins className="w-4 h-4 text-amber-600" />
                  <span>1. Fundo Eleitoral ("O Fundão de R$ 4,9 bilhões")</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Desde 2015, empresas privadas foram proibidas pelo STF de doar dinheiro para campanhas.
                  Para substituir isso, o Congresso criou o Fundo Especial de Financiamento de Campanha (FEFC), pago com o <strong>dinheiro dos nossos impostos</strong>.
                  Esse dinheiro é distribuído para os partidos comprarem santinhos, impulsionarem redes sociais, alugarem carros de som e pagarem comerciais de TV.
                </p>
              </div>

              {/* Fundo Partidário */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>2. Fundo Partidário (Manutenção dos Partidos)</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Diferente do Fundão (que só existe em ano de eleição), o Fundo Partidário é pago <strong>todos os meses do ano</strong> para manter a sede dos partidos,
                  pagar salários de funcionários dos partidos e pesquisas de opinião pública.
                </p>
              </div>

              {/* Emendas Parlamentares e Emendas Pix */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Landmark className="w-4 h-4 text-emerald-600" />
                  <span>3. Emendas Parlamentares & "Emenda Pix"</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Cada deputado e senador tem direito a carimbar dezenas de milhões de reais do orçamento da União para mandar direto para sua cidade.
                  A "Emenda Pix" (transferência especial) transfere o dinheiro direto para o caixa da prefeitura sem exigir projeto prévio detalhado, o que gerou exigências recentes do STF por mais transparência.
                </p>
              </div>

              {/* O que é o Centrão */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Compass className="w-4 h-4 text-purple-600" />
                  <span>4. O que é o "Centrão"?</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Não é um partido único, mas um grupo grande de partidos com ideologia pragmática (como União Brasil, Republicanos, PP, PSD, MDB).
                  Eles não são oposição radical nem governistas apaixonados: negociam apoio em troca de verbas, cargos em ministérios e emendas orçamentárias, sendo fundamentais para qualquer presidente governar.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
