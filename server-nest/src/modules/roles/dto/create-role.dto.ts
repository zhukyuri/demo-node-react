export class CreateRoleDto {
  public name: string;
  public key: string;

  constructor(payload) {
    this.name = payload.name;
    this.key = payload.key;
  }
}
