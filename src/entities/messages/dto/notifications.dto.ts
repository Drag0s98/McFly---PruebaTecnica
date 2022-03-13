import { IsNotEmpty, IsString } from 'class-validator';

export class NotificationsDto {
  @IsString()
  @IsNotEmpty()
  public sender: string;

  @IsString()
  @IsNotEmpty()
  public text: string;
}
