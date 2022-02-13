export default function Dice({ dice, holdDice }) {
  return (
    <div className={!!dice.isHeld ? "dice active" : "dice"} onClick={holdDice}>
      <h2 className={!!dice.isHeld ? "dice-num active" : "dice-num"}>
        {dice.value}
      </h2>
    </div>
  );
}
