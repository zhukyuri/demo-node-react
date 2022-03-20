import { Module } from '@nestjs/common';
import { UserProfileService } from './userProfile.service';
import { UserProfileController } from './userProfile.controller';

@Module({
  providers: [UserProfileService],
  controllers: [UserProfileController],
})
export class UserProfileModule {
  //
}
