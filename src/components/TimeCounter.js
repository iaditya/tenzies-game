import React, { useEffect } from "react";

export default function TimeCounter({ gameStarted, score, setScore }) {
  const [sec, setTime] = React.useState(0);
  let [timerId, setTimerId] = React.useState(null);

  useEffect(() => {
    console.log("useEffect", gameStarted);
    if (gameStarted) {
      console.log("started");
      startCounter();
    } else {
      stopCounter();
    }
  }, [gameStarted]);

  function startCounter() {
    let timer = setInterval(() => {
      setTime((prevTime) => ++prevTime);
    }, 1000);
    setTimerId(timer);
  }

  function stopCounter() {
    if (!timerId) return;
    console.log("timerId ", timerId);
    setScore((prevScore) => {
      let best = sec < prevScore.best ? sec : prevScore.best;
      localStorage.setItem("HIGH_SCORE", JSON.stringify(best));
      return { ...prevScore, current: sec, best: best };
    });
    setTime(0);
    clearInterval(timerId);
  }

  return (
    <div className="score-card">
      <div className="score">
        Best &#8594; <span>{score.best}</span>
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
