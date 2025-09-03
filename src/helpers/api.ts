import { Weather } from "../types.js";
import { formatWeatherData } from "./utils.js";

export const getWeatherForecast = async (lat: number, long: number) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,weathercode,relative_humidity_2m_max,relative_humidity_2m_min&timezone=auto&current_weather=true`
  );
  const data = (await response.json()) as Weather;
  return formatWeatherData(data);
};
