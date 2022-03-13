import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../../auth/auth.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { NewUserDto } from './dto/newUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { validateEmail } from 'src/utils/validateEmail';

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

  @UseGuards(JwtAuthGuard)
  @Get('activeUsers')
  async getActiveUsers() {
    return await this.usersService.getActiveUsers();
  }

  @Post()
  async create(@Body() createUserDto: NewUserDto) {
    const isEmail = validateEmail(createUserDto.email);
    if (isEmail) {
      return await this.usersService.create(createUserDto);
    }
    throw new HttpException('Wrong email', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() LoginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(
      LoginDto.email,
      LoginDto.password,
    );
    if (user) {
      return this.authService.login(user._doc.email, response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() request) {
    return await this.usersService.update(request.user.email, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUser(@Req() request) {
    return await this.usersService.findByEmail(request.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('status')
  async changeStatus(@Req() request) {
    return await this.usersService.changeStatus(request.user.email);
  }
}
