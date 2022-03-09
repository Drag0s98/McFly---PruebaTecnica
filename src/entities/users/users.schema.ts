import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  isActive: boolean;

  @Prop([String])
  notifications: string[];
}

export const UsersSchema = SchemaFactory.createForClass(User);
