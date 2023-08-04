import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { usersProviders } from '../users.providers';
import { DatabaseModule } from '../../database/database.module';
import { User } from '../entities/user.entity';
import { ConfigModule } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;
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
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });
  it('should create a User', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => createMock as User);

    expect(await controller.create(createMock as User)).toBe(createMock);
  });
});
