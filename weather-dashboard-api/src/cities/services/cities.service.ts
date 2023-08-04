import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { City } from '../entities/city.entity';
import { OpenWeatherApiService } from '../../open-weather-api/services/open-weather-api.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class CitiesService {
  constructor(
    @Inject('CITY_REPOSITORY')
    private cityRepository: Repository<City>,
    private openWeatherApiService: OpenWeatherApiService,
  ) {}
  create(user: User, city: City) {
    return this.cityRepository.save({
      ...city,
      username: user.username,
    });
  }

  async findAll(user: User) {
    const cities = await this.cityRepository.findBy({
      username: user.username,
    });
    const citiesWithWeather = [];
    await Promise.all(
      cities.map(async (city) => {
        const weather = await this.openWeatherApiService.getWeatherData(
          city.lat,
          city.lon,
        );
        citiesWithWeather.push({ ...city, weather });
      }),
    );
    return citiesWithWeather;
  }

  findOne(id: number) {
    return this.cityRepository.findOneBy({ id });
  }

  update(id: number, city: City) {
    return this.cityRepository.update({ id }, city);
  }

  remove(id: number) {
    return this.cityRepository.delete({ id });
  }
}
