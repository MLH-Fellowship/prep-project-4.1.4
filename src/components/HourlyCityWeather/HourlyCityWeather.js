import { useEffect, useState } from "react";
import './HourlyCityWeather.css'

const HourlyCityWeather = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [city, setCity] = useState("Budapest");
    const [results, setResults] = useState(null);

    useEffect(() => {
        let mounted = true;
        fetch(
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&units=metric" +
            "&appid=" +
            process.env.REACT_APP_APIKEY
        )
          .then((res) => res.json())
          .then(
            (result) => {
              console.log(result);
              if (result["cod"] !== "200") {
                setIsLoaded(true);
                setError(result);
              } else {
                setIsLoaded(true);
                setError();
                setResults(result);
              }
            },
            (error) => {
              setError(error);
            }
          )
          .catch((err) => {
            setError(err);
          });

      }, [city]);

      return (
        <p>Hourly Weather Component</p>
      );

    };

    export default HourlyCityWeather;