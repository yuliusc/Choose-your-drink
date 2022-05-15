import { useState, useRef, useEffect } from "react";

import useFetch from "../../hooks/useFetch.js";

const useCustomSelect = ({ getDrinksByIngredientHandler }) => {
  const ingredientsLink =
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
  const [ingredients, setIngredients] = useState([]);

  // filtered ingredients to display when user enter text in input field
  const [chosenIngredients, setchosenIngredients] = useState([]);
  const [inputText, setInputText] = useState("");
  const [displayChosenIngredients, setDisplayChosenIngredients] =
    useState(false);

  const fetchedCategories = useFetch(ingredientsLink, "CATEGORIES");

  const inputValue = useRef();

  //filter ingredients by entered text in input
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
    }
    setInputText(enteredText);
  };

  //hide choosen ingredinets when losing focus
  const onBlurSearch = () => {
    setDisplayChosenIngredients(false);
  };

  //display only drinks with choosen ingredient
  const getDrinksByIngHandler = (e) => {
    getDrinksByIngredientHandler(e.target.textContent.split(" ").join("_"));
    setInputText("");
    setDisplayChosenIngredients(false);
  };

  useEffect(() => {
    setIngredients(fetchedCategories);
  }, [fetchedCategories]);

  return {
    filterIngredients,
    getDrinksByIngHandler,
    onBlurSearch,
    inputValue,
    inputText,
    displayChosenIngredients,
    chosenIngredients,
  };
};

export default useCustomSelect;
