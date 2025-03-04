import { Controller, Body, Patch, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/auth/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findOne(@User() user: JwtPayload) {
    return this.usersService.findOne(user.sub);
  }

  @Patch('me')
  update(@Body() updateUserDto: UpdateUserDto, @User() user: JwtPayload) {
    return this.usersService.update(user.sub, updateUserDto);
  }
}
