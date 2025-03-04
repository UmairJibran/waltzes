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
  async update(@Body() updateUserDto: UpdateUserDto, @User() user: JwtPayload) {
    const updatedUser = await this.usersService.update(user.sub, updateUserDto);
    return updatedUser;
  }

  @Get('me/linkedin')
  getUserLinkedin(@User() user: JwtPayload) {
    return this.usersService.getUserLinkedin(user.sub);
  }

  @Patch('me/linkedin')
  async updateUserLinkedin(
    @Body() updateUserDto: UpdateUserDto,
    @User() user: JwtPayload,
  ) {
    const updatedUser = await this.usersService.updateUserLinkedin(
      user.sub,
      updateUserDto,
    );
    return updatedUser;
  }
}
