import './Header.css'
import logo from "../../assets/images/mlh-prep.png";

const Header = () => {
  return (
    <div className="MLHHeader">
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
    </div>
  );
};

export default Header;
