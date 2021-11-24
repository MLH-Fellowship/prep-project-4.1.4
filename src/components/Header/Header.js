import './Header.css'
import logo from "../../assets/images/sound_forecast.png";

const Header = () => {
  return (
    <div className="MLHHeader">
      <img className="logo" src={logo} alt="SOUND FORECAST"></img>
    </div>
  );
};

export default Header;
