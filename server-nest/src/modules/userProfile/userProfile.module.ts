import { Module } from '@nestjs/common';
import { UserProfileService } from './userProfile.service';
import { UserProfileController } from './userProfile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './userProfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  providers: [UserProfileService],
  controllers: [UserProfileController],
})
export class UserProfileModule {
  //
}
