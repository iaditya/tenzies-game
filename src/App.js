import React from "react";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = React.useState(allNewDice());

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
    setDice((oldDice) => {
      return oldDice.map((dice) => {
        return !!dice.isHeld ? dice : generateNewDie();
      });
    });
  }

  function holdDice(dId) {
    setDice((oldDice) =>
      oldDice.map((dice) =>
        dice.id === dId ? { ...dice, isHeld: true } : dice
      )
    );
  }

  const diceElements = dice.map((d, i) => {
    return <Dice key={i} dice={d} holdDice={() => holdDice(d.id)} />;
  });

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="btn" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
