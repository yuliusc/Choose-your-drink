import useCustomSelect from "./useCustomSelect.js";

import "./select.css";

const Select = () => {
  const {
    filterIngredients,
    getDrinksByIngHandler,
    onBlurSearch,
    inputValue,
    inputText,
    displayChosenIngredients,
    chosenIngredients,
  } = useCustomSelect();

  return (
    <div className={"searchByIng"} onBlur={onBlurSearch}>
      <input
        type={"text"}
        className={"searchByIng__search"}
        placeholder={"Search ingredient"}
        onChange={filterIngredients}
        ref={inputValue}
        value={inputText}
      />
      {displayChosenIngredients ? (
        <div className={"chosenIngredients"}>
          <ul
            className="chosenIngredients__list"
            onMouseDown={getDrinksByIngHandler}
          >
            {chosenIngredients.map((i) => {
              return (
                <li
                  className="chosenIngredients__element"
                  key={i}
                  onClick={getDrinksByIngHandler}
                >
                  {i}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Select;
