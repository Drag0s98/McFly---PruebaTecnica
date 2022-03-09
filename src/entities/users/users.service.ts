import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserInput } from './dto/newUser.input';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModule: Model<User>,
  ) {}

  async create(userData: NewUserInput) {
    return await new this.usersModule({
      ...userData,
      createAt: new Date(),
    }).save();
  }
}
