import { Roles } from '../../roles/roles.entity';
import { Users } from '../../users/users.entity';

export class CreateUserRoleDto {
  public roles: Roles;
  public user: Users;

  constructor(payload) {
    this.roles = payload.roles;
    this.user = payload.user;
  }
}
