export class UpdateUsersDto {
  public name?: string;
  public email?: string;
  public password?: string;

  constructor(payload) {
    if (payload.name) this.name = payload.name;
    // if (payload.email) this.email = payload.email;  // TODO Email should not be updated
    if (payload.password) this.password = payload.password;
  }
}
