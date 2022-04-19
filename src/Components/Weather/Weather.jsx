import { useEffect, useState } from "react";
import { WeatherModal } from "../WeatherModal/WeatherModal";
import { getWeatherApi } from "../../api-services/weather-api";
import "../Weather/Weather.css";
import { useWeather } from "../../Context/weather-context";

export const Weather = () => {
  const [weatherModal, setWeatherModal] = useState(false);
  const { weather, setWeather } = useWeather();
  const [geoLocation, setGeoLocation] = useState({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    getWeatherApi(setWeather, geoLocation?.latitude, geoLocation?.longitude);
  }, [geoLocation.latitude, geoLocation.longitude]);

  const weatherHandler = () => {
    if (weatherModal) {
      setWeatherModal(false);
    } else {
      setWeatherModal(!weatherModal);
    }
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (pos) => {
    const crd = pos.coords;
    setGeoLocation({
      ...geoLocation,
      latitude: crd.latitude,
      longitude: crd.longitude,
    });
  };

  const error = (err) => {
    console.log(`ERROR(${err.code}): ${err.message}`);
  };
  navigator.geolocation.getCurrentPosition(success, error, options);

  return (
    <>
      <div className="align-top">
        <span
          onClick={() => weatherHandler()}
          data-hover="Weather"
          className="todo-title h3"
        >
          {weather && (
            <div className="weather-container">
              <img
                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <div>
                <p>{`${(weather?.main?.temp).toFixed(0)}°C`}</p>
                <small>{weather?.name}</small>
              </div>
            </div>
          )}
        </span>
      </div>
      {weatherModal && <WeatherModal />}
    </>
  );
};
