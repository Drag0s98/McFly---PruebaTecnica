import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../users/users.schema';
import MessageDto from './dto/message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getMessages(@Request() req) {
    return this.messageService.getMessageByEmail(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('notifications')
  getNotifications(@Request() req) {
    return this.messageService.getNotificationsByEmail(req.user.email);
  }

  @Put()
  async sendMessage(@Body() messageInput: MessageDto) {
    return await this.messageService.sendMessage(messageInput);
  }
}
