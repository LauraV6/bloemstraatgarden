import React from 'react';
import { useState } from 'react';
import QuestionTimer from './timer';
import Answers from './answers';
import QUESTIONS from '../data/questions'

const Question = ( {questionIndex, onSelectAnswer, onSkipAnswer} ) => {
    const [answer, setAnswer] = useState({
        selectedAnswer: "",
        isCorrect: null,
    });

    let timer = 15000;
  
    if (answer.isCorrect !== null) {
      timer = 3000;
    }

    function handleSelectAnswer(answer) {
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

    let answerState = "";
    if (answer.selectedAnswer && answer.isCorrect !== null) {
      answerState = answer.isCorrect ? "correct" : "wrong";
    }

    return (
        <div className='quiz'>
            <QuestionTimer key={timer} timeout={timer} onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null} mode={answerState} />
            <h2>{QUESTIONS[questionIndex].text}</h2>
            <div className='quiz-amount'>{questionIndex + 1} / {QUESTIONS.length }</div>
            <Answers 
                answers={QUESTIONS[questionIndex].answers} 
                selectedAnswer={answer.selectedAnswer} 
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    )
}

export default Question