import "./MainPage.css";
import CurrentCityWeather from "../../Components/CurrentCityWeather/CurrentCityWeather";
import Header from "../../Components/Header/Header";

const MainPage = () => {
  return (
    <>
      <Header />
      <CurrentCityWeather />
    </>
  );
};

export default MainPage;
