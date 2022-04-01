import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { expiresAccessTokenSrt } from '../../config/appConfigs';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: expiresAccessTokenSrt },
    }),
  ],
  exports: [TokenService],
  providers: [TokenService],
})
export class TokenModule {
  //
}
