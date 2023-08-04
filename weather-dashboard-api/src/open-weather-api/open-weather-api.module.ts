import { Module } from '@nestjs/common';
import { OpenWeatherApiService } from './services/open-weather-api.service';
import { OpenWeatherApiController } from './controllers/open-weather-api.controller';

@Module({
  controllers: [OpenWeatherApiController],
  providers: [OpenWeatherApiService],
  exports: [OpenWeatherApiService],
})
export class OpenWeatherApiModule {}
