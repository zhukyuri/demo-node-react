import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-userProfile.dto';
import { UserProfile } from './userProfile.entity';
import { UserProfileService } from './userProfile.service';

@Controller('profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {
    //
  }

  @Post()
  create(@Body() createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
    return this.userProfileService.create(createUserProfileDto);
  }

  @Get()
  findAll(): Promise<UserProfile[]> {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  findOne(id): Promise<UserProfile> {
    return this.userProfileService.findOne(id);
  }

  @Delete(':id')
  delete(id): Promise<DeleteResult> {
    return this.userProfileService.delete(id);
  }
}
