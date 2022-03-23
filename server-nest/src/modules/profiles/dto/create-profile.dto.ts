import { SystemRole } from '../profile.entity';

export class CreateProfileDto {
  public firstName: string;
  public lastName: string;
  public systemRole?: SystemRole;

  constructor(payload) {
    this.firstName = payload.firstName
    this.lastName = payload.lastName
    if (payload.systemRole) this.systemRole = payload.systemRole
  }
}
