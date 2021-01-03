import axios from "axios";

const API_KEY = "15b0db40d3ea0389ff703d8c80ed6e9b";

export default {
    // fetchCurrentWeather: ({ query }) => {
    //     const queryString = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
    //     let queryResult = localStorage.getItem(queryString);

    //     if(queryResult !== null) return JSON.parse(queryResult);
    //     else {  
    //         queryResult = axios.get(
    //             queryString
    //         ).then((response) => {
    //             queryResult = JSON.stringify(response);
    //             localStorage.setItem(queryString, queryResult);
    //             return queryResult;
    //         });            
    //     }
    // },
    // fetchWeatherForecast: ({ lat, lon }) => {
    //     const queryString = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,current&appid=${API_KEY}`;
    //     let queryResult = localStorage.getItem(queryString);

    //     if(queryResult !== null) return JSON.parse(queryResult);
    //     else {  
    //         queryResult = axios.get(
    //             queryString
    //         ).then((response) => {
    //             queryResult = JSON.stringify(response);
    //             localStorage.setItem(queryString, queryResult);
    //             return queryResult;
    //         });            
    //     }
    // },
    fetchCurrentWeather: ({ query }) =>
        axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
        ),
    fetchWeatherForecast: ({ lat, lon }) =>
        axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,current&appid=${API_KEY}`
        ),
    fetchWeatherIcon: ({ icon }) => {
        const queryString = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        let queryResult = localStorage.getItem(queryString);

        if (queryResult !== null) return queryResult;
        else {
            queryResult = axios.get(
                queryString,
                {
                    responseType: 'arraybuffer'
                }
            ).then((response) => {
                let image = btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                let imgData = `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;

                localStorage.setItem(queryString, imgData);
                return imgData;
            });
        }
    }        
};
