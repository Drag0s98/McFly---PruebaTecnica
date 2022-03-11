import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/entities/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Response } from 'express';
import { User } from 'src/entities/users/users.schema';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isPasswordValid = await compare(pass, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(email: string, response: Response) {
    const jwt = await this.jwtService.signAsync({ email: email });
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      access_token: jwt,
    };
  }
}
