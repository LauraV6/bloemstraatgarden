import styles from "./answers.module.scss"

export default function Answers ({answers, selectedAnswer, answerState, onSelect}: any) {
    return (
        <ul className={styles.quiz__answers}>
            {answers.map((answer: any) => {
                const isSelected = selectedAnswer === answer;
                let cssClass = '';
                
                if((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }

                return (
                    <li key={answer} className={styles.answer}>
                        <button onClick={() => onSelect(answer)} className={`button button--cta ${cssClass}`} disabled={answerState !== ''}>{answer}</button>
                    </li>
                );
            })}
        </ul>
    )
}