import { Tokens } from '../service/token-redis-service';

export default class TokenDto {
  token;

  constructor(tokens: Tokens) {
    this.token = tokens.accessToken;
  }
}
