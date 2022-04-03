import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // !!! FOR EXAMPLE !!!  // TODO remove
  //
  // handleRequest(err, user, info, context, _status) {
  //   const request = context.switchToHttp().getRequest();
  //
  //   const { email, password } = request.body;
  //   if (!email) {
  //     throw new HttpException({ message: 'email' }, HttpStatus.OK);
  //   }
  //   if (!password) {
  //     throw new HttpException({ message: 'password' }, HttpStatus.OK);
  //   }
  //   return user;
  // }
}
