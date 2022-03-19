export default class UserDto {
  id;
  email;
  username;
  isActivate;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.username = model.username;
    this.isActivate = model.isActivate;
  }
}
