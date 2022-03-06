export default class UserDto {
  email;
  id;
  isActivate;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivate = model.isActivate;
  }
}
