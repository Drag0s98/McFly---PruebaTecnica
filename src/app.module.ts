import { Module } from '@nestjs/common';
import { UsersModule } from './entities/users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './entities/messages/messages.module';
import * as dotenv from 'dotenv';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
