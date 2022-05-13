import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ContextDrinkId } from "../../context/drinkIdContext";

import useDrink from "./useDrink";

import "./drink.css";

const Drink = ({ name, id, src }) => {
  const { displayDetailsHandler } = useDrink({ name, id });

  return (
    <>
      <div className={"drink"} onClick={displayDetailsHandler}>
        <img src={src} className={"drink__img"} alt={name} loading="lazy"></img>
        <div className={"drink__info"}>
          <p className={"drink__name"}>{name}</p>
        </div>
      </div>
    </>
  );
};

export default Drink;
