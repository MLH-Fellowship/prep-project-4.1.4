import Snowfall from "react-snowfall";
import "../Background.css";
import "./SnowBg.css"

const SnowBg = ({ children }) => {
  return (
    <div className="background" id="snow">
      <Snowfall />
      {children}
    </div>
  );
};

export default SnowBg;
