import { useEffect, useState, useContext } from "react";

import { ContextDrinkId } from "../../context/drinkIdContext";
import useFetch from "../../hooks/useFetch.js";

const useDrinkPage = () => {
  const { DrinkId, setDrinkId } = useContext(ContextDrinkId);
  const [drinkLink, setDrinkLink] = useState("");
  const [selectedDrinkInfo, setSelectedDrinkInfo] = useState(null);
  const fetchedDataByCategory = useFetch(drinkLink, "FETCH_DETAILS");

  const basicLink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

  useEffect(() => {
    //set link to fetch data
    setDrinkLink(basicLink + DrinkId);

    //set state-drink info
    if (fetchedDataByCategory) setSelectedDrinkInfo(fetchedDataByCategory);

    document.documentElement.scrollTo(0, 0);
  }, [DrinkId, fetchedDataByCategory]);

  return { selectedDrinkInfo };
};

export default useDrinkPage;
