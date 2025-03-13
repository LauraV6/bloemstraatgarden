"use client";

import { useEffect, useState } from "react";
import styles from "./answers.module.scss"

export default function Answers({ answers, selectedAnswer, answerState, onSelect }: any) {
    const [allAnswers, setAllAnswers] = useState([]);

    useEffect(() => {
        const shuffledArray = shuffle([...answers]);
        setAllAnswers(shuffledArray);
    }, [...answers]);

    function shuffle(array: any): any {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffledArray[i];
            shuffledArray[i] = shuffledArray[j];
            shuffledArray[j] = temp;
        }
        return shuffledArray;
    }

    return (
        <ul className={styles.quiz__answers}>
            {allAnswers.map((answer: any) => {
                const isSelected = selectedAnswer === answer;
                let cssClass = '';

                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
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