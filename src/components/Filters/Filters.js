import { useLocation } from "react-router-dom";

import Select from "../CustomSelect/CustomSelect";
import Switch from "../CustomSwitch/CustomSwitch";
import ButtonsFilters from "../CustomButtonsFilters/CustomButtonsFilters";
import useFiltersLogic from "./useFiltersLogic";

import "./filters.css";

const Filters = () => {
  const {
    onDrinkPage,
    filterByAlcoholicHandler,
    getDrinksByIngredientHandler,
  } = useFiltersLogic();

  const location = useLocation();

  return (
    <div className={"filtersCont " + onDrinkPage}>
      {location.pathname.includes("/drinks") ? (
        <ButtonsFilters filterByAlcoholicHandler={filterByAlcoholicHandler} />
      ) : (
        <Switch filterByAlcoholicHandler={filterByAlcoholicHandler} />
      )}

      <Select getDrinksByIngredientHandler={getDrinksByIngredientHandler} />
    </div>
  );
};

export default Filters;
