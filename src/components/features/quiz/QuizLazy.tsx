import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Define proper types for quiz components
interface QuestionProps {
  question: {
    id: string;
    text: string;
    answers: string[];
  };
  onSelectAnswer: (answer: string | null) => void;
  selectedAnswer: string | null;
  onSkipAnswer: () => void;
}

interface SummaryProps {
  userAnswers: Array<{
    questionIndex: number;
    selectedAnswer: string | null;
    timestamp: number;
  }>;
  questions: Array<{
    id: string;
    text: string;
    answers: string[];
  }>;
  onRestart: () => void;
}

interface TimerProps {
  timeout: number;
  onTimeout: () => void;
  mode?: string;
}

// Lazy load the quiz components with loading fallback
export const Question = dynamic(
  () => import('./Question'),
  { 
    loading: () => <div>Loading question...</div>,
    ssr: false 
  }
);

export const Summary = dynamic(
  () => import('./Summary'),
  { 
    loading: () => <div>Loading summary...</div>,
    ssr: false 
  }
);

export const Timer = dynamic(
  () => import('./Timer'),
  { 
    loading: () => <div>Loading timer...</div>,
    ssr: false 
  }
);