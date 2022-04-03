import {
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
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
  async login(@Req() req, @Res() res) {
    return this.authService.login(req, res);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/registration')
  async registration(@Req() req, @Res() res) {
    return this.authService.registration(req, res);
  }

  @Get('/refresh')
  async refresh(@Req() req, @Res() res) {
    return this.authService.refresh(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Req() req, @Res() res) {
    return this.authService.logout(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:userId')
  async delete(@Req() req, @Res() res) {
    return this.authService.delete(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test-guard')
  getProfile(@Req() req) {
    return req.user;
  }
}
