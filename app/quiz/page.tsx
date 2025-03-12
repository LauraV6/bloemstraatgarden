"use client"

import { useState, useCallback } from "react";
import Question from "../../components/quiz/question";
import QUESTIONS from "../../lib/quiz";
import Summary from "../../components/quiz/summary";
import FadeIn from "../../components/fadeIn";
import styles from "./page.module.scss";
import heroStyles from "../../components/layout/hero.module.scss";

export default function QuizPage() {
    const [userAnswers, setUserAnswers] = useState(Array);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer: any) {
        setUserAnswers((prevUserAnswers) => {
          return [...prevUserAnswers, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);

    return (
        <main>
            <section className={`${heroStyles.hero} ${heroStyles.heroVh}`}>
                <div className={heroStyles.hero__container}>
                    <div className={heroStyles.hero__text}>
                        <h1 className={styles.quiz__header}>Moestuin Quiz</h1>
                        <FadeIn className={styles.quiz__container}>
                            {quizIsComplete ? <Summary userAnswers={userAnswers} /> :                                 
                            <Question
                                key={activeQuestionIndex}
                                questionIndex={activeQuestionIndex}
                                onSelectAnswer={handleSelectAnswer}
                                onSkipAnswer={handleSkipAnswer}            
                            />}
                        </FadeIn>
                    </div>
                </div>
            </section>
        </main>
    )
}
