import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextDrinkId } from "../../context/drinkIdContext";

const useDrink = ({ name, id }) => {
  let navigate = useNavigate();
  const { DrinkId, setDrinkId } = useContext(ContextDrinkId);

  const displayDetailsHandler = () => {
    setDrinkId(id);
    localStorage.setItem("selectedDrinkID", id);
    navigate(`/drinks/${name.replaceAll(" ", "_")}`);
  };

  return { displayDetailsHandler };
};

export default useDrink;
