import { useState } from "react";

import "./customSwitch.css";

import alcoholic_icon from "../../assets/img/alcoholic icon.png";
import non_alcoholic_icon from "../../assets/img/non_alcoholic icon.png";

const CustomSwitch = (props) => {
  const { filterByAlcoholicHandler, isAlcoholicSwitch } = props;

  const [filterAlcohol, setFilterAlcohol] = useState("non_alcoholic");

  let toggleClass =
    filterAlcohol === "alcoholic" ? " alcoholic" : " non_alcoholic";

  if (isAlcoholicSwitch) {
    toggleClass =
      isAlcoholicSwitch === "Alcoholic" ? " alcoholic" : " non_alcoholic";
  } else {
    toggleClass =
      filterAlcohol === "alcoholic" ? " alcoholic" : " non_alcoholic";
  }

  const changeSwitch = () => {
    if (filterAlcohol === "non_alcoholic") {
      setFilterAlcohol("alcoholic");
    } else {
      setFilterAlcohol("non_alcoholic");
    }
    setTimeout(() => {
      if (filterAlcohol === "non_alcoholic") {
        filterByAlcoholicHandler("Alcoholic");
      } else {
        filterByAlcoholicHandler("Non_Alcoholic");
      }
    }, 500);
  };

  return (
    <div className={"customSwitch" + toggleClass} onClick={changeSwitch}>
      <div className={"toggle" + toggleClass}>
        <img
          src={
            filterAlcohol === "alcoholic" ? alcoholic_icon : non_alcoholic_icon
          }
          alt="icon"
          className="customSwitch__image"
        />
      </div>
    </div>
  );
};

export default CustomSwitch;
