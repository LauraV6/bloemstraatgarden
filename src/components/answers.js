import React from 'react';
import { useRef } from 'react';

const Answers = ( {answers, selectedAnswer, answerState, onSelect} ) => {
    const shuffledAnswers = useRef(0);

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul className='quiz-answers'>
            {shuffledAnswers.current.map((answer) => {
                const isSelected = selectedAnswer === answer;
                let cssClass = '';
                
                if((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }

                return (
                    <li key={answer} className="answer">
                        <button onClick={() => onSelect(answer)} className={`button button--cta ${cssClass}`} disabled={answerState !== ''}>{answer}</button>
                    </li>
                );
            })}
        </ul>
    )
}

export default Answers