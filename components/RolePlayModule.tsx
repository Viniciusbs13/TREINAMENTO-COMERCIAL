
import React, { useState, useRef, useEffect } from 'react';
import { ROLEPLAY_SCENARIOS } from '../constants';
import { Scenario } from '../types';
import { QuizButton } from './QuizButton';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'client' | 'attendant';
  text: string;
}

type TabMode = 'chat' | 'example';

const RolePlayModule: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [activeTab, setActiveTab] = useState<TabMode>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setMessages([{ role: 'client', text: scenario.initialMessage }]);
    setEvaluation(null);
    setActiveTab('chat');
    setIsEvaluating(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !selectedScenario) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'attendant', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Você é um lead (cliente potencial) em um cenário de WhatsApp para uma clínica estética/odontológica.
        Cenário Atual: ${selectedScenario.title}
        Contexto do Cliente: ${selectedScenario.context}
        Seu objetivo como cliente: Atuar de forma realista. Se o atendente for humanizado, gerar valor e fizer perguntas estratégicas, você amolece e aceita agendar. Se ele for reativo (apenas responder preço ou ser seco), você fica frio ou some.
        Histórico da conversa: ${messages.map(m => `${m.role}: ${m.text}`).join('\n')}
        Última mensagem do atendente: ${userMsg}
        
        Responda como o cliente (em primeira pessoa, estilo WhatsApp, use emojis se fizer sentido). Seja curto e direto.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setMessages(prev => [...prev, { role: 'client', text: response.text || '...' }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const finishAndEvaluate = async () => {
    setIsEvaluating(true);
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const evaluationPrompt = `
        Avalie o desempenho deste atendente comercial baseado nas seguintes regras de pontuação:
        - Abertura humanizada: +1 ponto
        - Pergunta estratégica: +1 ponto
        - Geração de valor (antes do preço): +1 ponto
        - Condução para agendamento (Técnica da Alternativa): +2 pontos
        - Agendamento fechado: +3 pontos
        - Quebrou regra (Falar preço direto, Pergunta "quer agendar?", Textão, Ignorar dor): -1 ponto cada.

        Chat Histórico:
        ${messages.map(m => `${m.role}: ${m.text}`).join('\n')}

        Forneça um feedback divertido, assertivo e uma nota final de 0 a 10.
        Termine sempre com a frase: "Aqui não é improviso. É método aplicado na prática."
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: evaluationPrompt
      });
      setEvaluation(response.text || 'Erro ao avaliar.');
    } catch (e) {
      setEvaluation("Não foi possível gerar a avaliação agora.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedScenario) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-white">🎮 ROLE PLAY RAIZ</h2>
          <p className="text-gray-400">“AGENDA OU NÃO AGENDA?” 🎭</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLEPLAY_SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => startScenario(s)}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#009999] transition-all text-left space-y-4 group"
            >
              <div className="text-4xl">{s.emoji}</div>
              <h3 className="text-xl font-bold text-[#00d2d3]">{s.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{s.context}</p>
              <div className="pt-2 text-xs font-bold uppercase text-white/30 group-hover:text-white">Abrir Carta →</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      {/* Sidebar: Rules & Context */}
      <div className="lg:col-span-1 space-y-6">
        <div className="p-6 rounded-2xl bg-[#009999]/10 border border-[#009999]/30 space-y-4">
          <h3 className="font-black text-[#00d2d3] flex items-center gap-2">
            <span>{selectedScenario.emoji}</span> {selectedScenario.title}
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed"><strong>Contexto:</strong> {selectedScenario.context}</p>
          <p className="text-sm text-[#00d2d3] font-bold italic"><strong>Objetivo:</strong> {selectedScenario.objective}</p>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] space-y-2 uppercase tracking-wider">
          <p className="font-bold text-white/50">Glossário:</p>
          <p><span className="text-[#00d2d3]">SAC:</span> Serviço Reativo</p>
          <p><span className="text-[#00d2d3]">CTA:</span> Chamada para Ação</p>
          <p><span className="text-[#00d2d3]">Follow-up:</span> Acompanhamento</p>
        </div>

        <QuizButton onClick={() => setSelectedScenario(null)} variant="outline" className="w-full">Trocar Cenário</QuizButton>
      </div>

      {/* Main: Chat Simulation or Example */}
      <div className="lg:col-span-2 flex flex-col h-[600px] bg-black/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
        
        {/* Tab Navigation */}
        <div className="flex bg-white/5 border-b border-white/10">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'chat' ? 'text-[#00d2d3] bg-white/5 border-b-2 border-[#00d2d3]' : 'text-white/40 hover:text-white'}`}
          >
            Simulador
          </button>
          <button 
            onClick={() => setActiveTab('example')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'example' ? 'text-[#00d2d3] bg-white/5 border-b-2 border-[#00d2d3]' : 'text-white/40 hover:text-white'}`}
          >
            Exemplo Ideal
          </button>
        </div>

        {activeTab === 'chat' ? (
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'client' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.role === 'client' 
                      ? 'bg-white/10 text-white rounded-tl-none' 
                      : 'bg-[#009999] text-white rounded-tr-none font-medium'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && !evaluation && (
                <div className="flex justify-start">
                  <div className="bg-white/5 px-4 py-2 rounded-full text-xs text-white/50 italic animate-pulse">
                    Cliente digitando...
                  </div>
                </div>
              )}
              
              {evaluation && (
                <div className="p-6 bg-white/10 border-2 border-[#009999] rounded-2xl space-y-4 animate-in zoom-in">
                  <h3 className="text-xl font-black text-[#00d2d3]">📊 Resultado do Role Play</h3>
                  <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {evaluation}
                  </div>
                  <div className="flex gap-3">
                    <QuizButton onClick={() => setActiveTab('example')} className="flex-1">Ver Forma Correta</QuizButton>
                    <QuizButton onClick={() => setSelectedScenario(null)} variant="outline">Novo Desafio</QuizButton>
                  </div>
                </div>
              )}
            </div>

            {!evaluation && (
              <div className="p-4 bg-white/5 border-t border-white/10 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Digite sua resposta de atendente..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#009999] transition-all"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={loading || !inputValue.trim()}
                    className="w-12 h-12 rounded-full bg-[#009999] flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                  >
                    ✈️
                  </button>
                </div>
                <button 
                  onClick={finishAndEvaluate}
                  className="text-[10px] uppercase font-bold text-center w-full text-white/40 hover:text-[#00d2d3] transition-colors"
                >
                  Encerrar e Avaliar Performance
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 p-8 overflow-y-auto space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-4">
               <h3 className="text-sm font-black text-[#00d2d3] uppercase tracking-widest">O Cenário</h3>
               <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-xl font-medium italic">
                 "{selectedScenario.initialMessage}"
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-sm font-black text-[#00d2d3] uppercase tracking-widest">Forma Correta (Método Ômega)</h3>
               <div className="p-6 bg-[#009999]/10 border border-[#009999]/40 rounded-2xl space-y-6">
                 <div className="space-y-2">
                   <p className="text-xs font-bold text-[#00d2d3]/60 uppercase">Exemplo de Resposta:</p>
                   <p className="text-white text-lg leading-relaxed whitespace-pre-wrap font-medium">
                     {selectedScenario.idealExample}
                   </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-green-400 uppercase">Por que funciona?</p>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Gera conexão imediata</li>
                        <li>• Não fala preço de cara</li>
                        <li>• Usa Gatilho de Curiosidade</li>
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-green-400 uppercase">O Segredo:</p>
                      <p className="text-xs text-gray-400 italic">
                        Transforma uma dúvida de preço em uma conversa de valor.
                      </p>
                    </div>
                 </div>
               </div>
            </div>

            <div className="pt-8 text-center">
              <QuizButton onClick={() => setActiveTab('chat')} variant="outline">Voltar para Prática</QuizButton>
            </div>
            
            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">
                “Aqui não é improviso. É método aplicado na prática.”
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolePlayModule;
