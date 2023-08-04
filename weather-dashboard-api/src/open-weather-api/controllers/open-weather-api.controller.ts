import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { OpenWeatherApiService } from '../services/open-weather-api.service';
import { AuthGuard } from '../../auth/guard/auth.guard';

@Controller('open-weather-api')
export class OpenWeatherApiController {
  constructor(private readonly openWeatherApiService: OpenWeatherApiService) {}

  @Get('search')
  @UseGuards(AuthGuard)
  search(@Query('city') query: string) {
    try {
      return this.openWeatherApiService.searchCity(query);
    } catch (err) {
      return err;
    }
  }
}
