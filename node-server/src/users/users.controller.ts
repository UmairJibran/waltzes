import { Controller, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/auth/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @User() user: JwtPayload) {
    return this.usersService.update(user.sub, updateUserDto);
  }
}
