
import React, { useState } from 'react';
import { ROLEPLAY_SCENARIOS } from '../constants';
import { Scenario } from '../types';
import { QuizButton } from './QuizButton';

const RolePlayModule: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [revealed, setRevealed] = useState(false);

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setRevealed(false);
  };

  if (!selectedScenario) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-white">🎭 ROLE PLAY AO VIVO</h2>
          <p className="text-gray-400 uppercase tracking-widest text-sm">Escolha um desafio para treinar com a equipe</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLEPLAY_SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => startScenario(s)}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00d2d3] hover:bg-white/10 transition-all text-left space-y-4 group"
            >
              <div className="text-4xl">{s.emoji}</div>
              <h3 className="text-xl font-bold text-[#00d2d3]">{s.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{s.context}</p>
              <div className="pt-2 text-xs font-bold uppercase text-white/30 group-hover:text-white">Selecionar Caso →</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      {/* Cabeçalho do Caso */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 bg-white/5 rounded-3xl border border-white/10">
        <div className="flex items-center gap-6">
          <div className="text-6xl bg-black/40 w-24 h-24 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
            {selectedScenario.emoji}
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#00d2d3] uppercase">{selectedScenario.title}</h2>
            <p className="text-gray-400 max-w-md">{selectedScenario.context}</p>
          </div>
        </div>
        <QuizButton onClick={() => setSelectedScenario(null)} variant="outline">Mudar de Caso</QuizButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lado Esquerdo: O Desafio */}
        <div className="space-y-6">
          <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-4">
            <h3 className="text-sm font-black text-red-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400"></span> O Gatilho do Cliente
            </h3>
            <div className="text-2xl font-bold text-white italic">
              "{selectedScenario.initialMessage}"
            </div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">
              Objetivo: {selectedScenario.objective}
            </p>
          </div>

          <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4">
            <h3 className="text-sm font-black text-white/40 uppercase tracking-widest">Dicas de Condução</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-[#00d2d3] font-bold">01.</span>
                Não responda apenas o que foi perguntado (Modo SAC).
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-[#00d2d3] font-bold">02.</span>
                Faça uma pergunta de volta para retomar a liderança.
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-[#00d2d3] font-bold">03.</span>
                Humanize com o nome do cliente e emojis adequados.
              </li>
            </ul>
          </div>

          {!revealed && (
            <button 
              onClick={() => setRevealed(true)}
              className="w-full py-6 rounded-2xl bg-[#00d2d3] text-black font-black text-xl uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#00d2d3]/20"
            >
              Revelar Método Ômega
            </button>
          )}
        </div>

        {/* Lado Direito: O Gabarito (Revelado) */}
        <div className={`transition-all duration-700 ${revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="p-8 bg-[#00d2d3]/5 border-2 border-[#00d2d3] rounded-3xl space-y-8 h-full">
            <div className="space-y-2">
              <h3 className="text-sm font-black text-[#00d2d3] uppercase tracking-[0.3em]">A Resposta Ideal</h3>
              <div className="p-6 bg-black/60 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-[#00d2d3]/20 text-[#00d2d3] text-[10px] font-bold uppercase tracking-widest">
                  Método Ômega
                </div>
                <p className="text-white text-xl leading-relaxed font-medium">
                  {selectedScenario.idealExample}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-[#00d2d3] uppercase tracking-[0.3em]">Análise Técnica</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-xs font-bold text-green-400 uppercase mb-1">Ponto de Conexão</p>
                  <p className="text-xs text-gray-400">Humaniza o atendimento e mostra que você não é um robô de orçamentos.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-xs font-bold text-green-400 uppercase mb-1">Geração de Valor</p>
                  <p className="text-xs text-gray-400">Tira o foco do preço e coloca no benefício ou na transformação do procedimento.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-xs font-bold text-green-400 uppercase mb-1">Chamada para Ação (CTA)</p>
                  <p className="text-xs text-gray-400">Conduz o cliente para o próximo passo lógico: o agendamento.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-center">
              <p className="text-[#00d2d3] text-sm font-black italic">
                “Transformando conversas em faturamento.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePlayModule;
