import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchCurrentWeather,
    fetchWeatherForecast,
    fetchWeatherIcon,
    currentWeather,
    weatherForecast,
    weatherIcon,
    weatherError,
    weatherLoading 
} from "./weatherSlice";
import WeatherInfo from "./WeatherInfo";
import styles from "./Weather.module.css";

export function Weather() {
    const refSearchButton = useRef();
    const dispatch = useDispatch();
    const current = useSelector(currentWeather);    
    const forecast = useSelector(weatherForecast);
    const icon = useSelector(weatherIcon);
    const error = useSelector(weatherError);
    const loading = useSelector(weatherLoading);
    const [city, setCity] = useState("");
    
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="City searching box"
                    value={city}
                    onKeyUp={(e) => {
                        e.preventDefault();
                        if (e.key === 'Enter') {
                            refSearchButton.current.click();
                        }
                    }}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    className={styles.button}
                    ref={refSearchButton}
                    onClick={() => {
                        dispatch(
                            fetchCurrentWeather(city)
                        )
                        .then((res)=> {
                            if (res && res.payload) {
                                const data = res.payload.data;
                                const lat = data.coord.lat;
                                const lon = data.coord.lon;

                                dispatch(fetchWeatherForecast({ lat, lon }));
                                dispatch(fetchWeatherIcon(data.weather[0].icon));
                            }                                                     
                        })
                    }
                    }
                >
                    Search
                </button>           
            </div>
            <div className={styles.row}>
                <WeatherInfo
                    current={current}
                    forecast={forecast}
                    icon={icon}
                    error={error}
                    loading={loading} />
            </div>
        </div>
    );
}
