export class UpdateUsersDto {
  public username?: string;
  public email?: string;
  public password?: string;

  constructor(payload) {
    if (payload.username) this.username = payload.username;
    if (payload.email) this.email = payload.email;
    if (payload.password) this.password = payload.password;
  }
}
