import React from "react";
import Dice from "./components/Dice";

function App() {
  const [dice, setDice] = React.useState(() => allNewDice());

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  const dices = dice.map((d, i) => <Dice key={i} val={d} />);

  return (
    <main>
      <div className="dice-container">{dices}</div>
    </main>
  );
}

export default App;
