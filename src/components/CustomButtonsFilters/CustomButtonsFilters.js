import "./customButtonsFilters.css";

import alcoholic_icon from "../../assets/img/alcoholic icon.png";
import non_alcoholic_icon from "../../assets/img/non_alcoholic icon.png";

const CustomSwitch = ({ filterByAlcoholicHandler }) => {
  const changeSwitch = (details) => {
    filterByAlcoholicHandler(details);
  };

  return (
    <div className="customButtons">
      <button
        className="customButton"
        onClick={() => changeSwitch("Non_Alcoholic")}
      >
        <img
          src={non_alcoholic_icon}
          className="customButton__image"
          alt="non alcohlic icon"
          width="40"
          height="40"
        />
        Non alcoholic
      </button>

      <button
        className="customButton"
        onClick={() => changeSwitch("Alcoholic")}
      >
        <img
          src={alcoholic_icon}
          className="customButton__image"
          alt="alcohlic icon"
          width="40"
          height="40"
        />
        Alcoholic
      </button>
    </div>
  );
};

export default CustomSwitch;
