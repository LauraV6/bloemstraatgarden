"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Question from "@/components/features/quiz/Question";
import Summary from "@/components/features/quiz/Summary";
import QUESTIONS from "@/lib/quiz";
import { trackQuizEvent } from "@/lib/analytics/Gtag";
import styled from '@emotion/styled';

// Styled components
const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 119px 0 2rem 0;
  margin: 0;
  width: 100%;
  background-color: ${({ theme }) => 
    theme.colors.background === '#23252a' 
      ? theme.colors.menu
      : theme.colors.background
  };
  position: relative;
  overflow-x: hidden;
  max-width: 100vw;
  min-height: 100vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 154px 0 2rem 0;
  }
`;

const HeroContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2rem;
  }
`;

const HeroText = styled.div`
  width: 100%;
`;

const QuizHeader = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamilyHeading};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
`;

const QuizContainer = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== '$isComplete'
})<{ $isComplete?: boolean }>`
  max-width: ${props => props.$isComplete ? '900px' : '1100px'};
  margin: 0 auto;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.green5};
  border-radius: ${({ theme }) => theme.radii.lg};
  position: relative;
  transition: max-width 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2rem 3rem;
    width: calc(100% - 2rem);
    margin: 0 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem 0.75rem;
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

const QuizError = styled.div`
  background: ${({ theme }) => theme.colors.error};
  color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  text-align: center;

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

interface UserAnswer {
  questionIndex: number;
  selectedAnswer: string | null;
  timestamp: number;
}

const QUIZ_CONFIG = {
  title: "Moestuin Quiz",
  totalQuestions: QUESTIONS && Array.isArray(QUESTIONS) ? QUESTIONS.length : 0
} as const;

function useQuizState() {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.answers && Array.isArray(parsed.answers)) {
          setUserAnswers(parsed.answers);
        }
      } catch (e) {
        console.error('Failed to restore quiz state:', e);
      }
    }
    setIsRestoring(false);
  }, []);

  useEffect(() => {
    if (!isRestoring && userAnswers.length > 0) {
      localStorage.setItem('quizState', JSON.stringify({
        answers: userAnswers,
        savedAt: Date.now()
      }));
    }
  }, [userAnswers, isRestoring]);

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
      trackQuizEvent('question_answered', activeQuestionIndex, selectedAnswer || 'skipped');
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
    localStorage.removeItem('quizState');
    trackQuizEvent('quiz_reset');
  }, []);

  return {
    userAnswers,
    activeQuestionIndex,
    quizIsComplete,
    progress,
    handleSelectAnswer,
    handleSkipAnswer,
    resetQuiz,
    isRestoring
  };
}

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
  if (!QUESTIONS || !Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
    return (
      <QuizError role="alert">
        <h2>Quiz data not available</h2>
        <p>Please check that the quiz questions are properly loaded.</p>
      </QuizError>
    );
  }

  if (quizIsComplete) {
    const answersForSummary = userAnswers.map(answer => answer.selectedAnswer);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
        <Summary userAnswers={answersForSummary} />
        <button 
          onClick={onResetQuiz}
          className="button button--cta"
          style={{ margin: '0 auto' }}
        >
          <span>Start opnieuw</span>
        </button>
      </div>
    );
  }

  if (activeQuestionIndex >= QUESTIONS.length) {
    console.error(`Active question index ${activeQuestionIndex} is out of bounds`);
    return (
      <QuizError role="alert">
        <h2>Quiz error</h2>
        <p>Question index is out of range.</p>
        <button onClick={onResetQuiz} className="button button--cta">
          Reset Quiz
        </button>
      </QuizError>
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
  const [isMounted, setIsMounted] = useState(false);

  const {
    userAnswers,
    activeQuestionIndex,
    quizIsComplete,
    progress,
    handleSelectAnswer,
    handleSkipAnswer,
    resetQuiz,
    isRestoring
  } = useQuizState();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isRestoring && userAnswers.length === 0) {
      trackQuizEvent('quiz_start');
    }
  }, [isMounted, isRestoring, userAnswers.length]);

  const quizStatus = useMemo(() => ({
    isComplete: quizIsComplete,
    currentQuestion: activeQuestionIndex + 1,
    totalQuestions: QUIZ_CONFIG.totalQuestions,
    progress
  }), [quizIsComplete, activeQuestionIndex, progress]);

  if (!isMounted || isRestoring) {
    return (
      <main role="main" aria-busy="true">
        <Hero>
          <HeroContainer>
            <HeroText>
              <QuizHeader>Loading quiz...</QuizHeader>
            </HeroText>
          </HeroContainer>
        </Hero>
      </main>
    );
  }

  if (!QUESTIONS || !Array.isArray(QUESTIONS)) {
    return (
      <main role="main" aria-busy="true">
        <Hero>
          <HeroContainer>
            <HeroText>
              <QuizHeader>Loading quiz...</QuizHeader>
              <p>Please wait while we load the quiz questions.</p>
            </HeroText>
          </HeroContainer>
        </Hero>
      </main>
    );
  }

  if (QUESTIONS.length === 0) {
    return (
      <main role="main">
        <Hero>
          <HeroContainer>
            <HeroText>
              <QuizHeader>No Quiz Available</QuizHeader>
              <p>There are no quiz questions available at this time.</p>
            </HeroText>
          </HeroContainer>
        </Hero>
      </main>
    );
  }

  return (
    <motion.main 
      role="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Hero aria-label="Moestuin quiz sectie">
        <HeroContainer>
          <HeroText>
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <QuizHeader>
                {QUIZ_CONFIG.title}
              </QuizHeader>
            </motion.header>

            <QuizContainer
              $isComplete={quizStatus.isComplete}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={quizIsComplete ? 'summary' : `question-${activeQuestionIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <QuizContent
                    quizIsComplete={quizStatus.isComplete}
                    userAnswers={userAnswers}
                    activeQuestionIndex={activeQuestionIndex}
                    onSelectAnswer={handleSelectAnswer}
                    onSkipAnswer={handleSkipAnswer}
                    onResetQuiz={resetQuiz}
                  />
                </motion.div>
              </AnimatePresence>
            </QuizContainer>
          </HeroText>
        </HeroContainer>
      </Hero>
    </motion.main>
  );
}