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

    return (
      <>
          <div className='quiz-timer'>
            <progress max={timeout} value={remainingTime} className={mode}></progress>
          </div>
      </>
    )
}

export default QuestionTimer