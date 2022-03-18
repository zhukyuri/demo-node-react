import jwt from "jsonwebtoken"
import redis from '../redis/redis-cli';
import { expiresAccessTokenSrt, expiresRefreshTokenStr } from '../configs/appConfigs';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

class TokenRedisService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: expiresAccessTokenSrt })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: expiresRefreshTokenStr })

    return { accessToken, refreshToken }
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    } catch (e) {
      return null;
    }
  }

  async saveToken(token, expires = 0) {
    const isToken = await redis.get(token);
    if (!isToken) {
      if (expires) {
        await redis.set(token, true, 'px', expires);
      } else {
        await redis.set(token, true);
      }
    }
    return !!(await redis.get(token));
  }

  async removeToken(token) {
    const isToken = await redis.get(token);
    if (isToken) {
      await redis.del(token);
    }
    return !!(await redis.get(token));
  }

  async findToken(token) {
    return !!(await redis.get(token));
  }
}

export default new TokenRedisService();
