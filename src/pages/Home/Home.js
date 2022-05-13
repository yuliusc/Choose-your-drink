import Filters from "../../components/Filters/Filters";
import DrinkSet from "../../components/DrinkSet/DrinkSet";

import "./home.css";

import homePageGif from "../../assets/gifs/joinesgifimage-3473372.gif";

const Home = () => {
  return (
    <div className="home">
      <div className="welcome">
        <div className="main">
          <h1 className={"main__title"}>Choose your drink</h1>
          <div className="main__drinks">
            <img src={homePageGif} alt="Gif" width="300px" height="324" />
          </div>
        </div>
      </div>
      <div className="content">
        <>
          <Filters />

          <p className="content__filterInfo">Filtered by: </p>

          <DrinkSet />
        </>
      </div>
    </div>
  );
};

export default Home;
