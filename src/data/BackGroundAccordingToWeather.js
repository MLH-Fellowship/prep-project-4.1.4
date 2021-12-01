import Clouds from "../assets/images/backgrounds/Clouds.jpg";
import Clear from "../assets/images/backgrounds/Clear.jpg";
import Smoke from "../assets/images/backgrounds/Smoke.jpg";
import Rain from "../assets/images/backgrounds/Rain.jpg";
import Haze from "../assets/images/backgrounds/Haze.jpg";
import Drizzle from "../assets/images/backgrounds/drizzle.jpg";

const Background = {
  Clouds: {
    background: `url(${Clouds})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundAttachment: "fixed"
  },
  Smoke: {
    background: `url(${Smoke})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundAttachment: "fixed !important"
  },
  Clear: {
    background: `url(${Clear})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundAttachment: "fixed"
  },
  Rain: {
    background: `url(${Rain})`,
    backgroundSize: "cover",
  },
  Haze: {
    background: `url(${Haze})`,
    backgroundSize: "cover",
  },
  Drizzle: {
    background: `url(${Drizzle})`,
    backgroundSize: "cover",
  },
  Mist: {
    background: `url(${Haze})`,
    backgroundSize: "cover",
  },
};

export default Background;
