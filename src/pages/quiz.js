import React from 'react';
import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import QUESTIONS from '../data/questions';
import Layout from '../components/layout/layout';
import Question from '../components/quiz/question';
import Summary from '../components/quiz/summary';

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
          return [...prevUserAnswers, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);

    return (
        <Layout>
            <Helmet>
                <title>Bloemstraat Garden - Quiz</title>
            </Helmet>
            <main>
                <section className='hero hero--vh'>
                    <div className='hero__container'>
                        <div className='hero__text'>
                            <h1 className='quiz-header'>Moestuin Quiz</h1>
                            <div className='quiz-container'>
                                {quizIsComplete ? <Summary userAnswers={userAnswers} /> :                                 
                                <Question
                                    key={activeQuestionIndex}
                                    questionIndex={activeQuestionIndex}
                                    onSelectAnswer={handleSelectAnswer}
                                    onSkipAnswer={handleSkipAnswer}            
                                />}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export default Quiz