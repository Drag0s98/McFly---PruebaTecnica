import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import LoginInput from './dto/login.input';
import { NewUserInput } from './dto/newUser.input';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: NewUserInput) {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    const user = await this.authService.validateUser(
      loginInput.email,
      loginInput.password,
    );

    if (user) {
      return this.authService.login(user);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  example(@Request() req) {
    return 'Helloo';
  }
}
