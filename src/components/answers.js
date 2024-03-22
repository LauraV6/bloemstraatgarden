import React from 'react';
import { useRef } from 'react';

const Answers = ( {answers, answerState, onSelect} ) => {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul className='quiz-answers'>
            {shuffledAnswers.current.map((answer) => {
                return (
                    <li key={answer} className="answer">
                        <button onClick={() => onSelect(answer)} className={`button button--cta`} disabled={answerState !== ''}>{answer}</button>
                    </li>
                );
            })}
        </ul>
    )
}

export default Answers