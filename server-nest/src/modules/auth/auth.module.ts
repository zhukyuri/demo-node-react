import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { expiresAccessTokenSrt } from '../../config/appConfigs';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // secret: process.env.JWT_SECRET_ACCESS,
      signOptions: { expiresIn: expiresAccessTokenSrt },
    }),
    RedisCacheModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  //
}
