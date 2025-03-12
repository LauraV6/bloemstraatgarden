"use client"

import styles from "./timer.module.scss"
import stylesQuestion from "./question.module.scss";
import { useEffect, useState } from "react";
import FadeIn from "../fadeIn";

export default function QuestionTimer({ timeout, onTimeout, mode }: any) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime: number) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className={styles.quiz__timer}>
        {(() => {
          const seconds = remainingTime / 1000;
          const roundTimer = Math.round(seconds);
          if (mode === stylesQuestion.wrong) {
            return <FadeIn><h3 className={mode}>Fout antwoord</h3></FadeIn>
          } else if (mode === stylesQuestion.correct) {
            return <FadeIn><h3 className={mode}>Correct!</h3></FadeIn>
          } else {
            return <h3>{roundTimer}</h3>
          }
        })()}
        <progress max={timeout} value={remainingTime} className={mode}></progress>
      </div>
    </>
  )
}