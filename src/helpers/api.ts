import { Weather } from "../types.js";
import { formatWeatherData } from "./utils.js";

export const getWeatherForecast = async (
  lat: number,
  long: number,
  daily?: boolean
) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true${
      daily
        ? "&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,weathercode,relative_humidity_2m_max,relative_humidity_2m_min&timezone=auto"
        : ""
    }`
  );
  const data = (await response.json()) as Weather;
  return formatWeatherData(data);
};
