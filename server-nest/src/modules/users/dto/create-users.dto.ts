export class CreateUsersDto {
  public name: string;
  public email: string;
  public password: string;

  constructor(payload) {
    this.name = payload.name;
    this.email = payload.email;
    this.password = payload.password;
  }
}
