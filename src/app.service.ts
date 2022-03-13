import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomeMessage(): string {
    return 'This is a messaging API, in which you can register and log in to be able to send or receive messages, as well as consult information about other users, such as their activity status. See the README for the different endpoints.';
  }
}
