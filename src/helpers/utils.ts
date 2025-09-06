import { Weather } from "../types.js";
import { daysOfWeek, weatherCodeMap } from "./constants.js";

export const formatWeatherData = (data: Weather) => {
  return {
    location: {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
    },
    current: {
      temperature: data.daily.apparent_temperature_max
        ? data.daily.apparent_temperature_max[0]
        : data.current_weather.temperature +
          data.current_weather_units.temperature,
      windspeed:
        data.current_weather.windspeed + data.current_weather_units.windspeed,
      weathercode: weatherCodeMap[data.current_weather.weathercode],
    },
    daily: data?.daily?.time?.map((time, index) => ({
      day: daysOfWeek[new Date(time).getDay()],
      date: time,
      temperatureMax:
        data.daily.temperature_2m_max?.[index] +
        data.daily_units.temperature_2m_max,
      temperatureMin:
        data.daily.temperature_2m_min?.[index] +
        data.daily_units.temperature_2m_min,
      relative_humidity_max:
        data.daily.relative_humidity_2m_max?.[index] +
        data.daily_units.relative_humidity_2m_max,
      relative_humidity_min:
        data.daily.relative_humidity_2m_min?.[index] +
        data.daily_units.relative_humidity_2m_min,
      feelsLikeTemperatureMax:
        data.daily.apparent_temperature_max?.[index] +
        data.daily_units.apparent_temperature_max,
      feelsLikeTemperatureMin:
        data.daily.apparent_temperature_min?.[index] +
        data.daily_units.apparent_temperature_min,
      weather: weatherCodeMap[data.daily.weathercode?.[index]],
    })),
  };
};
