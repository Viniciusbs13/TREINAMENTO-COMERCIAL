
export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  title: string;
  text: string;
  options: Option[];
  explanation: string;
  funFact?: string;
}

export interface Scenario {
  id: string;
  title: string;
  emoji: string;
  context: string;
  objective: string;
  idealExample: string;
  initialMessage: string;
  type: 'NORMAL' | 'SURPRISE';
}

export type AppView = 'HOME' | 'QUIZ' | 'ROLEPLAY';
export type QuizStatus = 'START' | 'IN_PROGRESS' | 'FEEDBACK' | 'FINISHED';

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  status: QuizStatus;
  selectedOption: Option | null;
  answers: boolean[];
}
