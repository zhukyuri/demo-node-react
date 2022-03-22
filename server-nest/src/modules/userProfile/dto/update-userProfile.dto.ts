import { SystemRole } from '../userProfile.entity';

export class UpdateUserProfileDto {
  public firstName?: string;
  public lastName?: string;
  public systemRole?: SystemRole;

  constructor(payload) {
    if (payload.firstName) this.firstName = payload.firstName
    if (payload.lastName) this.lastName = payload.lastName
    if (payload.systemRole) this.systemRole = payload.systemRole
  }
}
