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

  @Get('/refresh')
  async refresh(@Request() req, @Response() res) {
    return this.authService.refresh(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  getProfile(@Req() req) {
    return req.user;
  }
}
