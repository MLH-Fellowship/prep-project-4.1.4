import { useEffect, useState, useRef  } from "react";
import "./CurrentCityWeather.css";
import Autocomplete from "react-google-autocomplete";
import Background from "../../data/BackGroundAccordingToWeather";
import { Col, Row } from "react-bootstrap";

const CurrentCityWeather = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cityCoordinates, setCityCoordinates] = useState({lat: '40.7128', lon: '-74.0060'});
  const [results, setResults] = useState(null);
  const [city, setCity] = useState('New York');

  
  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        cityCoordinates.lat +
        "&lon=" +
        cityCoordinates.lon +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result["cod"] !== 200) {
            setIsLoaded(true);
            setError(result);
          } else {
            setIsLoaded(true);
            setError();
            setResults(result);
            console.log(result);
          }
        },
        (error) => {
          setError(error);
        }
      )
      .catch((err) => {
        setError(err);
      });
  }, [cityCoordinates]);

  function setCoordinates(place) {
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();
    var coordinates = {lat: latitude, lon: longitude};
    setCityCoordinates(coordinates);
  }

  function getCity(address) {
    var addressComponents = address.split(",");
    setCity(addressComponents[0]);
  }

  return (
    <>
      <div className="CurrentCityWeather">
        <h2 className="pb-4">Enter a city below 👇</h2>
        <Autocomplete
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          onPlaceSelected={(place) => {
            setCoordinates(place);
            getCity(place.formatted_address);
          }}
          defaultValue={"New York, NY, USA"}
          className="inputCity"
        />
        {error && (
          <div className="WeatherResultsLoading">
            <h2 className="px-3">Error: {error.message}</h2>
          </div>
        )}
        {cityCoordinates && !error && !isLoaded && (
          <div className="WeatherResultsLoading">
            <h2 className="px-3">Loading...</h2>
          </div>
        )}
        {isLoaded && !error && results && (
          <div
            style={Background[results.weather[0].main]}
            className="WeatherResults"
          >
            <div className="InnerWeatherResults">
              <Row className="justify-content-center">
                <Col className="col-md-5 col-12">
                  <div className="CurrentActualTemp">
                    {results.main.temp}
                    <sup>°C</sup>
                  </div>
                  <div className="CurrentActualWeather">
                    {results.weather[0].main}
                  </div>
                  <i>
                    <div>
                      {city}, {results.sys.country}
                    </div>
                  </i>
                </Col>
                <Col className="col-md-7 col-10">
                  <Row className="flex-column justify-content-around">
                    <Col className="pb-1 pt-2">
                      <div className="currentTempDetails">
                        <span> Feels like: </span> {results.main.feels_like}
                        <sup>°C</sup>
                      </div>
                    </Col>
                    <Col className="pb-2">
                      <div className="currentTempDetails">
                        <span> Humidity: </span>
                        {results.main.humidity}%
                      </div>
                    </Col>
                    <Col className="py-2">
                      <Row>
                        <Col>
                          <div className="minmaxTempHeading">MIN</div>
                          <div className="minmaxTemp">
                            {results.main.temp_min} <sup>°C</sup>
                          </div>
                        </Col>
                        <Col>
                          <div className="minmaxTempHeading">MAX</div>
                          <div className="minmaxTemp">
                            {results.main.temp_max} <sup>°C</sup>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
    </>
  );

};

export default CurrentCityWeather;
