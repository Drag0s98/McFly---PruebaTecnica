import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserInput } from './dto/newUser.input';
import { User, UserDocument } from './users.schema';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModule: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.usersModule.findOne({ email: email });
  }

  async create(userData: NewUserInput): Promise<User> {
    userData.password = await hash(userData.password, 12);

    const user = await this.findByEmail(userData.email);

    if (!user) {
      return await new this.usersModule({
        ...userData,
        createAt: new Date(),
      }).save();
    }
    throw new NotFoundException('User already exits');
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (user && password) {
      const isPasswordValid = await compare(password, user.password);
      if (isPasswordValid) {
        return user;
      }
      throw new NotFoundException('Password wrong');
    }
    throw new NotFoundException('User not found');
  }
}
