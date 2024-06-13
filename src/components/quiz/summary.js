import React from 'react';
import QUESTIONS from '../../data/questions';
import FadeIn from '../animation/fadeIn';

const Summary = ( { userAnswers } ) => {
    const skippedAnswers = userAnswers.filter((answer) => answer === null);
    const correctAnswers = userAnswers.filter((answer, i) => answer === QUESTIONS[i].answers[0]);
    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    return (
        <div className='summary'>
            <h2>Quiz voltooid!</h2>
            <div className='summary__states'>
                <FadeIn className='score'>
                    <span className='score__number'>{skippedAnswersShare}%</span>
                    <span className='score__text'>Overgeslagen</span>     
                </FadeIn>
                <FadeIn className='score' delay={0.2}>
                    <span className='score__number'>{correctAnswersShare}%</span>
                    <span className='score__text'>Correct</span>     
                </FadeIn>
                <FadeIn className='score' delay={0.4}>
                    <span className='score__number'>{wrongAnswersShare}%</span>
                    <span className='score__text'>Fout</span>     
                </FadeIn>
            </div>
            <ol className='summary__answers'>
                {userAnswers.map((answer, i) => {
                    let cssClass = "user-answer";
                    let showCorrectAnswer = "";
                    const correctAnswer = QUESTIONS[i].answers[0];

                    if (answer === null) {
                        cssClass += " skipped";
                        showCorrectAnswer = correctAnswer;
                    } else if (answer === correctAnswer) {
                        cssClass += " correct";
                    } else {
                        cssClass += " wrong";
                        showCorrectAnswer = correctAnswer;
                    }
                    
                    return (
                        <li key={i}>
                            <FadeIn delay={i * 0.2}>
                                <h3>{i + 1}</h3>
                                <h4 className='question'>{QUESTIONS[i].text}</h4>
                                <p className={cssClass}>{answer ?? 'Skipped'}</p>
                                {answer !== correctAnswer ? <p className='question-answer'>Correct antwoord: {showCorrectAnswer}</p> : null}
                            </FadeIn>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export default Summary