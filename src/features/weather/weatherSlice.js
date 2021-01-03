import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import weatherAPI from "../../api";

const sliceName = "weather";

export const fetchCurrentWeather = createAsyncThunk(
    `${sliceName}/fetchCurrentWeather`,
    (query) => weatherAPI.fetchCurrentWeather({ query })
);

export const fetchWeatherForecast = createAsyncThunk(
    `${sliceName}/fetchWeatherForecast`,
    ({ lat, lon }) => weatherAPI.fetchWeatherForecast({ lat, lon })
);

export const fetchWeatherIcon = createAsyncThunk(
    `${sliceName}/fetchWeatherIcon`,
    (icon) => weatherAPI.fetchWeatherIcon({ icon })
);

export const weatherSlice = createSlice({
    name: sliceName,
    initialState: {
        current: {
            name: '',
            dt: 0,
            weather: [
                {
                    icon: '',
                    description: ''
                }
            ],
            main: {
                temp: 0
            },
            wind: {
                speed: 0
            },
            sys: {
                sunrise: 0,
                sunset: 0
            } 
        },
        forecast: {
            daily: [{
                dt: 0,
                weather: [
                    {
                        icon: '',
                        description: ''
                    }
                ],
                temp: {
                    day: 0
                }
            }]
        },
        icon: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        // Current weather
        [fetchCurrentWeather.pending]: (state, { payload, meta }) => {
            state.loading = true;
            state.error = null;
        },
        [fetchCurrentWeather.fulfilled]: (state, { payload, meta }) => {
            state.loading = false;
            state.current = payload.data; 
        },
        [fetchCurrentWeather.rejected]: (state, { error, meta }) => {
            state.loading = false;
            state.error = error;
        },
        // Weather forecast
        [fetchWeatherForecast.pending]: (state, { payload, meta }) => {
            state.loading = true;
            state.error = null;
        },
        [fetchWeatherForecast.fulfilled]: (state, { payload, meta }) => {
            state.loading = false;
            state.forecast = payload.data;
        },
        [fetchWeatherForecast.rejected]: (state, { error, meta }) => {
            state.loading = false;
            state.error = error;
        },
        // Weather icon
        [fetchWeatherIcon.pending]: (state, { payload, meta }) => {
            state.loading = true;
            state.error = null;
        },
        [fetchWeatherIcon.fulfilled]: (state, { payload, meta }) => {
            state.loading = false;
            state.icon = payload;
        },
        [fetchWeatherIcon.rejected]: (state, { error, meta }) => {
            state.loading = false;
            state.error = error;
        }
    },
});

export const currentWeather = (state) => state.weather.current;

export const weatherForecast = (state) => state.weather.forecast;

export const weatherIcon = (state) => state.weather.icon;

export const weatherError = (state) => state.weather.error;

export const weatherLoading = (state) => state.weather.loading;

export default weatherSlice.reducer;
