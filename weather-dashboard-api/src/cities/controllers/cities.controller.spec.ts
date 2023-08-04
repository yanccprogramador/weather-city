import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from '../services/cities.service';
import { DatabaseModule } from '../../database/database.module';
import { OpenWeatherApiModule } from '../../open-weather-api/open-weather-api.module';
import { citiesProviders } from '../cities.providers';
import { AuthModule } from '../../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { City } from '../entities/city.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;
  const createMock = {
    name: 'Sao Paulo',
    lat: '-49',
    lon: '-10',
    username: 'test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      imports: [
        DatabaseModule,
        OpenWeatherApiModule,
        AuthModule,
        ConfigModule.forRoot(),
      ],
      providers: [CitiesService, ...citiesProviders],
    }).compile();
    controller = module.get<CitiesController>(CitiesController);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should return all cities', async () => {
    const result = [createMock];
    const user = { username: 'test' };
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await controller.findAll(user)).toBe(result);
  });
  it('should return a city', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => createMock as City);

    expect(await controller.findOne(1)).toBe(createMock);
  });
  it('should update a city', async () => {
    jest.spyOn(service, 'update').mockImplementation(async () => {
      return new UpdateResult();
    });

    expect(
      await controller.update(1, { ...createMock, name: 'SP' } as City),
    ).toBeInstanceOf(UpdateResult);
  });
  it('should create a City', async () => {
    const user = { username: 'test' };

    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => createMock as City);

    expect(await controller.create(createMock as City, user)).toBe(createMock);
  });
  it('should delete a City', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => new DeleteResult());

    expect(await controller.remove(1)).toBeInstanceOf(DeleteResult);
  });
});
