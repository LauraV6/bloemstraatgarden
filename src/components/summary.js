import React from 'react';
import QUESTIONS from '../data/questions'

const Summary = ( { userAnswers } ) => {
    const skippedAnswers = userAnswers.filter((answer) => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);
    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    return (
        <div className='summary'>
            <h2>Quiz completed!</h2>
            <div className='summary__states'>
                <div className='score'>
                    <span className='score__number'>{skippedAnswersShare}%</span>
                    <span className='score__text'>Skipped</span>     
                </div>
                <div className='score'>
                    <span className='score__number'>{correctAnswersShare}%</span>
                    <span className='score__text'>Correct</span>     
                </div>
                <div className='score'>
                    <span className='score__number'>{wrongAnswersShare}%</span>
                    <span className='score__text'>Fout</span>     
                </div>
            </div>
            <ol className='summary__answers'>
                {userAnswers.map((answer, index) => {
                    let cssClass = "user-answer";
                    if (answer === null) {
                        cssClass += " skipped";
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += " correct";
                    } else {
                        cssClass += " wrong";
                    }
                    
                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className='question'>{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'Skipped'}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export default Summary