import { Module } from '@nestjs/common';

import { CacheModule } from './cache/cache.module';
import { RedisCacheService } from './redis-cache.service';

@Module({
  imports: [CacheModule],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {
  //
}
