import "./MainPage.css";
import CurrentCityWeather from "../../components/CurrentCityWeather/CurrentCityWeather";
import Header from "../../components/Header/Header";
import WMap from "../../components/Map/Map";

const MainPage = () => {
  return (
    <>
      <Header />
      <CurrentCityWeather />
    </>
  );
};

export default MainPage;
