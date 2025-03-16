import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { User as UserEntity } from './entities/user.entity';
import { Model, ObjectId } from 'mongoose';
import { SqsProducerService } from 'src/aws/sqs-producer/sqs-producer.service';
import { createHash } from 'crypto';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private users: Model<User>,
    private readonly sqsProducerService: SqsProducerService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly configService: ConfigService,
  ) {}

  async isUserPro({
    id,
    email,
  }: {
    id?: string;
    email?: string;
  }): Promise<boolean> {
    let userEmail = email;
    if (!userEmail) {
      const user = await this.users.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      userEmail = user.email;
    }

    const subscription = await this.subscriptionsService.findByEmail(
      userEmail,
      {
        active: true,
      },
    );

    return subscription ? true : false;
  }

  async findOne(id: string): Promise<Partial<UserEntity> | null> {
    const user = await this.users.findById(id);

    if (user) {
      const isUserPro = await this.isUserPro({
        id,
        email: user.email,
      });
      const response: Partial<UserEntity & { isPro: boolean }> = {
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
        isPro: isUserPro ? true : false,
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
          'linkedinScraper',
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
      const baseUrl: string = await this.configService.getOrThrow('baseUrl');
      const callbackUrl = new URL(
        [baseUrl, '/api/_internal/users/', user._id, 'linkedin'].join(''),
      );

      const checkValue: string = createHash('sha256')
        .update(user.password)
        .digest('hex');
      callbackUrl.searchParams.append('check-value', checkValue);
      await this.sqsProducerService.sendMessage(
        {
          linkedinUsername: updateUserDto.linkedinUsername,
          callbackUrl: callbackUrl.toString(),
        },
        'linkedinScraper',
        id + updateUserDto.linkedinUsername,
        id + updateUserDto.linkedinUsername,
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

  async updateLinkedinFromWebhook(
    id: string,
    linkedinScrapedData: object,
    checkValue: string,
  ): Promise<object | undefined> {
    const user = await this.users.findById(id);

    if (user) {
      const calculatedCheckValue: string = createHash('sha256')
        .update(user.password)
        .digest('hex');
      if (checkValue === calculatedCheckValue) {
        user.linkedinScrapedData = linkedinScrapedData;
        await user.save();
        return user.linkedinScrapedData;
      }
    }
    return;
  }

  async recordMeteredUsage(
    userId: ObjectId,
    meterAmount: number = 1,
  ): Promise<void> {
    const user = await this.users.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await this.subscriptionsService.meteredUsageByUserEmail(
      user.email,
      meterAmount,
    );
  }
}
