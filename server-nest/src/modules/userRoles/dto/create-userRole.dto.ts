import { Roles } from '../../roles/roles.entity';
import { User } from '../../users/user.entity';

export class CreateUserRoleDto {
  public roles: Roles;
  public user: User;

  constructor(payload) {
    this.roles = payload.roles;
    this.user = payload.user;
  }
}
