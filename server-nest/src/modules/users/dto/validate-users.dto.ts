export class ValidateUsersDto {
  public id: number;
  public name: string;
  public email: string;
  public password: string;

  constructor(payload) {
    this.id = payload.id;
    this.name = payload.name;
    this.email = payload.email;
    this.password = payload.password;
  }
}
