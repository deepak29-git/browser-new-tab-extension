import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WeatherProvider } from "./Context/weather-context";
import { EventProvider } from "./Context/event-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WeatherProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </WeatherProvider>
  </React.StrictMode>
);
