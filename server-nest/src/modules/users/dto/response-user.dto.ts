import { User } from '../user.entity';

export class ResponseUserDto {
  public id: number;
  public username: string;
  public email: string;
  public isActivate: boolean;

  constructor(payload: User) {
    this.id = payload.id;
    this.username = payload.username;
    this.email = payload.email;
    this.isActivate = payload.isActivate;
  }
}
