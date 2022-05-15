import Drink from "../Drink/Drink";
import "./drinks.css";

const DrinkSet = ({ drinks }) => {
  return (
    <>
      <div className={"drinksCont"}>
        {drinks.map((d) => {
          return <Drink key={d.id} name={d.name} id={d.id} src={d.src}></Drink>;
        })}
      </div>
      {drinks.length === 0 ? (
        <p className="drinkPage__noDrinksFound">
          No drinks found. Use filters to find perfect drink.
        </p>
      ) : null}
    </>
  );
};

export default DrinkSet;
