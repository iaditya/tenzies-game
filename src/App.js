import React from "react";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      let obj = {
        isHeld: false,
        value: Math.ceil(Math.random() * 6),
        id: nanoid(),
      };
      newDice.push(obj);
    }
    return newDice;
  }

  function rollDice() {
    setDice(() => allNewDice());
  }

  function holdDice(dId) {
    setDice((prevState) => {
      return prevState.map((item) => {
        if (item.id === dId) {
          item.isHeld = true;
        }
        return item;
      });
    });
  }

  const diceElements = dice.map((d, i) => {
    return <Dice key={i} dice={d} holdDice={() => holdDice(d.id)} />;
  });

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="btn" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
