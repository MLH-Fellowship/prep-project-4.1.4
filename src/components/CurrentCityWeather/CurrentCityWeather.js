import { useEffect, useState, useRef } from "react";
import "./CurrentCityWeather.css";
import Autocomplete from "react-google-autocomplete";
import Background from "../../data/BackGroundAccordingToWeather";
import { Col, Row } from "react-bootstrap";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'

const CurrentCityWeather = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
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
  }, [city]);


  useEffect(() => {
    console.log(transcript)
    setCity(transcript)
  }, [transcript])

  function handleMicrophone() {
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.startListening()
    }
  }


  return (
    <>
      <div className="CurrentCityWeather">
        <h2 className="pb-4">Enter a city below 👇</h2>
        <div className='input-ctn'>
          <Autocomplete
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={(place) => {
              setCity(place.formatted_address)
            }}
            defaultValue={city}
            className="inputCity"
          />
          {browserSupportsSpeechRecognition && (
            <div className='voice-ctn'>
              <div
                className='microphone-icon'
                onClick={handleMicrophone}>{listening ? (<FontAwesomeIcon icon={faMicrophone} />) : (<FontAwesomeIcon icon={faMicrophoneSlash} />)}</div>
            </div>)}
        </div>
        {error && (
          <div className="WeatherResultsLoading">
            <h2 className="px-3">Error: {error.message}</h2>
          </div>
        )}
        {city && !error && !isLoaded && (
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
                      {results.name}, {results.sys.country}
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
