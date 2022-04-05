import { IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';

export class UpdateUsersDto {
  @Length(8, 50)
  @IsNotEmpty()
  public name?: string;

  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  public password?: string;
}
