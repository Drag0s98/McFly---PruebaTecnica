import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MessageDto } from '../messages/dto/message.dto';
import { NotificationsDto } from '../messages/dto/notifications.dto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop(
    raw({
      firstName: { type: String },
      lastName: { type: String },
    }),
  )
  name: Record<string, any>;

  @Prop()
  aboutMe: string;

  @Prop({ default: false })
  isActive?: boolean;

  @Prop([
    raw({
      sender: { type: String },
      text: { type: String },
    }),
  ])
  notifications?: NotificationsDto;

  @Prop([
    raw({
      sender: { type: String },
      addressee: { type: String },
      text: { type: String },
    }),
  ])
  message?: MessageDto;
}

export const UsersSchema = SchemaFactory.createForClass(User);
