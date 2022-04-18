import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/test')
  async test() {
    return 'Test Demo Code !!!';
  }

  @Get()
  async hello() {
    return 'Hello Demo Code !!!';
  }
}
