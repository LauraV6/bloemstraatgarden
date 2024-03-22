import React from 'react';

const Answers = ( {answers, selectedAnswer, answerState, onSelect} ) => {

    return (
        <ul className='quiz-answers'>
            {answers.map((answer) => {
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