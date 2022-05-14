import { useState } from "react";

import Drink from "../Drink/Drink";

import "./drinks.css";

const DrinkSet = (props) => {
  const { drinks } = props;

  const [selectedDrink, setSelectedDrink] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  const displayDetails = (details) => {
    let temp1 = details[0];
    setSelectedDrink(temp1);
    setSelectedCategory(details[0].category);
  };

  return (
    <>
      <div className={"drinksCont"}>
        {drinks.map((d) => {
          return (
            <Drink
              key={d.id}
              name={d.name}
              id={d.id}
              src={d.src}
              displayDetails={displayDetails}
            ></Drink>
          );
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
