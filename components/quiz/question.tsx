"use client"

import { useState } from "react";
import Answers from "./answers";
import QuestionTimer from "./timer";
import QUESTIONS from "../../lib/quiz";
import styles from "./question.module.scss"

export default function Question({ questionIndex, onSelectAnswer, onSkipAnswer }: any) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null as any,
  });

  let timer = 15000;

  if (answer.isCorrect !== null) {
    timer = 3000;
  }

  function handleSelectAnswer(answer: any) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[questionIndex].answers[0],
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 3000);
    }, 0);
  }

  let answerStatus = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerStatus = answer.isCorrect ? styles.correct : styles.wrong;
  }

  return (
    <div className={styles.quiz}>
      <QuestionTimer key={timer} timeout={timer} onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null} mode={answerStatus} />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <div className={styles.quiz__amount}>{questionIndex + 1} / {QUESTIONS.length}</div>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerStatus}
        onSelect={handleSelectAnswer}
      />
    </div>
  )
}