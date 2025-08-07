import styles from "./summary.module.scss"
import FadeIn from "@/components/common/fadeIn";
import QUESTIONS from "@/lib/quiz";

export default function Summary({userAnswers}: any) {
    // Add safety checks
    if (!QUESTIONS || !Array.isArray(QUESTIONS)) {
        console.error('QUESTIONS is not properly imported or is not an array');
        return <div>Error loading quiz questions</div>;
    }

    if (!userAnswers || !Array.isArray(userAnswers)) {
        console.error('userAnswers is not an array');
        return <div>Error loading user answers</div>;
    }

    const skippedAnswers = userAnswers.filter((answer: any) => answer === null);
    const correctAnswers = userAnswers.filter((answer: any, i: any) => {
        // Add bounds checking
        if (i >= QUESTIONS.length || !QUESTIONS[i] || !QUESTIONS[i].answers) {
            console.warn(`Question at index ${i} is missing or malformed`);
            return false;
        }
        return answer === QUESTIONS[i].answers[0];
    });
    
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
                    // Add bounds checking for QUESTIONS array
                    if (i >= QUESTIONS.length || !QUESTIONS[i]) {
                        console.warn(`Question at index ${i} is missing`);
                        return null; // Skip this item
                    }

                    const question = QUESTIONS[i];
                    if (!question.answers || question.answers.length === 0) {
                        console.warn(`Question at index ${i} has no answers`);
                        return null; // Skip this item
                    }

                    let cssClass = styles.userAnswer;
                    let showCorrectAnswer = "";
                    const correctAnswer = question.answers[0];

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
                                <h4 className={styles.question}>{question.text || 'Question text missing'}</h4>
                                <p className={`${styles.userAnswer} ${cssClass}`}>{answer ?? 'Skipped'}</p>
                                {answer !== correctAnswer ? <p className={`${styles.questionAnswer} ${cssClass}`}>Correct antwoord: {showCorrectAnswer}</p> : null}
                            </FadeIn>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}