import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsOptional()
  public sender: string;

  @IsString()
  @IsNotEmpty()
  public addressee: string;

  @IsString()
  @IsNotEmpty()
  public text: string;
}
