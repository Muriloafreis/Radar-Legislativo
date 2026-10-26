import React, { useState } from 'react';
import { X, BookOpen, Search, CheckCircle2, HelpCircle } from 'lucide-react';
import { POLITICAL_GLOSSARY, PoliticalTermGlossary } from '../data/mockLegislativeData';

interface PoliticalGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PoliticalGlossaryModal: React.FC<PoliticalGlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = POLITICAL_GLOSSARY.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.simpleMeaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.practicalExample.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Dicionário de Política sem Complicação</h3>
              <p className="text-xs text-slate-400">Entenda os termos do Congresso Nacional explicados em português claro</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar termo (ex: PEC, PL, Quórum, Relator, Obstrução)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 text-xs">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors shadow-2xs space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm font-mono text-emerald-800">
                  {item.term}
                </span>
              </div>

              <p className="text-slate-700 leading-relaxed font-medium">
                {item.simpleMeaning}
              </p>

              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-emerald-900 text-[11px] leading-relaxed">
                <strong>Exemplo no dia a dia:</strong> {item.practicalExample}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              Nenhum termo encontrado para essa busca.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Acesso democrático e cívico à informação parlamentar
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
