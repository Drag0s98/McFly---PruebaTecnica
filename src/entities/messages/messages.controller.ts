import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { MessageDto } from './dto/message.dto';
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendMessage(
    @Body() messageInput: MessageDto,
    @Request() req,
  ): Promise<MessageDto> {
    return await this.messageService.sendMessage(messageInput, req.user.email);
  }
}
