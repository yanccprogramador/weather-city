import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherApiModule } from './open-weather-api/open-weather-api.module';

@Module({
  imports: [
    UsersModule,
    CitiesModule,
    AuthModule,
    ConfigModule.forRoot(),
    OpenWeatherApiModule,
  ],
})
export class AppModule {}
