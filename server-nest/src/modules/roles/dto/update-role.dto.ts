export class UpdateRoleDto {
  public name?: string;
  public key?: string;

  constructor(payload) {
    if (payload.name) this.name = payload.name;
    if (payload.key) this.key = payload.key;
  }
}
