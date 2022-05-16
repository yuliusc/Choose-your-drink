import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useCustomSwitch = () => {
  const [filterAlcohol, setFilterAlcohol] = useState("non_alcoholic");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const changeSwitch = () => {
    setTimeout(() => {
      if (filterAlcohol === "non_alcoholic") {
        navigate(`/?filter=Alcoholic`);
      } else {
        navigate(`/?filter=Non_Alcoholic`);
      }
    }, 500);
  };

  useEffect(() => {
    setFilterAlcohol(
      queryParams.get("filter")
        ? queryParams.get("filter").toString().toLowerCase()
        : "non_alcoholic"
    );
  }, [queryParams]);

  return { changeSwitch, filterAlcohol };
};

export default useCustomSwitch;
