
import React, { useState, useCallback, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { QuizState, Option } from '../types';
import { QuizButton } from './QuizButton';
import { FeedbackDisplay } from './FeedbackDisplay';

const QuizModule: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    status: 'IN_PROGRESS',
    selectedOption: null,
    answers: []
  });

  const currentQuestion = useMemo(() => 
    QUIZ_QUESTIONS[state.currentQuestionIndex], 
  [state.currentQuestionIndex]);

  const progress = useMemo(() => 
    ((state.currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100, 
  [state.currentQuestionIndex]);

  const startQuiz = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      score: 0,
      status: 'IN_PROGRESS',
      selectedOption: null,
      answers: []
    });
  }, []);

  const handleOptionSelect = useCallback((option: Option) => {
    setState(prev => ({
      ...prev,
      selectedOption: option,
      status: 'FEEDBACK',
      score: option.isCorrect ? prev.score + 1 : prev.score,
      answers: [...prev.answers, option.isCorrect]
    }));
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (state.currentQuestionIndex >= QUIZ_QUESTIONS.length - 1) {
      setState(prev => ({ ...prev, status: 'FINISHED' }));
    } else {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedOption: null,
        status: 'IN_PROGRESS'
      }));
    }
  }, [state.currentQuestionIndex]);

  if (state.status === 'FINISHED') {
    const percentage = (state.score / QUIZ_QUESTIONS.length) * 100;
    let message = percentage === 100 ? "Perfeito! Você é um mestre comercial da Ômega!" : percentage >= 70 ? "Excelente desempenho! Pronto para escalar!" : "Bom esforço! Vamos revisar os pontos chave?";
    
    return (
      <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700 max-w-2xl mx-auto">
        <div className="inline-block p-4 rounded-full bg-[#009999]/10 border-2 border-[#009999] mb-4">
          <span className="text-6xl">🏆</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white">Treinamento Concluído!</h2>
        <div className="space-y-2">
           <div className="text-7xl font-black text-[#00d2d3]">{state.score}/{QUIZ_QUESTIONS.length}</div>
           <p className="text-gray-400 text-xl font-medium">{message}</p>
        </div>
        <QuizButton onClick={startQuiz} variant="primary">Tentar Novamente</QuizButton>
        <div className="pt-12 border-t border-white/5 max-w-lg mx-auto">
          <p className="text-[#00d2d3] text-lg font-bold italic mb-2">
            “O marketing atrai. O atendimento converte. E a agenda faz a clínica crescer.”
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-sm font-bold text-[#00d2d3] uppercase tracking-wider">
            Desafio {state.currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-2xl font-black text-white">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#009999] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {state.status === 'IN_PROGRESS' ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="space-y-3">
            <h2 className="text-[#00d2d3] font-bold uppercase tracking-widest text-xs">{currentQuestion.title}</h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">{currentQuestion.text}</h3>
          </div>
          <div className="grid gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className="group relative flex items-center p-5 text-left rounded-2xl bg-white/5 border border-white/10 hover:border-[#009999]/50 hover:bg-white/10 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[#00d2d3] group-hover:bg-[#009999] group-hover:text-white transition-colors mr-4 shrink-0 uppercase">{option.id}</div>
                <span className="text-white text-lg font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        state.selectedOption && (
          <FeedbackDisplay 
            question={currentQuestion} 
            selectedOption={state.selectedOption}
            onNext={handleNextQuestion}
            isLast={state.currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
          />
        )
      )}
    </div>
  );
};

export default QuizModule;
