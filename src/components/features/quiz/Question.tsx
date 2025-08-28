"use client"

import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./Timer";
import QUESTIONS from "@/lib/quiz";
import styles from "./question.module.scss"

interface QuestionProps {
  questionIndex: number;
  onSelectAnswer: (answer: string) => void;
  onSkipAnswer: () => void;
}

interface AnswerState {
  selectedAnswer: string;
  isCorrect: boolean | null;
}

export default function Question({ questionIndex, onSelectAnswer, onSkipAnswer }: QuestionProps) {
  const [answer, setAnswer] = useState<AnswerState>({
    selectedAnswer: "",
    isCorrect: null,
  });

  // Add safety checks
  if (!QUESTIONS || !Array.isArray(QUESTIONS)) {
    console.error('QUESTIONS is not properly imported or is not an array');
    return <div>Error loading quiz questions</div>;
  }

  if (questionIndex < 0 || questionIndex >= QUESTIONS.length) {
    console.error(`Question index ${questionIndex} is out of bounds. QUESTIONS length: ${QUESTIONS.length}`);
    return <div>Question not found</div>;
  }

  const currentQuestion = QUESTIONS[questionIndex];
  if (!currentQuestion || !currentQuestion.answers || !Array.isArray(currentQuestion.answers)) {
    console.error(`Question at index ${questionIndex} is missing or malformed:`, currentQuestion);
    return <div>Question data is invalid</div>;
  }

  let timer = 15000;

  if (answer.isCorrect !== null) {
    timer = 3000;
  }

  function handleSelectAnswer(selectedAnswer: string) {
    setAnswer({
      selectedAnswer: selectedAnswer,
      isCorrect: null,
    });

    setTimeout(() => {
      // Double-check the question still exists when the timeout executes
      if (currentQuestion && currentQuestion.answers && currentQuestion.answers.length > 0) {
        setAnswer({
          selectedAnswer: selectedAnswer,
          isCorrect: selectedAnswer === currentQuestion.answers[0],
        });

        setTimeout(() => {
          onSelectAnswer(selectedAnswer);
        }, 3000);
      } else {
        console.error('Question data became invalid during answer processing');
        onSelectAnswer(selectedAnswer); // Still call the callback to prevent hanging
      }
    }, 0);
  }

  let answerStatus = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerStatus = answer.isCorrect ? styles.correct : styles.wrong;
  }

  return (
    <div className={styles.quiz}>
      <QuestionTimer 
        key={timer} 
        timeout={timer} 
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : () => {}} 
        mode={answerStatus} 
      />
      <h2>{currentQuestion.text || 'Question text missing'}</h2>
      <div className={styles.quiz__amount}>{questionIndex + 1} / {QUESTIONS.length}</div>
      <Answers
        answers={currentQuestion.answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerStatus}
        onSelect={handleSelectAnswer}
      />
    </div>
  )
}