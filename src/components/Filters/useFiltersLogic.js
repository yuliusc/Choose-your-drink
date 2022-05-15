import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useFetch from "../../hooks/useFetch.js";
import { FetchedDrinks } from "../../context/fetchedDrinks";

const useFiltersLogic = () => {
  const { fetchedDrinks, setFetchedDrinks } = useContext(FetchedDrinks);

  const basicLink = "https://www.thecocktaildb.com/api/json/v1/1/";
  const searchByAlc = "filter.php?a=";
  const searchByIngredient = "filter.php?i=";

  const [apiLink, setApiLink] = useState();

  const fetchedDataByFilter = useFetch(apiLink, "FETCH_DRINKS");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const onDrinkPage = location.pathname.includes("/drinks") ? "drinkPage" : "";

  const checkQueryParams = useCallback(() => {
    //searching by ingredient
    console.log(queryParams);
    console.log("checkQueryParams");
    if (queryParams.get("i")) {
      getDrinksByIngredientHandler(queryParams.get("i"));
    }

    //searching by alcoholic/non alcoholic
    else if (queryParams.get("filter")) {
      filterByAlcoholicHandler(queryParams.get("filter"));
    }
  }, []);

  const filterByAlcoholicHandler = (details) => {
    setApiLink(basicLink + searchByAlc + details);
    navigate(`/?filter=${details}`);
  };

  const getDrinksByIngredientHandler = (ingredient) => {
    navigate(`/?i=${ingredient}`);
    setApiLink(basicLink + searchByIngredient + ingredient);
  };

  const filterDrinks = useCallback(() => {
    if (location.pathname.includes("/drinks")) {
      setFetchedDrinks(fetchedDrinks);
    } else if (location.pathname === "/") {
      if (!fetchedDrinks.length) {
        setFetchedDrinks(fetchedDataByFilter);
      } else if (fetchedDrinks.length) {
        setFetchedDrinks(fetchedDataByFilter);
      } else {
        setFetchedDrinks(fetchedDrinks);
      }
    }
  }, [fetchedDataByFilter, fetchedDrinks, location.pathname, setFetchedDrinks]);

  useEffect(() => {
    if (!fetchedDrinks.length && !fetchedDataByFilter) {
      setApiLink(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
      );
    }

    // z tym nie działa, z ifami działa
    // checkQueryParams();

    // if (fetchedDataByFilter) {
    //   filterDrinks();
    // }

    if (location.pathname.includes("/drinks")) {
      console.log("hello");
      checkQueryParams();

      if (fetchedDataByFilter) {
        filterDrinks();
      }
    } else {
      if (fetchedDataByFilter) {
        filterDrinks();
      }
    }
  }, [
    checkQueryParams,
    fetchedDataByFilter,
    filterDrinks,
    location.pathname,
    fetchedDrinks.length,
  ]);

  return {
    onDrinkPage,
    filterByAlcoholicHandler,
    getDrinksByIngredientHandler,
  };
};

export default useFiltersLogic;
