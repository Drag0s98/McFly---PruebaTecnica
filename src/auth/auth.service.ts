import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/entities/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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

  login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
