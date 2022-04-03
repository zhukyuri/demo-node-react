import {
  IsEmail,
  IsNotEmpty,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsersDto {
  @Length(8, 50)
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  public password: string;
}
