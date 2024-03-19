import React from 'react'
import { useState, useEffect } from "react";

const QuestionTimer = ({timeout, onTimeout, mode}) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
      console.log("SETTING TIMEOUT");
      const timer = setTimeout(onTimeout, timeout);
  
      return () => {
        clearTimeout(timer);
      };
    }, [onTimeout, timeout]);
  
    useEffect(() => {
      console.log("SETTING INTERVAL");
      const interval = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
      }, 100);
  
      return () => {
        clearInterval(interval);
      };
    }, []);

    return <progress max={timeout} value={remainingTime} className={mode}></progress>
}

export default QuestionTimer