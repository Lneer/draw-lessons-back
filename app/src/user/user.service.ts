import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { userRepository } from './constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(userRepository)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return `This action returns all user`;
  }

  findOne(email: User['user_email']) {
    return this.userRepository.findOne({
      where: {
        user_email: email,
      },
    });
  }

  findByEmail(email: string, pass: string) {
    return this.userRepository.findOne({
      where: {
        user_password: pass,
        user_email: email,
      },
      relations: ['progress'],
    });
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
