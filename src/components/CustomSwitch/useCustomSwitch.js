import { useState } from "react";

const useCustomSwitch = ({ filterByAlcoholicHandler }) => {
  const [filterAlcohol, setFilterAlcohol] = useState("non_alcoholic");

  const changeSwitch = () => {
    setTimeout(() => {
      if (filterAlcohol === "non_alcoholic") {
        setFilterAlcohol("alcoholic");
        filterByAlcoholicHandler("Alcoholic");
      } else {
        setFilterAlcohol("non_alcoholic");
        filterByAlcoholicHandler("Non_Alcoholic");
      }
    }, 500);
  };

  return { changeSwitch, filterAlcohol };
};

export default useCustomSwitch;
