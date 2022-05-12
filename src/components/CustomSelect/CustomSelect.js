import { useState, useRef, useEffect } from "react";

import useFetch from "../../hooks/useFetch.js";

import "./select.css";

const Select = (props) => {
  const { getDrinksByIngredientHandler } = props;

  const ingredientsLink =
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsSelected, setIngredientsSelected] = useState([]);
  const [chosenIngredients, setchosenIngredients] = useState([]);
  const [inputText, setInputText] = useState("");
  const [displayChosenIngredients, setDisplayChosenIngredients] =
    useState(false);

  const fetchedCategories = useFetch(ingredientsLink, "CATEGORIES");

  const inputValue = useRef();

  const filterIngredients = () => {
    let enteredText = inputValue.current.value.split(" ").join(" ");

    if (enteredText.length > 0) {
      setDisplayChosenIngredients(true);
      let temp = [];
      ingredients.forEach((i) => {
        if (i.toLowerCase().includes(enteredText.toLowerCase())) {
          temp.push(i);
        }
      });
      setchosenIngredients(temp);
    } else {
      setDisplayChosenIngredients(false);
      setchosenIngredients([]);
    }
    setInputText(enteredText);
  };

  const onBlurSearch = () => {
    setchosenIngredients([]);
    setDisplayChosenIngredients(false);
  };
  const getDrinksByIngHandler = (e) => {
    getDrinksByIngredientHandler(e.target.textContent.split(" ").join("_"));
    setInputText("");
    setDisplayChosenIngredients(false);
  };

  useEffect(() => {
    setIngredients(fetchedCategories);
    setIngredientsSelected(fetchedCategories);
  }, [fetchedCategories]);

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
