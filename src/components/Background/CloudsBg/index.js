import "../Background.css";
import "./CloudsBg.css"

const CloudsBg = ({ children }) => {

  return (
    <div id="cloudsky" >
      <div class="cloudsky-img">
        {children}
      </div>
      </div>
  );
};

export default CloudsBg;
