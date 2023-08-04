import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async create(user: User) {
    const saltOrRounds = Number(process.env.BCRYPT_SALT);
    const hash = await bcrypt.hash(user.password.toString(), saltOrRounds);
    user.password = hash;
    return this.userRepository.save(user);
  }

  findOne(username: string) {
    return this.userRepository.findOneBy({ username });
  }
}
