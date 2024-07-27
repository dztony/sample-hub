import WeatherData from './data/weather.json';
import { timeout } from "../utils/common";

export type IWeatherInfo = {
  city: string;
  realtime: IRealtime;
  future: Array<IFuture>;
}

export type IRealtime = {
  temperature: string;
  humidity: string;
  info: string;
  wid: string;
  direct: string;
  power: string;
  aqi: string;
};

export type IFuture = {
  date: string;
  temperature: string;
  weather: string;
  wid: {
    day: string;
    night: string;
  },
  direct: string;
}

export async function getWeatherInfo(city: string): Promise<IWeatherInfo> {
  await timeout(0.5);
  return WeatherData as IWeatherInfo;
}
