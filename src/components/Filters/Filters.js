import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Select from "../CustomSelect/CustomSelect";
import Switch from "../CustomSwitch/CustomSwitch";
import ButtonsFilters from "../CustomButtonsFilters/CustomButtonsFilters";
import useFetch from "../../hooks/useFetch.js";

import { FetchedDrinks } from "../../context/fetchedDrinks";

import "./filters.css";

const Filters = () => {
  const { fetchedDrinks, setFetchedDrinks } = useContext(FetchedDrinks);

  const basicLink = "https://www.thecocktaildb.com/api/json/v1/1/";
  const searchByAlc = "filter.php?a=";
  const searchByIngredient = "filter.php?i=";

  const [apiLink, setApiLink] = useState();
  const [redirect, setRedirect] = useState(false);
  const [isAlcoholicSwitch, setIsAlcoholicSwitch] = useState();

  const fetchedDataByFilter = useFetch(apiLink, "FETCH_DRINKS");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const onDrinkPage = location.pathname.includes("/drinks") ? "drinkPage" : "";

  const checkQueryParams = () => {
    //searching by ingredient
    if (queryParams.get("i")) {
      getDrinksByIngredientHandler(queryParams.get("i"));
    }

    //searching by alcoholic/non alcoholic
    else if (queryParams.get("filter")) {
      filterByAlcoholicHandler(queryParams.get("filter"));
    }
  };

  const filterByAlcoholicHandler = (details) => {
    setApiLink(basicLink + searchByAlc + details);
    setIsAlcoholicSwitch(details);
    navigate(`/?filter=${details}`);
  };

  const getDrinksByIngredientHandler = (ingredient) => {
    navigate(`/?i=${ingredient}`);
    setApiLink(basicLink + searchByIngredient + ingredient);
  };

  const filterDrinks = () => {
    if (location.pathname.includes("/drinks")) {
      setFetchedDrinks(fetchedDrinks);
      setRedirect(true);
    } else if (location.pathname === "/") {
      if (!fetchedDrinks.length) {
        setFetchedDrinks(fetchedDataByFilter);
      } else if (fetchedDrinks.length) {
        setFetchedDrinks(fetchedDataByFilter);
      } else {
        setFetchedDrinks(fetchedDrinks);
      }
    }
  };

  useEffect(() => {
    if (!fetchedDrinks.length && !fetchedDataByFilter) {
      setApiLink(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
      );
    }

    if (location.pathname.includes("/drinks")) {
      if (fetchedDataByFilter) {
        setRedirect(true);
        if (redirect) {
          checkQueryParams();
          filterDrinks();
        }
      }
    } else if (location.pathname === "/") {
      checkQueryParams();
      if (fetchedDataByFilter) {
        filterDrinks();
      }
    }

    return () => {
      setRedirect(false);
    };
  }, [fetchedDataByFilter]);

  return (
    <div className={"filtersCont " + onDrinkPage}>
      {location.pathname.includes("/drinks") ? (
        <ButtonsFilters filterByAlcoholicHandler={filterByAlcoholicHandler} />
      ) : (
        <Switch
          filterByAlcoholicHandler={filterByAlcoholicHandler}
          isAlcoholicSwitch={isAlcoholicSwitch}
        />
      )}

      <Select getDrinksByIngredientHandler={getDrinksByIngredientHandler} />
    </div>
  );
};

export default Filters;
