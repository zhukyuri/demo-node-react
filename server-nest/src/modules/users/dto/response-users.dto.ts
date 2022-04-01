import { Users } from '../users.entity';

export class ResponseUsersDto {
  public id: number;
  public name: string;
  public email: string;
  public isActivate: boolean;
  public updateAt: Date;
  public createAt: Date;

  constructor(payload: Users) {
    this.id = payload.id;
    this.name = payload.name;
    this.email = payload.email;
    this.updateAt = payload.updateAt;
    this.createAt = payload.createAt;
    this.isActivate = payload.isActivate;
  }
}
