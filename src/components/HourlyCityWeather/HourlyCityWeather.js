import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import './HourlyCityWeather.css';

const HourlyCityWeather = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [city, setCity] = useState("Budapest");
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
                    console.log(result);
                    if (result["cod"] !== "200") {
                        setIsLoaded(true);
                        setError(result);
                    } else {
                        setIsLoaded(true);
                        setError();
                        organizeForecast(result);
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

    function organizeForecast(result) {
        const hourlyForecasts = [];
        var dailyData = [];
        for (let i = 0; i < result.list.length; i++) {
            var dateAndTime = result.list[i].dt_txt.split(" ");
            var time = dateAndTime[1].split(":");
            time = time[0] + ":" + time[1];
            dailyData = {
                "day": getWeekday(result.list[i].dt_txt),
                "time": time,
                "temperature": parseInt(result.list[i].main.temp, 10),
                "icon": result.list[i].weather[0].main
            };
            hourlyForecasts.push(dailyData);
        }
        var dailyForecasts = [];
        for (var j = 0; j < hourlyForecasts.length; j += 8) {
            dailyForecasts.push(hourlyForecasts.slice(j, j + 8));
        }

        setTimeStamps(dailyForecasts);
        console.log(dailyForecasts);
    }

    function getWeekday(time) {
        var today = new Date();
        var forecastDate = new Date(time);
        var days = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' };

        if (forecastDate.getDate() === today.getDate()) {
            return 'Today';
        }
        return days[forecastDate.getDay()];
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
                    <Carousel >
                        {timeStamps.map((item, i) => (
                            <Carousel.Item key={i}>
                                <br></br>
                                <Row>
                                    {item.map((time, j) =>
                                    (
                                        <Col className="carousel-column" key={j}>
                                            <p className="week-day">
                                                {time.day}
                                            </p>
                                            <p className="hour">
                                                {time.time}
                                            </p>
                                            <p className="temperature">
                                                {time.temperature}
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