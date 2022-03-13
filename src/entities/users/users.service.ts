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
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersModel.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersModel.findOne({ email: email });
  }

  async findMany(emails: string[]): Promise<User[]> {
    return await this.usersModel.find().where('email').in(emails).exec();
  }

  async create(userData: NewUserDto): Promise<User> {
    userData.password = await hash(userData.password, 12);

    const user = await this.findByEmail(userData.email);

    if (!user) {
      return await new this.usersModel({
        ...userData,
        createAt: new Date(),
      }).save();
    }
    throw new NotFoundException('User already exits');
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!updateUserDto.message) {
      return await this.usersModel.findOneAndUpdate(
        { email: email },
        updateUserDto,
      );
    }

    if (updateUserDto.message) {
      return await this.usersModel.findOneAndUpdate(
        { email: email },
        { $push: updateUserDto },
      );
    }
  }

  async getActiveUsers(): Promise<User[]> {
    const users = await this.findAll();
    return users.filter((user) => !!user.isActive);
  }

  async addNotification(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersModel.findOneAndUpdate(
      { email: email },
      { $push: updateUserDto },
    );
  }

  async changeStatus(email: string): Promise<User> {
    const user = await this.findByEmail(email);
    await this.usersModel.updateOne(
      { email: email },
      { isActive: !user.isActive },
    );
    return user;
  }
}
