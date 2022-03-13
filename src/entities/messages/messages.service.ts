import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../users/users.schema';
import { UsersService } from '../users/users.service';
import { MessageDto } from './dto/message.dto';
import { NotificationsDto } from './dto/notifications.dto';

@Injectable()
export class MessagesService {
  constructor(private usersService: UsersService) {}

  async addNotification(
    messageInput: MessageDto,
    sender: string,
  ): Promise<User> {
    return await this.usersService.addNotification(messageInput.addressee, {
      notifications: { sender: sender, ...messageInput },
    });
  }

  async sendMessage(
    messageInput: MessageDto,
    sender: string,
  ): Promise<MessageDto> {
    const existUsers = await this.usersService.findMany([
      sender,
      messageInput.addressee,
    ]);

    const bothActive = existUsers.map((user) => {
      if (!user.isActive) {
        return user;
      }
    });

    if (
      existUsers.length === 2 &&
      messageInput.addressee !== sender &&
      bothActive.length === 0
    ) {
      await this.usersService.update(sender, {
        message: messageInput,
      });

      await this.addNotification(messageInput, sender);
      return messageInput;
    }
    throw new HttpException('Failed message', HttpStatus.BAD_REQUEST);
  }

  async getMessageByEmail(email: string): Promise<MessageDto> {
    const user = await this.usersService.findByEmail(email);
    return user.message;
  }

  async getNotificationsByEmail(email: string): Promise<NotificationsDto> {
    const user = await this.usersService.findByEmail(email);
    return user.notifications;
  }
}
