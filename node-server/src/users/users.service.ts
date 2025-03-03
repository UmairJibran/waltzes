import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      password: '12345678',
      email: 'me@umairjibran.com',
      role: 'admin',
      firstName: 'Umair',
      lastName: 'Jibran',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      password: 'guess',
      email: 'john@guess.com',
      role: 'admin',
      firstName: 'Umair',
      lastName: 'Jibran',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findOneByEmail(email: string): Promise<User | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const user = this.users.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return undefined;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
