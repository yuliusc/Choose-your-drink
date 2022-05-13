import Drink from "../Drink/Drink";
import useDrinkSet from "./useDrinkSet";

import "./drinks.css";
import useFetch from "../../hooks/useFetch";

const DrinkSet = () => {
  const fetchedDrinks = useDrinkSet();
  let drinks = fetchedDrinks.fetchedDrinks;

  return (
    <>
      <div className={"drinksCont"}>
        {fetchedDrinks.fetchedDrinks &&
          drinks.map((d) => {
            return (
              <Drink
                key={d.id + Math.random()}
                name={d.name}
                id={d.id}
                src={d.src}
              ></Drink>
            );
          })}
      </div>
      {/* {!fetchedDrinks.fetchedDrinks ? (
        <p className="drinkPage__noDrinksFound">
          No drinks found. Use filters to find perfect drink.
        </p>
      ) : null} */}
    </>
  );
};

export default DrinkSet;
