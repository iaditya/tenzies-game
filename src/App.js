import React from "react";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import TimeCounter from "./components/TimeCounter";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [score, setScore] = React.useState({
    best: JSON.parse(localStorage.getItem("HIGH_SCORE")) || 100,
    current: 0,
    rolls: 0,
  });

  React.useEffect(() => {
    if (!gameStarted && dice.some((d) => d.isHeld)) setGameStarted(true);

    const firstVal = dice[0].value;
    const allHeldAndSame = dice.every(
      (d) => !!d.isHeld && d.value === firstVal
    );
    if (!!allHeldAndSame) {
      setTenzies(true);
      setGameStarted(false);
    }
  }, [dice, gameStarted]);

  function generateNewDie() {
    return {
      isHeld: false,
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
    };
  }

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setScore((prevState) => ({ ...prevState, rolls: ++prevState.rolls }));
      setDice((oldDice) => {
        return oldDice.map((dice) => {
          return !!dice.isHeld ? dice : generateNewDie();
        });
      });
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setScore((prevScore) => {
        return { ...prevScore, current: 0, rolls: 0 };
      });
    }
  }

  function holdDice(d) {
    const anyHeld = dice.find((d) => d.isHeld);

    if (anyHeld && anyHeld.value !== d.value) {
      console.log(anyHeld);
      console.log(d.value);
      alert("Make sure you choose the same number dice.");
      return;
    }
    setDice((oldDice) =>
      oldDice.map((dice) =>
        dice.id === d.id ? { ...dice, isHeld: true } : dice
      )
    );
  }

  const diceElements = dice.map((d, i) => {
    return <Dice key={i} dice={d} holdDice={() => holdDice(d)} />;
  });

  return (
    <main>
      {!!tenzies && <Confetti />}
      <h1 className="title">Tenzies </h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <TimeCounter
        gameStarted={gameStarted}
        score={score}
        setScore={setScore}
      />
      <div className="dice-container">{diceElements}</div>
      <button className="btn" onClick={rollDice}>
        {!tenzies ? "Roll" : "New Game"}
      </button>
    </main>
  );
}

export default App;
