import { Module, forwardRef } from '@nestjs/common';
import { CitiesService } from './services/cities.service';
import { CitiesController } from './controllers/cities.controller';
import { citiesProviders } from './cities.providers';
import { DatabaseModule } from '../database/database.module';
import { OpenWeatherApiModule } from '../open-weather-api/open-weather-api.module';

@Module({
  controllers: [CitiesController],
  imports: [DatabaseModule, OpenWeatherApiModule],
  providers: [CitiesService, ...citiesProviders],
})
export class CitiesModule {}
