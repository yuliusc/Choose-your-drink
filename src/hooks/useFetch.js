/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (query, fetchType) => {
  const [fetchedData, setFetchedData] = useState(null);
  useEffect(() => {
    if (!query) return;

    axios
      .get(query)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      })
      .then((response) => {
        if (!response.data) return;

        switch (fetchType) {
          case "FETCH_DETAILS":
            response.data.drinks.forEach((d) => {
              const tempIngredients = [];
              const tempMeasures = [];

              for (let i = 1; i < 15; i++) {
                if (d["strIngredient" + i]) {
                  tempIngredients.push(d["strIngredient" + i]);
                  tempMeasures.push(d["strMeasure" + i]);
                }
              }

              setFetchedData({
                category: d.strCategory,
                alcoholic: d.strAlcoholic,
                glass: d.strGlass,
                drink: d.strDrink,
                instructions: d.strInstructions,
                imageSrc: d.strDrinkThumb,
                ingredients: tempIngredients,
                measures: tempMeasures,
              });
            });
            break;

          case "FETCH_DRINKS":
            let tempDrinks = [];
            response.data.drinks.forEach((d) => {
              tempDrinks.push({
                name: d.strDrink,
                id: d.idDrink,
                src: d.strDrinkThumb,
              });
            });
            setFetchedData(tempDrinks);
            break;

          case "CATEGORIES":
            let categories = [];
            response.data.drinks.forEach((d) => {
              categories.push(d.strIngredient1);
            });
            setFetchedData(categories);
            break;

          default:
            return;
        }
      });
  }, [query]);

  return fetchedData;
};

export default useFetch;
