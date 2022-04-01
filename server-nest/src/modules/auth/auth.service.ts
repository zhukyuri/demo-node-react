import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import {
  expiresRefreshToken,
  msecToSecond,
  nameAccessToken,
} from '../../config/appConfigs';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisCacheService: RedisCacheService,
    private readonly tokenService: TokenService,
  ) {
    //
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneValidateUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(req, res): Promise<any> {
    const userBody: any = req.body;
    const user = await this.usersService.findOneByEmail(userBody.username);
    const payload = { username: user.email, sub: user.id };
    const accessToken = this.tokenService.generateTokenAccess(payload);
    const refreshToken = this.tokenService.generateTokenRefresh(payload);

    await this.redisCacheService.saveTokenRefresh(
      refreshToken,
      msecToSecond(expiresRefreshToken), // Note: Expires in Seconds
    );

    res.set('Authorization', `Bearer ${refreshToken}`);
    res.cookie(nameAccessToken, refreshToken, {
      maxAge: expiresRefreshToken,
      httpOnly: true,
    });

    return res.send({
      [nameAccessToken]: accessToken,
      user,
    });
  }
}
