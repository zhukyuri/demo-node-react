import { Body, Controller, Get, Put } from '@nestjs/common';

import { RedisCacheService } from './redis-cache.service';

@Controller('/redis-test')
export class RedisCacheController {
  constructor(private readonly appService: RedisCacheService) {}

  @Put()
  async putHello(@Body() { name }: { name: string }): Promise<string> {
    await this.appService.setHello(name);

    return name;
  }

  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
