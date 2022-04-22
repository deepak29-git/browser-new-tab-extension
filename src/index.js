import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TodoProvider } from "./Context/Todo-context";
import { WeatherProvider } from "./Context/weather-context";
import { EventProvider } from "./Context/event-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TodoProvider>
      <WeatherProvider>
        <EventProvider>
          <App />
        </EventProvider>
      </WeatherProvider>
    </TodoProvider>
  </React.StrictMode>
);
