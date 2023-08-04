import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constant/jwt.constant';
import { UsersModule } from '../../users/users.module';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  const createMock = {
    password: '123',
    username: 'test',
  };
  const tokenMock = {
    access_token: '123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        UsersModule,
        ConfigModule.forRoot(),
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60m' },
        }),
      ],
      providers: [AuthService],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });
  it('should login', async () => {
    jest.spyOn(service, 'signIn').mockImplementation(async () => tokenMock);

    expect(await controller.signIn(createMock)).toBe(tokenMock);
  });
});
