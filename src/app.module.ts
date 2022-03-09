import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://drag0s98:123prueba123@cluster0.lk7uu.mongodb.net/test',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
