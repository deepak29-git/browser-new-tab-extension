import { useWeather } from "../../Context/weather-context";
import "../WeatherModal/WeatherModal.css";

export const WeatherModal = () => {
  const { weather } = useWeather();

  return (
    <div className="weather-modal">
      {weather && (
        <div className="weather-content">
          <div>
            <p className="h3">{weather?.name}</p>
            <p className="h3">{`${(weather?.main?.temp).toFixed(0)}°C`}</p>
            <small className="grey-text">{weather.weather[0].main}</small>
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
      <hr />
      <div className="weather-details">
        <p>Min Temperature: {weather.main.temp_min}°C</p>
        <p>Max Temperature: {weather.main.temp_max}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind speed: {weather.wind.speed}km/h</p>
      </div>
    </div>
  );
};
