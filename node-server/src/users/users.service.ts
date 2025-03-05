import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { User as UserEntity } from './entities/user.entity';
import { Model } from 'mongoose';
import { SqsProducerService } from 'src/aws/sqs-producer/sqs-producer.service';
import { availableQueues } from 'src/aws/sqs-producer/constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private users: Model<User>,
    private readonly sqsProducerService: SqsProducerService,
  ) {}

  async findOne(id: string): Promise<Partial<UserEntity> | null> {
    const user = await this.users.findById(id);

    if (user) {
      const response: Partial<UserEntity> = {
        _id: String(user.id),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        portfolioUrl: user.portfolioUrl,
        linkedinUsername: user.linkedinUsername,
        githubUsername: user.githubUsername,
        additionalInstructions: user.additionalInstructions,
        role: user.role,
      };

      return response;
    }
    return null;
  }

  async getUserLinkedin(id: string): Promise<object | undefined> {
    const user = await this.users.findById(id);

    if (user) {
      return user.linkedinScrapedData;
    }
    return;
  }

  async updateUserLinkedin(
    id: string,
    linkedinScrapedData: object,
  ): Promise<object | undefined> {
    const user = await this.users.findById(id);

    if (user) {
      user.linkedinScrapedData = linkedinScrapedData;
      await user.save();
      return user.linkedinScrapedData;
    }
    return;
  }

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

  async create(createUserDto: CreateUserDto): Promise<UserEntity | null> {
    const user = await this.users.create(createUserDto);
    if (user) {
      const createdId = String(user.id);
      if (user.linkedinUsername) {
        await this.sqsProducerService.sendMessage(
          {
            linkedinUsername: user.linkedinUsername,
            userId: createdId,
          },
          availableQueues.linkedinScraper,
          createdId,
          createdId,
        );
      }
      const response: UserEntity = {
        _id: createdId,
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.users.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (updateUserDto.linkedinUsername !== user.linkedinUsername) {
      await this.sqsProducerService.sendMessage(
        {
          linkedinUsername: user.linkedinUsername,
          userId: id,
        },
        availableQueues.linkedinScraper,
        id,
        id,
      );
    }

    user.githubUsername = updateUserDto.githubUsername;
    user.linkedinUsername = updateUserDto.linkedinUsername;
    user.portfolioUrl = updateUserDto.portfolioUrl;
    user.additionalInstructions = updateUserDto.additionalInstructions;
    user.phone = updateUserDto.phone;
    if (updateUserDto.firstName) user.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName) user.lastName = updateUserDto.lastName;

    await user.save();

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
}
