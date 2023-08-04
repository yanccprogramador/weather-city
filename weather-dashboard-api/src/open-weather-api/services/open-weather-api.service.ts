import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenWeatherApiService {
  searchCity(query: string) {
    return fetch(
      `${process.env.OPEN_WEATHER_API_URL}/geo/1.0/direct?q=${query}&limit=10&appid=${process.env.OPEN_WEATHER_API_KEY}`,
    ).then((response) => response.json());
  }

  getWeatherData(lat: string, lon: string) {
    return fetch(
      `${process.env.OPEN_WEATHER_API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&lang=pt_br&units=metric`,
    ).then((response) => response.json());
  }
}
