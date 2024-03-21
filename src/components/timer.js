import React from 'react'
import { useState, useEffect } from "react";

const QuestionTimer = ({timeout, onTimeout, mode}) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
      const timer = setTimeout(onTimeout, timeout);
  
      return () => {
        clearTimeout(timer);
      };
    }, [onTimeout, timeout]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
      }, 100);
  
      return () => {
        clearInterval(interval);
      };
    }, []);

    const seconds = remainingTime / 1000;
    const roundTimer = Math.round(seconds);

    return (
      <>
          <div className='quiz-timer'>
            {(() => {
              if(mode === "wrong") {
                return <h3 className={mode}>Fout antwoord</h3>
              } else if (mode === "correct") {
                return <h3 className={mode}>Correct!</h3>
              } else {
                return <h3>{roundTimer}</h3>
              }
            })()}
            <progress max={timeout} value={remainingTime} className={mode}></progress>
          </div>
      </>
    )
}

export default QuestionTimer