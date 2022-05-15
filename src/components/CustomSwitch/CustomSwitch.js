import "./customSwitch.css";

import alcoholic_icon from "../../assets/img/alcoholic icon.png";
import non_alcoholic_icon from "../../assets/img/non_alcoholic icon.png";

import useCustomSwitch from "./useCustomSwitch";

const CustomSwitch = ({ filterByAlcoholicHandler }) => {
  const { changeSwitch, filterAlcohol } = useCustomSwitch({
    filterByAlcoholicHandler,
  });

  return (
    <div className={"customSwitch " + filterAlcohol} onClick={changeSwitch}>
      <div className={"toggle " + filterAlcohol}>
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
