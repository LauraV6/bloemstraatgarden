'use client';

import { SummaryContainer, SummaryStates, Score, ScoreNumber, SummaryAnswers, UserAnswer, QuestionAnswer, QuestionTitle } from "./Summary.styled";
import FadeIn from "@/components/ui/FadeIn";
import QUESTIONS from "@/lib/quiz";

interface SummaryProps {
  userAnswers: (string | null)[];
}

export default function Summary({userAnswers}: SummaryProps) {
    // Add safety checks
    if (!QUESTIONS || !Array.isArray(QUESTIONS)) {
        console.error('QUESTIONS is not properly imported or is not an array');
        return <div>Error loading quiz questions</div>;
    }

    if (!userAnswers || !Array.isArray(userAnswers)) {
        console.error('userAnswers is not an array');
        return <div>Error loading user answers</div>;
    }

    const skippedAnswers = userAnswers.filter((answer) => answer === null);
    const correctAnswers = userAnswers.filter((answer, i) => {
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
        <SummaryContainer>
            <h2>Quiz voltooid!</h2>
            <SummaryStates>
                <FadeIn>
                    <Score>
                        <ScoreNumber>{skippedAnswersShare}%</ScoreNumber>
                        <span>Overgeslagen</span>     
                    </Score>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <Score>
                        <ScoreNumber>{correctAnswersShare}%</ScoreNumber>
                        <span>Correct</span>     
                    </Score>
                </FadeIn>
                <FadeIn delay={0.4}>
                    <Score>
                        <ScoreNumber>{wrongAnswersShare}%</ScoreNumber>
                        <span>Fout</span>
                    </Score>
                </FadeIn>
            </SummaryStates>
            <SummaryAnswers>
                {userAnswers.map((answer, i) => {
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

                    let status: 'correct' | 'wrong' | 'skipped' | undefined;
                    let showCorrectAnswer = "";
                    const correctAnswer = question.answers[0];

                    if (answer === null) {
                        status = 'skipped';
                        showCorrectAnswer = correctAnswer;
                    } else if (answer === correctAnswer) {
                        status = 'correct';
                    } else {
                        status = 'wrong';
                        showCorrectAnswer = correctAnswer;
                    }
                    
                    return (
                        <li key={i}>
                            <FadeIn delay={i * 0.2}>
                                <span>{i + 1}</span>
                                <QuestionTitle>{question.text || 'Question text missing'}</QuestionTitle>
                                <UserAnswer $status={status}>{answer ?? 'Skipped'}</UserAnswer>
                                {answer !== correctAnswer ? <QuestionAnswer>Correct antwoord: {showCorrectAnswer}</QuestionAnswer> : null}
                            </FadeIn>
                        </li>
                    );
                })}
            </SummaryAnswers>
        </SummaryContainer>
    );
}