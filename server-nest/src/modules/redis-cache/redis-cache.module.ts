import { Module } from '@nestjs/common';

import { CacheModule } from './cache/cache.module';
import { RedisCacheController } from './redis-cache.controller';
import { RedisCacheService } from './redis-cache.service';

@Module({
  imports: [CacheModule],
  controllers: [RedisCacheController],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {
  //
}
