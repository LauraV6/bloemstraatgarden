"use client";

import { useEffect, useState } from "react";
import styles from "./answers.module.scss"

export default function Answers({ answers, selectedAnswer, answerState, onSelect }: any) {
    const [allAnswers, setAllAnswers] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Add safety checks for answers array
        if (!answers || !Array.isArray(answers)) {
            console.error('Answers prop is not an array:', answers);
            setAllAnswers([]);
            return;
        }

        // Filter out any null/undefined answers
        const validAnswers = answers.filter((answer: any) => answer !== null && answer !== undefined);
        
        if (validAnswers.length === 0) {
            console.warn('No valid answers found');
            setAllAnswers([]);
            return;
        }

        // Only shuffle after component is mounted to prevent hydration mismatch
        if (isMounted) {
            const shuffledArray = shuffle([...validAnswers]);
            setAllAnswers(shuffledArray);
        } else {
            // Use original order for SSR
            setAllAnswers([...validAnswers]);
        }
    }, [answers, isMounted]);

    function shuffle(array: any[]): any[] {
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }
        
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffledArray[i];
            shuffledArray[i] = shuffledArray[j];
            shuffledArray[j] = temp;
        }
        return shuffledArray;
    }

    // Add safety check for rendering
    if (!allAnswers || allAnswers.length === 0) {
        return <div>Loading answers...</div>;
    }

    return (
        <ul className={styles.quiz__answers}>
            {allAnswers.map((answer: any, index: number) => {
                // Add safety check for each answer
                if (answer === null || answer === undefined) {
                    return null;
                }

                const isSelected = selectedAnswer === answer;
                let cssClass = '';

                if ((answerState === styles.correct || answerState === styles.wrong) && isSelected) {
                    cssClass = answerState;
                }

                return (
                    <li key={`${answer}-${index}`} className={styles.answer}>
                        <button 
                            onClick={() => onSelect && onSelect(answer)} 
                            className={`button button--cta ${cssClass}`} 
                            disabled={answerState !== ''}
                        >
                            {String(answer)}
                        </button>
                    </li>
                );
            })}
        </ul>
    )
}