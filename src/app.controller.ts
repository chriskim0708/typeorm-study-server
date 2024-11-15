import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  @Get('users')
  getUsers() {
    return this.userRepository.find();
  }

  @Post('users')
  postUser() {
    return this.userRepository.save({
      title: 'test title',
      role: Role.ADMIN,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const updatedUser = this.userRepository.create({
      id: +id,
      title: user.title + '0',
    });

    return this.userRepository.save(updatedUser);
  }
}
