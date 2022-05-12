import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DrinkPage from "./components/DrinkPage/DrinkPage";
import Home from "./components/Home/Home";
import { ContextDrinkId } from "./context/drinkIdContext";
import { FetchedDrinks } from "./context/fetchedDrinks";

import "./styles/global.css";

const App = () => {
  const [DrinkId, setDrinkId] = useState(
    localStorage.getItem("selectedDrinkID")
      ? localStorage.getItem("selectedDrinkID")
      : 0
  );

  const [fetchedDrinks, setFetchedDrinks] = useState([]);

  return (
    <ContextDrinkId.Provider value={{ DrinkId, setDrinkId }}>
      <FetchedDrinks.Provider value={{ fetchedDrinks, setFetchedDrinks }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="drinks/:name" element={<DrinkPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </FetchedDrinks.Provider>
    </ContextDrinkId.Provider>
  );
};

export default App;
