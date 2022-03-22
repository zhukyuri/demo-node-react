import { SystemRole } from '../userProfile.entity';

export class CreateUserProfileDto {
  public firstName: string;
  public lastName: string;
  public systemRole?: SystemRole;

  constructor(payload) {
    this.firstName = payload.firstName
    this.lastName = payload.lastName
    if (payload.systemRole) this.systemRole = payload.systemRole
  }
}
