export class ValidateUsersDto {
  public id: number;
  public username: string;
  public email: string;
  public password: string;

  constructor(payload) {
    this.id = payload.id;
    this.username = payload.username;
    this.email = payload.email;
    this.password = payload.password;
  }
}
