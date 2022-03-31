import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { expiresRefreshToken, nameAccessToken } from '../../config/appConfigs';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {
    //
  }

  async setTokenRefresh(
    token = nameAccessToken,
    expires = expiresRefreshToken,
  ): Promise<boolean> {
    await this.cache.set(token, true, { ttl: expires });

    return true;
  }

  async getTokenRefresh(token = nameAccessToken): Promise<string> {
    return await this.cache.get(token);
  }

  async delTokenRefresh(token = nameAccessToken): Promise<boolean> {
    await this.cache.del(token);

    return true;
  }
}
