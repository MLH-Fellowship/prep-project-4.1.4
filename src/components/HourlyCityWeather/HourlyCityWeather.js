import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import './HourlyCityWeather.css';

const HourlyCityWeather = ({city}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [timeStamps, setTimeStamps] = useState(0);


    useEffect(() => {
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
                    if (result.cod !== "200") {
                        setIsLoaded(true);
                        setError(result);
                    } else {
                        setIsLoaded(true);
                        setError();
                        organizeForecast(result);
                    }
                }
            )
            .catch(err => setError(err));

    }, [city], []);

    function organizeForecast(result) {
        const hourlyForecasts = result.list.map((item) => ({
            day: getWeekday(item.dt_txt),
            time: item.dt_txt.slice(-8, -3), 
            temperature: parseInt(item.main.temp, 10),
            icon: item.weather[0].main
          }))
        const dailyForecasts = [];
        for (var j = 0; j < hourlyForecasts.length; j += 8) {
            dailyForecasts.push(hourlyForecasts.slice(j, j + 8));
        }
        setTimeStamps(dailyForecasts);
    }

    const days = { 0 : 'Sun', 1 : 'Mon', 2 : 'Tue', 3 : 'Wed', 4 : 'Thu', 5 : 'Fri', 6 : 'Sat' };
    function getWeekday(time) {
        var today = new Date();
        var forecastDate = new Date(time);
        if (forecastDate.getDate() === today.getDate()) {
            return 'Today';
        }
        return days[forecastDate.getDay()];
    }

    const Emoji = props => (
        <span
          className="emoji"
          role="img"
          aria-label={props.label ? props.label : ""}
          aria-hidden={props.label ? "false" : "true"}
        >
          {props.symbol}
        </span>
      )

    const nightEmojis = {
        'Clouds' : <h3><Emoji label="cloud" symbol="☁️"/></h3>,
        'Clear' : <h3><Emoji label="clear" symbol="🌙"/></h3>,
        'Smoke' : <h3><Emoji label="smoke" symbol="🌫️"/></h3>,
        'Rain' : <h3><Emoji label="rain" symbol="💧"/></h3>,
        'Haze' : <h3><Emoji label="haze" symbol="🌫️"/></h3>,
        'Drizzle' : <h3><Emoji label="drizzle" symbol="🌧️"/></h3>,
        'Snow' : <h3><Emoji label="snow" symbol="❄️"/></h3>
    }

    const dayEmojis = {
        'Clouds' : <h3><Emoji label="cloud" symbol="🌥️"/></h3>,
        'Clear' : <h3><Emoji label="sun" symbol="☀️"/></h3>,
        'Smoke' : <h3><Emoji label="smoke" symbol="🌫️"/></h3>,
        'Rain' : <h3><Emoji label="rain" symbol="💧"/></h3>,
        'Haze' : <h3><Emoji label="haze" symbol="🌫️"/></h3>,
        'Drizzle' : <h3><Emoji label="drizzle" symbol="🌧️"/></h3>,
        'Snow' : <h3><Emoji label="snow" symbol="❄️"/></h3>
    }

      function ChooseEmoji(props) {
        if(isNight(props.time)) {
            return nightEmojis[props.weather];
        }
        return dayEmojis[props.weather];
      }

      function isNight(time) {
        var times = { 
            '06:00' : false, 
            '09:00' : false, 
            '12:00' : false, 
            '15:00' : false, 
            '18:00' : false, 
            '21:00' : true, 
            '00:00' : true, 
            '03:00' : true
        };
        return times[time];
      }

    return (
        <>
            {error && (
                <div className="WeatherResultsLoading">
                    <h2 className="px-3">Error: {error.message}</h2>
                </div>
            )}
            {isLoaded && !error && timeStamps && (
                <div>
                    <Carousel interval={8000}>
                        {timeStamps.map((dailyForecast, i) => (
                            <Carousel.Item key={i}>
                                <br></br>
                                <Row>
                                    {dailyForecast.map((hourlyForcast, j) =>
                                    (
                                        <Col className="carousel-column" key={j}>
                                            <p className="week-day">
                                                {hourlyForcast.day}
                                            </p>
                                            <p className="hour">
                                                {hourlyForcast.time}
                                            </p>
                                            <ChooseEmoji weather={hourlyForcast.icon} time={hourlyForcast.time}/>
                                            <p className="temperature">
                                                {hourlyForcast.temperature}
                                                <sup>°C</sup>
                                            </p>
                                        </Col>
                                    ))}
                                </Row>
                                <br></br>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            )}
        </>
    );
};

export default HourlyCityWeather;