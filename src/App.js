import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DrinkPage from "./pages/DrinkPage/DrinkPage";
import Home from "./pages/Home/Home";
import { ContextDrinkId } from "./context/drinkIdContext";
import { UrlFilter } from "./context/urlFilter";

import "./styles/global.css";

const App = () => {
  const [DrinkId, setDrinkId] = useState(
    localStorage.getItem("selectedDrinkID")
      ? localStorage.getItem("selectedDrinkID")
      : 0
  );

  const [urlFilter, setUrlFilter] = useState("");

  return (
    <ContextDrinkId.Provider value={{ DrinkId, setDrinkId }}>
      <UrlFilter.Provider value={{ urlFilter, setUrlFilter }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="drinks/:name" element={<DrinkPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </UrlFilter.Provider>
    </ContextDrinkId.Provider>
  );
};

export default App;
