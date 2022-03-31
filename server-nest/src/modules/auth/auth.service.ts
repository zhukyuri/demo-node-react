import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import {
  expiresAccessToken,
  expiresAccessTokenSrt,
  expiresRefreshToken,
  expiresRefreshTokenStr,
  msecToMinute,
} from '../../config/appConfigs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
  ) {
    //
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH,
      expiresIn: expiresRefreshTokenStr,
    });

    await this.redisCacheService.setTokenRefresh(
      refreshToken,
      msecToMinute(expiresRefreshToken),
    );

    return {
      access_token: accessToken,
    };
  }
}
