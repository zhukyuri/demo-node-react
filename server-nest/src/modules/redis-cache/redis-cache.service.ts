import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { expiresRefreshToken } from '../../config/appConfigs';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {
    //
  }

  async setCache<T, V>(key: T, value: V, expires = 0): Promise<boolean> {
    if (!expires) {
      await this.cache.set(key, value);
    } else {
      await this.cache.set(key, value, { ttl: expires });
    }
    return !!(await this.cache.get(key));
  }

  async delCache<T>(key: T): Promise<boolean> {
    const isToken = await this.cache.get(key);
    if (isToken) {
      await this.cache.del(key);
    }
    return !(await this.cache.get(key));
  }

  async getCache<T>(key: T): Promise<any> {
    return await this.cache.get(key);
  }

  async saveTokenRefresh(
    token: string,
    expires = expiresRefreshToken,
  ): Promise<boolean> {
    return await this.setCache(token, true, expires);
  }

  async readTokenRefresh(token: string): Promise<string> {
    return await this.getCache(token);
  }

  async delTokenRefresh(token: string): Promise<boolean> {
    return await this.delCache(token);
  }
}
