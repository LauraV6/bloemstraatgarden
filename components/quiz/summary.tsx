import styles from "./summary.module.scss"
import FadeIn from "../fadeIn";
import QUESTIONS from "../../lib/quiz";

export default function Summary({userAnswers}: any) {
    const skippedAnswers = userAnswers.filter((answer: any) => answer === null);
    const correctAnswers = userAnswers.filter((answer: any, i: any) => answer === QUESTIONS[i].answers[0]);
    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    return (
        <div className={styles.summary}>
            <h2>Quiz voltooid!</h2>
            <div className={styles.summary__states}>
                <FadeIn className={styles.score}>
                    <span className={styles.score__number}>{skippedAnswersShare}%</span>
                    <span className={styles.score__text}>Overgeslagen</span>     
                </FadeIn>
                <FadeIn className={styles.score} delay={0.2}>
                    <span className={styles.score__number}>{correctAnswersShare}%</span>
                    <span className={styles.score__text}>Correct</span>     
                </FadeIn>
                <FadeIn className={styles.score} delay={0.4}>
                    <span className={styles.score__number}>{wrongAnswersShare}%</span>
                    <span className={styles.score__text}>Fout</span>
                </FadeIn>
            </div>
            <ol className={styles.summary__answers}>
                {userAnswers.map((answer: any, i: any) => {
                    let cssClass = styles.userAnswer;
                    let showCorrectAnswer = "";
                    const correctAnswer = QUESTIONS[i].answers[0];

                    if (answer === null) {
                        cssClass = styles.skipped;
                        showCorrectAnswer = correctAnswer;
                    } else if (answer === correctAnswer) {
                        cssClass = styles.correct;
                    } else {
                        cssClass = styles.wrong;
                        showCorrectAnswer = correctAnswer;
                    }
                    
                    return (
                        <li key={i}>
                            <FadeIn delay={i * 0.2}>
                                <h3>{i + 1}</h3>
                                <h4 className={styles.question}>{QUESTIONS[i].text}</h4>
                                <p className={`${styles.userAnswer + ' ' + (cssClass)}`}>{answer ?? 'Skipped'}</p>
                                {answer !== correctAnswer ? <p className={`${styles.questionAnswer + ' ' + (cssClass)}`}>Correct antwoord: {showCorrectAnswer}</p> : null}
                            </FadeIn>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}