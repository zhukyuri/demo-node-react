export default class UserDto {
  email;
  id;
  isActivate;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivate = model.isActivate;
  }
}
