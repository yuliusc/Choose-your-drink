import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import Filters from "../../components/Filters/Filters";
import { FetchedDrinks } from "../../context/fetchedDrinks";
import DrinkSet from "../../components/DrinkSet/DrinkSet";

import "./home.css";

import homePageGif from "../../assets/gifs/joinesgifimage-3473372.gif";

const Home = () => {
  const { fetchedDrinks, setFetchedDrinks } = useContext(FetchedDrinks);
  const [drinks, setDrinks] = useState(null);
  const [filterText, setFilterText] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (fetchedDrinks) {
      setFetchedDrinks(fetchedDrinks);
      setDrinks(fetchedDrinks);
    } else {
      setDrinks(fetchedDrinks);
    }
  }, [fetchedDrinks, setFetchedDrinks]);

  useEffect(() => {
    if (!filterText) {
      setFilterText("Non Alcoholic");
    } else {
      if (queryParams.get("i")) {
        setFilterText(queryParams.get("i").split("_").join(" "));
      } else if (queryParams.get("filter")) {
        setFilterText(queryParams.get("filter").split("_").join(" "));
      }
    }
  }, [filterText, queryParams]);

  return (
    <div className="home">
      <div className="welcome">
        <div className="main">
          <h1 className={"main__title"}>Choose your drink</h1>
          <div className="main__drinks">
            <img src={homePageGif} alt="Gif" width="300px" height="324" />
          </div>
        </div>
      </div>
      <div className="content">
        {drinks ? (
          <>
            <Filters />

            <p className="content__filterInfo">Filtered by: {filterText}</p>

            <DrinkSet drinks={drinks} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
