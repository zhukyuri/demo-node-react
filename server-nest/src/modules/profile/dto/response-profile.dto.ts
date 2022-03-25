import { Profile, SystemRole } from '../profile.entity';

export class ResponseProfileDto {
  public id: number;
  public firstName: string;
  public lastName: string;
  public systemRole: SystemRole;
  public createAt: Date;
  public updateAt: Date;

  constructor(payload: Profile) {
    this.id = payload.id;
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.systemRole = payload.systemRole;
    this.createAt = payload.createAt;
    this.updateAt = payload.updateAt;
  }
}
