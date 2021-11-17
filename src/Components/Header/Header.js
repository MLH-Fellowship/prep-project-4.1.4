import logo from "../../Images/mlh-prep.png";
import './Header.css'

const Header = () => {
  return (
    <div className="MLHHeader">
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
    </div>
  );
};

export default Header;
