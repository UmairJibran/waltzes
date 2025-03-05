import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { SqsProducerService } from 'src/sqs-producer/sqs-producer.service';
import { availableQueues } from 'src/sqs-producer/constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sqsProducerService: SqsProducerService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    // FIXME: `Unsafe assignment of an error typed value.`
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload: Partial<JwtPayload> = {
      sub: user._id,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(user: RegisterUserDto) {
    const password = await bcrypt.hash(user.password, 10);
    const createdUser = await this.usersService.create({ ...user, password });
    if (!createdUser) {
      throw new UnauthorizedException();
    }

    const payload: Partial<JwtPayload> = {
      sub: createdUser._id,
      email: createdUser.email,
    };
    await this.sqsProducerService.sendMessage(
      {
        to: createdUser.email,
        subject: 'Welcome to Waltzes',
        text: 'You have successfully registered!',
      },
      availableQueues.sendEmail,
      createdUser._id,
      createdUser._id,
    );
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
