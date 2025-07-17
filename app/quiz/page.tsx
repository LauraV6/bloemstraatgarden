"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Question from "../../components/quiz/question";
import Summary from "../../components/quiz/summary";
import FadeIn from "../../components/fadeIn";
import QUESTIONS from "../../lib/quiz";
import { trackQuizEvent } from "../../lib/gtag";
import styles from "./page.module.scss";
import heroStyles from "../../components/layout/hero.module.scss";

interface UserAnswer {
  questionIndex: number;
  selectedAnswer: string | null;
  timestamp: number;
}

// Constants with validation
const QUIZ_CONFIG = {
  title: "Moestuin Quiz",
  totalQuestions: QUESTIONS && Array.isArray(QUESTIONS) ? QUESTIONS.length : 0
} as const;

// Custom hooks
const useQuizState = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUIZ_CONFIG.totalQuestions;
  const progress = QUIZ_CONFIG.totalQuestions > 0 
    ? Math.round((activeQuestionIndex / QUIZ_CONFIG.totalQuestions) * 100) 
    : 0;

  const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [
        ...prevAnswers,
        {
          questionIndex: activeQuestionIndex,
          selectedAnswer,
          timestamp: Date.now()
        }
      ];
      
      // Track the answer - ADD THIS
      trackQuizEvent('question_answered', activeQuestionIndex, selectedAnswer || 'skipped');
      
      // Check if quiz is complete - ADD THIS
      if (newAnswers.length === QUIZ_CONFIG.totalQuestions) {
        trackQuizEvent('quiz_completed');
      }
      
      return newAnswers;
    });
  }, [activeQuestionIndex]);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  const resetQuiz = useCallback(() => {
    setUserAnswers([]);
    // Track quiz reset - ADD THIS
    trackQuizEvent('quiz_reset');
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
  // Add validation for QUESTIONS array
  if (!QUESTIONS || !Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
    return (
      <div className={styles.quiz__error || ''}>
        <h2>Quiz data not available</h2>
        <p>Please check that the quiz questions are properly loaded.</p>
      </div>
    );
  }

  if (quizIsComplete) {
    // Transform UserAnswer[] to the format Summary expects (just the answers)
    const answersForSummary = userAnswers.map(answer => answer.selectedAnswer);
    
    return (
      <div>
        <Summary userAnswers={answersForSummary} />
        <button 
          onClick={onResetQuiz}
          className="button button--cta"
          style={{ marginTop: '2rem' }}
        >
          Start opnieuw
        </button>
      </div>
    );
  }

  // Validate current question index
  if (activeQuestionIndex >= QUESTIONS.length) {
    console.error(`Active question index ${activeQuestionIndex} is out of bounds`);
    return (
      <div className={styles.quiz__error || ''}>
        <h2>Quiz error</h2>
        <p>Question index is out of range.</p>
        <button onClick={onResetQuiz} className="button button--cta">
          Reset Quiz
        </button>
      </div>
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

export default function QuizPage() {
  // Add mounted state to prevent hydration issues
  const [isMounted, setIsMounted] = useState(false);
  
  const {
    userAnswers,
    activeQuestionIndex,
    quizIsComplete,
    progress,
    handleSelectAnswer,
    handleSkipAnswer,
    resetQuiz
  } = useQuizState();

  // Only render after hydration is complete
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track quiz start when component mounts - ADD THIS
  useEffect(() => {
    if (isMounted && userAnswers.length === 0) {
      trackQuizEvent('quiz_start');
    }
  }, [isMounted, userAnswers.length]);

  // Memoize the quiz status for performance
  const quizStatus = useMemo(() => ({
    isComplete: quizIsComplete,
    currentQuestion: activeQuestionIndex + 1,
    totalQuestions: QUIZ_CONFIG.totalQuestions,
    progress
  }), [quizIsComplete, activeQuestionIndex, progress]);

  // Show loading until mounted (prevents hydration mismatch)
  if (!isMounted) {
    return (
      <main role="main">
        <section className={`${heroStyles.hero} ${heroStyles.heroVh}`}>
          <div className={heroStyles.hero__container}>
            <div className={heroStyles.hero__text}>
              <h1>Loading quiz...</h1>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Add loading state for when QUESTIONS is not available
  if (!QUESTIONS || !Array.isArray(QUESTIONS)) {
    return (
      <main role="main">
        <section className={`${heroStyles.hero} ${heroStyles.heroVh}`}>
          <div className={heroStyles.hero__container}>
            <div className={heroStyles.hero__text}>
              <h1>Loading quiz...</h1>
              <p>Please wait while we load the quiz questions.</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (QUESTIONS.length === 0) {
    return (
      <main role="main">
        <section className={`${heroStyles.hero} ${heroStyles.heroVh}`}>
          <div className={heroStyles.hero__container}>
            <div className={heroStyles.hero__text}>
              <h1>No Quiz Available</h1>
              <p>There are no quiz questions available at this time.</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

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
              {!quizStatus.isComplete && (
                <div className={styles.quiz__progress || ''}>
                  Vraag {quizStatus.currentQuestion} van {quizStatus.totalQuestions}
                </div>
              )}
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