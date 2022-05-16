import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";

import useFetch from "../../hooks/useFetch.js";
import { FetchedDrinks } from "../../context/fetchedDrinks";

const useFiltersLogic = () => {
  const { fetchedDrinks, setFetchedDrinks } = useContext(FetchedDrinks);

  const basicLink = "https://www.thecocktaildb.com/api/json/v1/1/";
  const searchByAlc = "filter.php?a=";
  const searchByIngredient = "filter.php?i=";

  const [apiLink, setApiLink] = useState();

  const fetchedDataByFilter = useFetch(apiLink, "FETCH_DRINKS");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const onDrinkPage = location.pathname.includes("/drinks") ? "drinkPage" : "";

  const filterDrinks = () => {
    if (location.pathname.includes("/drinks")) {
      setFetchedDrinks(fetchedDrinks);
    } else if (location.pathname === "/") {
      setFetchedDrinks(fetchedDataByFilter);
    }
  };

  const filterByAlcoholicHandler = (details) => {
    setApiLink(basicLink + searchByAlc + details);
  };

  const getDrinksByIngredientHandler = (ingredient) => {
    setApiLink(basicLink + searchByIngredient + ingredient);
  };

  useEffect(() => {
    //set once before any link is set
    if (!fetchedDataByFilter) {
      setApiLink(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
      );
    } else {
      if (queryParams.get("i")) {
        getDrinksByIngredientHandler(queryParams.get("i"));
      }

      // searching by alcoholic/non alcoholic
      else if (queryParams.get("filter")) {
        filterByAlcoholicHandler(queryParams.get("filter"));
      }
      filterDrinks();
    }
  }, [apiLink, fetchedDataByFilter, location]);

  return {
    onDrinkPage,
  };
};

export default useFiltersLogic;
