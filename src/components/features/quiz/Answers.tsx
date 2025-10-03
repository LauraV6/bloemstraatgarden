"use client";

import { useEffect, useState } from "react";
import { AnswersList, AnswerButton } from "./Answers.styled";

interface AnswersProps {
  answers: string[];
  selectedAnswer: string | null;
  answerState: string;
  onSelect: (answer: string) => void;
}

export default function Answers({ answers, selectedAnswer, answerState, onSelect }: AnswersProps) {
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
        const validAnswers = answers.filter((answer) => answer !== null && answer !== undefined);
        
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

    function shuffle<T>(array: T[]): T[] {
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
        <AnswersList>
            {allAnswers.map((answer, index) => {
                // Add safety check for each answer
                if (answer === null || answer === undefined) {
                    return null;
                }

                const isSelected = selectedAnswer === answer;
                let cssClass = '';

                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }

                return (
                    <li key={`${answer}-${index}`}>
                        <AnswerButton 
                            onClick={() => onSelect && onSelect(answer)} 
                            className={`button button--cta ${cssClass}`} 
                            disabled={answerState !== ''}
                        >
                            <span>{String(answer)}</span>
                        </AnswerButton>
                    </li>
                );
            })}
        </AnswersList>
    )
}