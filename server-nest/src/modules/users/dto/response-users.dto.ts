import { Users } from '../users.entity';

export class ResponseUsersDto {
  public id: number;
  public username: string;
  public email: string;
  public isActivate: boolean;

  constructor(payload: Users) {
    this.id = payload.id;
    this.username = payload.username;
    this.email = payload.email;
    this.isActivate = payload.isActivate;
  }
}
