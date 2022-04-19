import { createContext, useContext, useState } from "react";

const WeatherContext=createContext(null)

const WeatherProvider=({children})=>{
    const [weather,setWeather]=useState(false)
    return <WeatherContext.Provider value={{weather,setWeather}}>{children}</WeatherContext.Provider>
}

const useWeather=()=>useContext(WeatherContext)

export{useWeather,WeatherProvider}