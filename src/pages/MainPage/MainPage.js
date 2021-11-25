import "./MainPage.css";
import CurrentCityWeather from "../../components/CurrentCityWeather/CurrentCityWeather";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const MainPage = () => {
  return (
    <>
      <Header />
      <CurrentCityWeather />
      <Footer />
    </>
  );
};

export default MainPage;
