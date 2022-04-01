import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/api')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    //
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    return this.authService.login(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  getProfile(@Req() req) {
    return req.user;
  }
}

// async login(@Body('username') username: string, @Body('password') password: string, @Res() res: Response) {
//     const token = await this.authService.validateUser(username, password);
//     res.set('Authorization', 'Bearer ' + token);
//     res.send({
//         success: true,
//         token,
//     })
// });

// @HttpCode(200)
// @UseGuards(LocalAuthenticationGuard)
// @Post('log-in')
// async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
//   const {user} = request;
//   const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
//   response.setHeader('Set-Cookie', cookie);
//   user.password = undefined;
//   return response.send(user);
// }
