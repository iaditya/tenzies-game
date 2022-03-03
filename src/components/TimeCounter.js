import React, { useEffect, useRef } from "react";

export default function TimeCounter({ gameStarted, score, setScore }) {
  const [sec, setTime] = React.useState(0);
  let timerId = useRef(null);

  useEffect(() => {
    console.log("useEffect", gameStarted);
    if (gameStarted) {
      if (timerId.current) return;
      console.log("started");
      let timer = setInterval(() => {
        setTime((prevTime) => ++prevTime);
      }, 1000);
      timerId.current = timer;
    } else {
      // stopCounter();
      if (timerId.current === null || sec === 0) return;
      console.log("timerId ", timerId.current);
      console.log("currennt sec ", sec);
      setScore((prevScore) => {
        let best = sec < prevScore.best ? sec : prevScore.best;
        localStorage.setItem("HIGH_SCORE", JSON.stringify(best));
        return { ...prevScore, current: sec, best: best };
      });
      setTime(0);
      clearInterval(timerId.current);
    }
  }, [gameStarted, setScore, sec]);

  return (
    <div className="score-card">
      <div className="score">
        Best &#8594; <span>{score.best}</span>
      </div>
      <div className="score">
        Total Roll &#8594; <span>{score.rolls}</span>
      </div>

      {score.current ? (
        <div className="score">
          Score &#8594; <span>{score.current}</span>
        </div>
      ) : (
        <div className="score">
          Timer &#8594; <span>{sec}</span>
        </div>
      )}
    </div>
  );
}
