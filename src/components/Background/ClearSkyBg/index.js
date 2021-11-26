import "../Background.css";
import "./ClearSkyBg.css"

const ClearSkyBg = ({ children }) => {

  return (
    <div className="background" id="clearsky" >
      <div class="sky-img">
        {children}
      </div>
      </div>
  );
};

export default ClearSkyBg;
