import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import {
  expiresRefreshToken,
  msecToSecond,
  nameAccessToken,
  nameRefreshToken,
} from '../../config/appConfigs';
import { TokenService } from '../token/token.service';

type PayloadToken = null | { email: string; sub: number };

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisCacheService: RedisCacheService,
    private readonly tokenService: TokenService,
  ) {
    //
  }

  throwUnAuthorized(message: string): void {
    throw new HttpException(message, HttpStatus.UNAUTHORIZED);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneValidateUser(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(req, res): Promise<any> {
    const userBody: any = req.body;
    const user = await this.usersService.findOneByEmail(userBody.username);
    if (!user) this.throwUnAuthorized('Login: user not found');

    const payload: PayloadToken = { email: user.email, sub: user.id };
    const accessToken = this.tokenService.generateTokenAccess(payload);
    const refreshToken = this.tokenService.generateTokenRefresh(payload);

    await this.redisCacheService.saveTokenRefresh(
      refreshToken,
      msecToSecond(expiresRefreshToken), // Note: Expires in Seconds
    );

    res.cookie(nameRefreshToken, refreshToken, {
      maxAge: expiresRefreshToken,
      httpOnly: true,
    });

    return res.send({
      [nameAccessToken]: accessToken,
      user,
    });
  }

  async refresh(req, res) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) this.throwUnAuthorized('Refresh token not found');

    const isValid = await this.tokenService.validateRefreshToken(refreshToken);
    if (!isValid) this.throwUnAuthorized('Refresh: the token is not valid');

    const isCache = await this.redisCacheService.readTokenRefresh(refreshToken);
    if (!isCache) this.throwUnAuthorized('Refresh token not found in cache');

    const userData: any = this.tokenService.decodeToken(refreshToken);
    const { email } = userData;
    if (!email) this.throwUnAuthorized('Refresh: bad payload in token');

    const user = await this.usersService.findOneByEmail(email);
    if (!user) this.throwUnAuthorized('Refresh: user not found');

    const payload: PayloadToken = { email: user.email, sub: user.id };
    const accessToken = this.tokenService.generateTokenAccess(payload);

    return res.send({
      [nameAccessToken]: accessToken,
      user,
    });
  }
}
