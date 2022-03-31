export class ValidateUsersDto {
  public username: string;
  public email: string;
  public password: string;

  constructor(payload) {
    this.username = payload.username;
    this.email = payload.email;
    this.password = payload.password;
  }
}
