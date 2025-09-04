export interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
  correct: string;
}

export interface QuizAnswer {
  id: string;
  text: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: (string | null)[];
  isComplete: boolean;
  startTime: Date | null;
  endTime: Date | null;
}

export interface QuizContextType {
  state: QuizState;
  startQuiz: () => void;
  answerQuestion: (answerId: string) => void;
  skipQuestion: () => void;
  resetQuiz: () => void;
  getResults: () => QuizResults;
}

export interface QuizResults {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  skippedAnswers: number;
  percentage: number;
  timeElapsed: number | null;
  answers: QuizAnswerResult[];
}

export interface QuizAnswerResult {
  questionId: string;
  question: string;
  userAnswerId: string | null;
  correctAnswerId: string;
  isCorrect: boolean;
  isSkipped: boolean;
}

export type AnswerState = 'unanswered' | 'answered' | 'correct' | 'incorrect';