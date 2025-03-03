import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { User as UserEntity } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private users: Model<User>) {}

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.users.findOne({
      email,
    });

    if (user) {
      const response: UserEntity = {
        _id: String(user.id),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        portfolioUrl: user.portfolioUrl,
        linkedinUsername: user.linkedinUsername,
        githubUsername: user.githubUsername,
        additionalInstructions: user.additionalInstructions,
        password: user.password,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return response;
    }
    return null;
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
