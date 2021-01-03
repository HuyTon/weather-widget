import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import counterReducer from "../features/counter/counterSlice";
import weatherReducer from "../features/weather/weatherSlice";

const middleware = [thunk];

export default configureStore({
    reducer: {
        counter: counterReducer,
        weather: weatherReducer,
    },
    middleware,
});
