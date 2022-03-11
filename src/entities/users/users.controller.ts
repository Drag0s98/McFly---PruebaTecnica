import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import LoginInput from './dto/login.dto';
import { NewUserDto } from './dto/newUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Get('activeUsers')
  async getActiveUsers() {
    return await this.usersService.getActiveUsers();
  }

  @Post()
  async create(@Body() createUserDto: NewUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginInput: LoginInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(
      loginInput.email,
      loginInput.password,
    );
    if (user) {
      return this.authService.login(user._doc.email, response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateUserDto: NewUserDto, @Req() request) {
    return await this.usersService.update(request.user.email, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUser(@Req() request) {
    return await this.usersService.findByEmail(request.user.email);
  }
}
