"use client";

import { useState, useCallback, useMemo } from "react";
import Question from "../../components/quiz/question";
import Summary from "../../components/quiz/summary";
import FadeIn from "../../components/fadeIn";
import QUESTIONS from "../../lib/quiz";
import styles from "./page.module.scss";
import heroStyles from "../../components/layout/hero.module.scss";

// Remove QuizPageProps interface - not needed for Next.js app directory pages

interface UserAnswer {
  questionIndex: number;
  selectedAnswer: string | null;
  timestamp: number;
}

// Constants
const QUIZ_CONFIG = {
  title: "Moestuin Quiz",
  totalQuestions: QUESTIONS.length
} as const;

// Custom hooks
const useQuizState = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUIZ_CONFIG.totalQuestions;
  const progress = Math.round((activeQuestionIndex / QUIZ_CONFIG.totalQuestions) * 100);

  const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionIndex: activeQuestionIndex,
        selectedAnswer,
        timestamp: Date.now()
      }
    ]);
  }, [activeQuestionIndex]);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  const resetQuiz = useCallback(() => {
    setUserAnswers([]);
  }, []);

  return {
    userAnswers,
    activeQuestionIndex,
    quizIsComplete,
    progress,
    handleSelectAnswer,
    handleSkipAnswer,
    resetQuiz
  };
};

// Components
interface QuizContentProps {
  quizIsComplete: boolean;
  userAnswers: UserAnswer[];
  activeQuestionIndex: number;
  onSelectAnswer: (answer: string | null) => void;
  onSkipAnswer: () => void;
  onResetQuiz: () => void;
}

const QuizContent: React.FC<QuizContentProps> = ({
  quizIsComplete,
  userAnswers,
  activeQuestionIndex,
  onSelectAnswer,
  onSkipAnswer,
  onResetQuiz
}) => {
  if (quizIsComplete) {
    return (
      <Summary 
        userAnswers={userAnswers} 
        onResetQuiz={onResetQuiz}
      />
    );
  }

  return (
    <Question
      key={activeQuestionIndex}
      questionIndex={activeQuestionIndex}
      onSelectAnswer={onSelectAnswer}
      onSkipAnswer={onSkipAnswer}            
    />
  );
};

// Remove the className prop - Next.js app directory pages don't receive props
export default function QuizPage() {
  const {
    userAnswers,
    activeQuestionIndex,
    quizIsComplete,
    progress,
    handleSelectAnswer,
    handleSkipAnswer,
    resetQuiz
  } = useQuizState();

  // Memoize the quiz status for performance
  const quizStatus = useMemo(() => ({
    isComplete: quizIsComplete,
    currentQuestion: activeQuestionIndex + 1,
    totalQuestions: QUIZ_CONFIG.totalQuestions,
    progress
  }), [quizIsComplete, activeQuestionIndex, progress]);

  return (
    <main role="main">
      <section 
        className={`${heroStyles.hero} ${heroStyles.heroVh}`}
        aria-label="Moestuin quiz sectie"
      >
        <div className={heroStyles.hero__container}>
          <div className={heroStyles.hero__text}>
            <header>
              <h1 className={styles.quiz__header}>
                {QUIZ_CONFIG.title}
              </h1>
            </header>
            
            <FadeIn className={styles.quiz__container}>
              <QuizContent
                quizIsComplete={quizStatus.isComplete}
                userAnswers={userAnswers}
                activeQuestionIndex={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
                onResetQuiz={resetQuiz}
              />
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}