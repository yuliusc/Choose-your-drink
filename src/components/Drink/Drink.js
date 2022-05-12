import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ContextDrinkId } from "../../context/drinkIdContext";

import "./drink.css";

const Drink = (props) => {
  const { name, id, src } = props;
  let navigate = useNavigate();
  const { DrinkId, setDrinkId } = useContext(ContextDrinkId);

  const displayDetailsHandler = () => {
    setDrinkId(id);
    localStorage.setItem("selectedDrinkID", id);
    navigate(`/drinks/${name.replaceAll(" ", "_")}`);
  };

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
