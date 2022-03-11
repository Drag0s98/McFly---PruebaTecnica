import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from './dto/newUser.dto';
import { User, UserDocument } from './users.schema';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModule: Model<UserDocument>,
  ) {}

  async findAll() {
    return await this.usersModule.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersModule.findOne({ email: email });
  }

  async create(userData: NewUserDto): Promise<User> {
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

  async update(email: string, updateUserDto: UpdateUserDto) {
    if (!updateUserDto.message) {
      return await this.usersModule.findOneAndUpdate(
        { email: email },
        updateUserDto,
      );
    }

    if (updateUserDto.message) {
      await this.usersModule.findOneAndUpdate(
        { email: email },
        { $push: updateUserDto },
      );
    }
  }

  async getActiveUsers() {
    const users = await this.findAll();
    return users.filter((user) => !!user.isActive);
  }

  async addNotification(email: string, updateUserDto: UpdateUserDto) {
    await this.usersModule.findOneAndUpdate(
      { email: email },
      { $push: updateUserDto },
    );
  }

  async changeStatus(email: string) {
    const user = await this.findByEmail(email);
    await this.usersModule.updateOne(
      { email: email },
      { isActive: !user.isActive },
    );
    return user;
  }
}
