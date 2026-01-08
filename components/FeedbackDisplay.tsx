
import React from 'react';
import { Option, Question } from '../types';
import { QuizButton } from './QuizButton';

interface FeedbackDisplayProps {
  question: Question;
  selectedOption: Option;
  onNext: () => void;
  isLast: boolean;
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ 
  question, 
  selectedOption, 
  onNext,
  isLast 
}) => {
  const isCorrect = selectedOption.isCorrect;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`p-6 rounded-2xl border-l-8 ${isCorrect ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">
            {isCorrect ? '🎯' : '💡'}
          </span>
          <h3 className={`text-2xl font-extrabold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Boa, você acertou!' : 'Quase lá! Mas entenda:'}
          </h3>
        </div>
        
        {!isCorrect && (
          <p className="text-gray-300 mb-4 italic">
            Sua resposta: "{selectedOption.text}"
          </p>
        )}

        <div className="bg-black/40 p-5 rounded-xl border border-white/5">
          <p className="text-white text-lg leading-relaxed">
            {question.explanation}
          </p>
        </div>

        {question.funFact && (
          <div className="mt-4 flex gap-2 items-start text-sm text-[#00d2d3]">
            <span className="font-bold">Dica Omega:</span>
            <p>{question.funFact}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <QuizButton onClick={onNext} variant="primary" className="w-full sm:w-auto">
          {isLast ? 'Ver Resultado Final' : 'Próximo Desafio →'}
        </QuizButton>
      </div>
    </div>
  );
};
