"use client"

import styles from "./timer.module.scss"
import stylesQuestion from "./question.module.scss";
import { useEffect, useState } from "react";
import FadeIn from "@/components/common/FadeIn";

interface QuestionTimerProps {
  timeout: number;
  onTimeout: () => void;
  mode?: string;
}

export default function QuestionTimer({ timeout, onTimeout, mode }: QuestionTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // Add input validation
  const validTimeout = typeof timeout === 'number' && timeout > 0 ? timeout : 15000;

  useEffect(() => {
    // Reset remaining time when timeout changes
    setRemainingTime(validTimeout);
  }, [validTimeout]);

  useEffect(() => {
    // Only set timeout if onTimeout is a function and timeout is valid
    if (typeof onTimeout !== 'function' || validTimeout <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      onTimeout();
    }, validTimeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, validTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime: number) => {
        const newTime = prevRemainingTime - 100;
        // Prevent negative values
        return Math.max(0, newTime);
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [validTimeout]); // Add validTimeout as dependency to restart interval when timeout changes

  // Calculate display values safely
  const seconds = Math.max(0, remainingTime) / 1000;
  const roundTimer = Math.max(0, Math.ceil(seconds)); // Use ceil instead of round for better UX
  const progressValue = Math.max(0, Math.min(remainingTime, validTimeout)); // Clamp between 0 and timeout

  return (
    <>
      <div className={styles.quiz__timer}>
        {(() => {
          // Add safety checks for mode comparison
          if (mode && mode === stylesQuestion.wrong) {
            return <FadeIn><h3 className={mode}>Fout antwoord</h3></FadeIn>
          } else if (mode && mode === stylesQuestion.correct) {
            return <FadeIn><h3 className={mode}>Correct!</h3></FadeIn>
          } else {
            return <h3>{roundTimer}</h3>
          }
        })()}
        <progress 
          max={validTimeout} 
          value={progressValue} 
          className={mode || ''}
        />
      </div>
    </>
  )
}