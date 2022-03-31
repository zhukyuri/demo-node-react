import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import {
  expiresAccessTokenSrt,
  expiresRefreshToken,
  expiresRefreshTokenStr,
  msecToMinute,
} from '../../config/appConfigs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
  ) {
    //
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneValidateUser(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_ACCESS,
      expiresIn: expiresAccessTokenSrt,
    });
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
