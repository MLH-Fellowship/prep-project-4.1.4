import "../Background.css";
import "./Thunder.css"

const ThunderStromBg = ({ children }) => {
  return (
    <div className="background" id="thunder" >
      <div class="thunderstorm">
        {children}
      </div>
      </div>
  );
};

export default ThunderStromBg;
