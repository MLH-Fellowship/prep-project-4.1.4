import Clouds from "../assets/images/backgrounds/Clouds.jpg";
import Clear from "../assets/images/backgrounds/Clear.jpg";
import Smoke from "../assets/images/backgrounds/Smoke.jpg";
import Rain from "../assets/images/backgrounds/Rain.jpg";
import Haze from "../assets/images/backgrounds/Haze.jpg";
import Drizzle from "../assets/images/backgrounds/drizzle.jpg";

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
