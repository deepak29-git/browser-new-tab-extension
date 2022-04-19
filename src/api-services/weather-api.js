import axios from "axios";
export const getWeatherApi = async (setWeather, lat, lon) => {
  const API_KEY = "c2922281fce40ec5f95a328c94bccb4b";

  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    setWeather(data);
  } catch (error) {
    console.log(error);
  }
};
