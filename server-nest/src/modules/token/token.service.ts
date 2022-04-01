import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  expiresAccessTokenSrt,
  expiresRefreshTokenStr,
} from '../../config/appConfigs';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {
    //
  }

  generateTokenAccess(payload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_ACCESS,
      expiresIn: expiresAccessTokenSrt,
    });
  }

  generateTokenRefresh(payload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH,
      expiresIn: expiresRefreshTokenStr,
    });
  }

  validateAccessToken(token) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_ACCESS,
    });
  }

  validateRefreshToken(token) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_REFRESH,
    });
  }

  decodeToken(token) {
    return this.jwtService.decode(token);
  }
}
