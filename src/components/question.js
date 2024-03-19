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

    let timer = 10000;

    if (answer.selectedAnswer) {
      timer = 1000;
    }
  
    if (answer.isCorrect !== null) {
      timer = 2000;
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
          }, 2000);
        }, 1000);
      }

    let answerState = "";
    if (answer.selectedAnswer && answer.isCorrect !== null) {
      answerState = answer.isCorrect ? "correct" : "wrong";
    } else if (answer.selectedAnswer) {
      answerState = "answered";
    }

    return (
        <div className='quiz'>
            <QuestionTimer key={timer} timeout={timer} onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null} mode={answerState} />
            <h2>{QUESTIONS[questionIndex].text}</h2>
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