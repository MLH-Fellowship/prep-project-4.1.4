import Clouds from "../Images/Backgrounds/Clouds.jpg";
import Clear from "../Images/Backgrounds/Clear.jpg";
import Smoke from "../Images/Backgrounds/Smoke.jpg";
import Rain from "../Images/Backgrounds/Rain.jpg";
import Haze from "../Images/Backgrounds/Haze.jpg";
import Drizzle from "../Images/Backgrounds/drizzle.jpg";

const Background = {
  Clouds: {
    background: `url(${Clouds})`,
    backgroundPositionX: "center",
    backgroundPositionY: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  Smoke: {
    background: `url(${Smoke})`,
    backgroundPositionX: "center",
    backgroundPositionY: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  Clear: {
    background: `url(${Clear})`,
    backgroundPositionX: "center",
    backgroundPositionY: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  Rain: {
    background: `url(${Rain})`,
    backgroundPositionX: "center",
    backgroundPositionY: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  Haze: {
    background: `url(${Haze})`,
    backgroundPositionX: "center",
    backgroundPositionY: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  Drizzle: {
    background: `url(${Drizzle})`,
    backgroundPositionX: "center",
    backgroundPositionY: "top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
};

export default Background;
