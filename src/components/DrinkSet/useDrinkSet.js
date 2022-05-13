import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const useDrinkSet = () => {
  const basicUrlFilter =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=";
  const basicUrlIngredient =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

  const [urlToFetch, setUrlToFetch] = useState("");
  const [drinks, setDrinks] = useState(null);
  const [filterText, setFilterText] = useState("");

  const fetchedDrinks = useFetch(urlToFetch, "FETCH_DRINKS");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (urlToFetch == "")
      //display non alcoholic drinks as default
      setUrlToFetch(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
      );
  }, [fetchedDrinks]);

  //   useEffect(() => {
  //

  //     if (fetchedDrinks) {
  //       setFetchedDrinks(fetchedDrinks);
  //       setDrinks(fetchedDrinks);
  //     } else {
  //       setDrinks(fetchedDrinks);
  //     }
  //   }, [fetchedDrinks, setFetchedDrinks]);

  //   useEffect(() => {
  //     if (!filterText) {
  //       setFilterText("Non Alcoholic");
  //     } else {
  //       if (queryParams.get("i")) {
  //         setFilterText(queryParams.get("i").split("_").join(" "));
  //       } else if (queryParams.get("filter")) {
  //         setFilterText(queryParams.get("filter").split("_").join(" "));
  //       }
  //     }
  //   }, [filterText, queryParams]);

  //   const [selectedDrink, setSelectedDrink] = useState({});
  //   const [selectedCategory, setSelectedCategory] = useState("");

  //   const displayDetails = (details) => {
  //     let temp1 = details[0];
  //     setSelectedDrink(temp1);
  //     setSelectedCategory(details[0].category);
  //   };

  return { fetchedDrinks };
};

export default useDrinkSet;
