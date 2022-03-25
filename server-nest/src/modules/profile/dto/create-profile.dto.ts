import { SystemRole } from '../profile.entity';

export class CreateProfileDto {
  public firstName: string;
  public lastName: string;
  public userId: number;
  public systemRole?: SystemRole;

  constructor(payload) {
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.userId = payload.userId;
    if (payload.systemRole) this.systemRole = payload.systemRole;
  }
}
