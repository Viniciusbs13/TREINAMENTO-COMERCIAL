
import React, { useState } from 'react';
import { AppView } from './types';
import QuizModule from './components/QuizModule';
import RolePlayModule from './components/RolePlayModule';
import { QuizButton } from './components/QuizButton';
import { QUIZ_QUESTIONS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('HOME');

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in zoom-in duration-700 max-w-4xl mx-auto py-12">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#009999] blur-[100px] opacity-20 rounded-full"></div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter relative uppercase">
          ASSESSORIA <br/><span className="text-[#00d2d3]">ÔMEGA</span>
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-6">
        {/* Quiz Card */}
        <button 
          onClick={() => setView('QUIZ')}
          className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#00d2d3]/50 hover:bg-white/10 transition-all duration-300 text-left overflow-hidden shadow-2xl"
        >
          <div className="absolute -right-8 -bottom-8 text-9xl opacity-10 group-hover:scale-110 transition-transform">🧠</div>
          <h2 className="text-3xl font-black text-[#00d2d3] mb-4">Quiz Comercial</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Teste seus conhecimentos sobre atendimento, gatilhos mentais e conversão no WhatsApp.
          </p>
          <div className="text-sm font-bold uppercase tracking-widest text-white/50">{QUIZ_QUESTIONS.length} Desafios →</div>
        </button>

        {/* Role Play Card */}
        <button 
          onClick={() => setView('ROLEPLAY')}
          className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#00d2d3]/50 hover:bg-white/10 transition-all duration-300 text-left overflow-hidden shadow-2xl"
        >
          <div className="absolute -right-8 -bottom-8 text-9xl opacity-10 group-hover:scale-110 transition-transform">🎭</div>
          <h2 className="text-3xl font-black text-[#00d2d3] mb-4">Role Play</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Casos reais para treinar ao vivo. Aprenda a quebrar objeções com o Método Ômega.
          </p>
          <div className="text-sm font-bold uppercase tracking-widest text-white/50">Gabarito de Vendas →</div>
        </button>
      </div>

      <div className="mt-12 text-xs text-white/30 uppercase tracking-[0.3em]">
        Método Assessoria Ômega • Excelência em Conversão
      </div>
    </div>
  );

  return (
    <div className="min-h-screen omega-gradient text-white flex flex-col">
      <nav className="p-6 md:p-10 flex justify-between items-center z-50">
        <button onClick={() => setView('HOME')} className="flex items-center gap-2 group">
           <div className="w-10 h-10 border-4 border-[#00d2d3] flex items-center justify-center rotate-45 group-hover:bg-[#00d2d3] transition-colors">
             <span className="text-[#00d2d3] font-black -rotate-45 text-xl group-hover:text-black">Ω</span>
           </div>
           <span className="font-black text-xl tracking-tighter uppercase">ASSESSORIA <span className="text-[#00d2d3]">ÔMEGA</span></span>
        </button>
        {view !== 'HOME' && (
          <QuizButton onClick={() => setView('HOME')} variant="outline" className="px-4 py-2 text-sm border-[#00d2d3] text-[#00d2d3]">
            Voltar ao Hub
          </QuizButton>
        )}
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#009999]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#00d2d3]/10 blur-[120px] rounded-full"></div>

        <div className="w-full relative z-10">
          {view === 'HOME' && renderHome()}
          {view === 'QUIZ' && <QuizModule />}
          {view === 'ROLEPLAY' && <RolePlayModule />}
        </div>
      </main>

      <footer className="p-8 text-center border-t border-white/5 mt-auto">
        <p className="text-white/30 text-xs uppercase tracking-widest">
          Desenvolvido para Treinamento Comercial • © 2024
        </p>
      </footer>
    </div>
  );
};

export default App;
