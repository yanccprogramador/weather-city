import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { City } from '../entities/city.entity';
import { CitiesController } from '../controllers/cities.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../../auth/auth.module';
import { DatabaseModule } from '../../database/database.module';
import { OpenWeatherApiModule } from '../../open-weather-api/open-weather-api.module';

import { User } from '../../users/entities/user.entity';
import { citiesProviders } from '../cities.providers';
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    find: jest.fn((entity) => entity),
    findOneBy: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
  }),
);

describe('CitiesService', () => {
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
    service = module.get<CitiesService>(CitiesService);
  });

  it('should return all cities', async () => {
    const weatherData = {
      weather: 'ok',
    };
    const result: City[] = [createMock as City];
    const user = { username: 'test' };
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);
    expect(await service.findAll(user as User)).toBe(result);
  });
  it('should return a city', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => createMock as City);
    expect(await service.findOne(1)).toBe(createMock);
  });
  it('should update a city', async () => {
    jest.spyOn(service, 'update').mockImplementation(async () => {
      return new UpdateResult();
    });

    expect(
      await service.update(3, { ...createMock, name: 'SP' } as City),
    ).toBeInstanceOf(UpdateResult);
  });
  it('should create a City', async () => {
    const user = { username: 'test' };
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => createMock as City);
    expect(
      await service.create(user as User, createMock as City),
    ).toBeInstanceOf(Object);
  });
  it('should delete a City', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => new DeleteResult());

    expect(await service.remove(1)).toBeInstanceOf(DeleteResult);
  });
  afterEach(() => jest.clearAllMocks());
});
