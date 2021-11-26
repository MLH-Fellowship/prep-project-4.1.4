import { useEffect, useState, useRef } from "react";
import "./CurrentCityWeather.css";
import Autocomplete from "react-google-autocomplete";
import Background from "../../data/BackGroundAccordingToWeather";
import { Col, Row } from "react-bootstrap";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'
import WMap from "../../components/Map/Map";
import HourlyCityWeather from "../HourlyCityWeather/HourlyCityWeather";
import SongRecommendation from "../SongRecommendation/SongRecommendation";
import "react-toggle/style.css"
import Toggle from 'react-toggle'

const CurrentCityWeather = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cityCoordinates, setCityCoordinates] = useState({lat: '40.7128', lon: '-74.0060'});
  const [results, setResults] = useState(null);
  const [city, setCity] = useState('New York');
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('metric')

  function getLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
    else{
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position){
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
    .then(response => response.json())
    .then(data => {
      const currCity = data.city ? data.city : data.principalSubdivision
      setCity(currCity)
      setCityCoordinates({lat: lat,lon: lon});
    })
    .catch(error => alert(error))}


  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      default:
        alert("An unknown error occurred.")
        break;
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    fetch(
       "https://api.openweathermap.org/data/2.5/weather?"
      + `lat=${cityCoordinates.lat}&`
      + `lon=${cityCoordinates.lon}&`
      + "units=${unit}&"
      + `appid=${process.env.REACT_APP_APIKEY}`
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
            setCity(result.name + ", " + result.sys.country)
          }
        },
        (error) => {
          setError(error);
        }
      )
      .catch((err) => {
        setError(err);
      });
  }, [cityCoordinates, unit]);

  function setCoordinates(place) {
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    const coordinates = {lat: latitude, lon: longitude};
    setCityCoordinates(coordinates);
  }

  function getCity(address) {
    const addressComponents = address.split(",");
    setCity(addressComponents[0]);
  }


  useEffect(() => {
    if (transcript !== '') {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${transcript}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
        .then(response => response.json())
        .then(data => {
          var latitude = data.results[0].geometry.location.lat;
          var longitude = data.results[0].geometry.location.lng;
          var coordinates = { lat: latitude, lon: longitude };
          setAddress(data.results[0].formatted_address)
          setCityCoordinates(coordinates);
        })
        .catch(error => alert(error))
    }
  }, [transcript])

  function handleMicrophone() {
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.startListening()
    }
  }

  async function checkBraveBrowser() {
    if (navigator.brave && await navigator.brave.isBrave()) {
      return false
    } else {
      return true
    }
  }

  function handleUnitChange() {
    if (unit === 'metric') {
      setUnit('imperial')
    } else {
      setUnit('metric')
    }
    console.log(unit)
  }



  return (
    <>
      <div className="toggle-ctn">
        <Toggle
          defaultChecked={true}
          className='toggle-switch'
          icons={{
            checked: <div className='unit-symbol'>C</div>,
            unchecked: <div className='unit-symbol'>F</div>,
          }}
          onChange={handleUnitChange} />
      </div>
      <div className="CurrentCityWeather">
        <h2 className="pb-4">Enter a city below 👇</h2>
        <div className='input-ctn'>
        <Autocomplete
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          onPlaceSelected={(place) => {
            setCoordinates(place);
            getCity(place.formatted_address);
          }}
          defaultValue={city}
          className="inputCity"
        />
          {browserSupportsSpeechRecognition && checkBraveBrowser ? (
            <div className='voice-ctn'>
              <div
                className='microphone-icon'
                onClick={handleMicrophone}>{listening ? (<FontAwesomeIcon icon={faMicrophone} />) : (<FontAwesomeIcon icon={faMicrophoneSlash} />)}</div>
            </div>) : (<div></div>)}
        </div>
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
          <>
            <div
              style={Background[results.weather[0].main]}
              className="WeatherResults"
            >
              <div className="InnerWeatherResults">
                <Row className="justify-content-center">
                  <Col className="col-md-5 col-12">
                    <div className="CurrentActualTemp">
                      {results.main.temp}
                      {unit === "metric" ? (
                        <sup>°C</sup>) : (<sup>°F</sup>)
                      }
                    </div>
                    <div className="CurrentActualWeather">
                      {results.weather[0].main}
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
                    </i>
                  </Col>
                  <Col className="col-md-7 col-10">
                    <Row className="flex-column justify-content-around">
                      <Col className="pb-1 pt-2">
                        <div className="currentTempDetails">
                          <span> Feels like: </span> {results.main.feels_like}
                          {unit === "metric" ? (
                            <sup>°C</sup>) : (<sup>°F</sup>)
                          }
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
                              {results.main.temp_min}{unit === "metric" ? (
                                <sup>°C</sup>) : (<sup>°F</sup>)
                              }
                            </div>
                          </Col>
                          <Col>
                            <div className="minmaxTempHeading">MAX</div>
                            <div className="minmaxTemp">
                              {results.main.temp_max} {unit === "metric" ? (
                                <sup>°C</sup>) : (<sup>°F</sup>)
                              }
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <HourlyCityWeather city={city} unit={unit} />
                </Row>
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
              <Row>
                <HourlyCityWeather city={city} />
              </Row>
              </div>
            <WMap city = {city} setCity = {setCity} cityCoordinates = {cityCoordinates} setCityCoordinates= {setCityCoordinates}/>
          </div>
          <div>
            <SongRecommendation options={results} />
          </div>
          </>
        )}
      </div>
    </>
  );

};

export default CurrentCityWeather;
