import React from "react";
import { Weather } from "./features/weather/Weather";
import "./App.css";
import WeatherErrorBoundary from "./features/errorBoundary/weatherErrorBoundary"; 
import logo from "./logo.png";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <WeatherErrorBoundary>
                    <Weather />
                </WeatherErrorBoundary>
            </header>
        </div>
    );
}

export default App;
