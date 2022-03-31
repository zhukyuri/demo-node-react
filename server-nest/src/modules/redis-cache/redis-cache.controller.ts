import { Body, Controller, Put } from '@nestjs/common';

import { RedisCacheService } from './redis-cache.service';

@Controller('/redis-test')
export class RedisCacheController {
  constructor(private readonly appService: RedisCacheService) {
    //
  }

  @Put()
  async saveTokenRefresh(
    @Body() { token }: { token: string },
  ): Promise<string> {
    await this.appService.setTokenRefresh(token);

    return token;
  }
}
