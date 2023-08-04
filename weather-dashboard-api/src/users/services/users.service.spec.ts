import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../database/database.module';
import { UsersController } from '../controllers/users.controller';
import { User } from '../entities/user.entity';
import { usersProviders } from '../users.providers';

describe('UsersService', () => {
  let service: UsersService;
  const createMock = {
    password: '123',
    username: 'test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [DatabaseModule, ConfigModule.forRoot()],
      providers: [UsersService, ...usersProviders],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });
  it('should create a User', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => createMock as User);

    expect(await service.create(createMock as User)).toBe(createMock);
  });
  it('should find a User', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => createMock as User);

    expect(await service.findOne(createMock.username)).toBe(createMock);
  });
});
