import { useEffect, useState, useContext } from "react";

import { ContextDrinkId } from "../../context/drinkIdContext";
import useFetch from "../../hooks/useFetch.js";
import Filters from "../Filters/Filters";
import { FetchedDrinks } from "../../context/fetchedDrinks";

import "./DrinkPage.css";

import gifAnimation from "../../assets/gifs/hennessy-hennessy-first-moments.gif";

const DrinkPage = () => {
  const { fetchedDrinks, setFetchedDrinks } = useContext(FetchedDrinks);
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

  useEffect(() => {}, [fetchedDrinks]);

  return (
    <>
      {selectedDrinkInfo ? (
        <div className="drinkContainer">
          <div
            className="drinkContainer__top"
            style={{ backgroundImage: `url(${selectedDrinkInfo.imageSrc})` }}
          >
            <h1 className="drinkContainer__name">{selectedDrinkInfo.drink}</h1>
          </div>

          <div className="drinkContainer__description">
            <div className="drinkContainer__block">
              <p className="drinkContainer__block--type">Drink type </p>
              <p className="drinkContainer__block--info">
                {selectedDrinkInfo.alcoholic}
              </p>
            </div>
            <div className="drinkContainer__block">
              <p className="drinkContainer__block--type">Category</p>
              <p className="drinkContainer__block--info">
                {selectedDrinkInfo.category}
              </p>
            </div>

            <div className="drinkContainer__block">
              <p className="drinkContainer__block--type">Glass</p>
              <p className="drinkContainer__block--info">
                {selectedDrinkInfo.glass}
              </p>
            </div>
          </div>

          <div className="instructions">
            <div className="frame ingredients">
              <h2 className="frame__text">You need:</h2>

              <div className="productsFrame">
                <table className="productsFrame__table" cellSpacing="0">
                  <tbody>
                    {selectedDrinkInfo.ingredients.map((e, i) => {
                      return (
                        <tr key={e + Math.random()}>
                          <td className="productsFrame__cell productsFrame__cell--left">
                            {e}
                          </td>
                          <td className="productsFrame__cell productsFrame__cell--right">
                            {selectedDrinkInfo.measures[i]}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="frame steps">
              <h2 className="frame__text">Steps:</h2>
              {selectedDrinkInfo.instructions}
            </div>
          </div>

          <div className="drinkContainer__bottom bottomCont">
            <div className="bottomCont__left">
              <h1>See more</h1>
              <Filters />
            </div>

            <div className="bottomCont__right">
              <div className="bottomCont__gradientCont--outer">
                <div className="bottomCont__gradientCont--inner">
                  <img src={gifAnimation} alt="Drink Animation" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DrinkPage;
