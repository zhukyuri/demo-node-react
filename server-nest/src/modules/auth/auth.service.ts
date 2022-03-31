import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { expiresRefreshToken, msecToMinute } from '../../config/appConfigs';
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
    const accessToken = this.tokenService.generateTokenAccess(payload);
    const refreshToken = this.tokenService.generateTokenRefresh(payload);

    await this.redisCacheService.saveTokenRefresh(
      refreshToken,
      msecToMinute(expiresRefreshToken),
    );

    console.log(expiresRefreshToken, msecToMinute(expiresRefreshToken));

    return {
      access_token: accessToken,
    };
  }
}
