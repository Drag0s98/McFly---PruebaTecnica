import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
  ],
  controllers: [],
  exports: [],
})
export class UsersModule {}
