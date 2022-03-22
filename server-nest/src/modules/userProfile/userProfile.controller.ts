import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-userProfile.dto';
import { UserProfile } from './userProfile.entity';
import { UserProfileService } from './userProfile.service';
import { UpdateUserProfileDto } from './dto/update-userProfile.dto';

@Controller('profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {
    //
  }

  @Post()
  create(
    @Body() createUserProfile: CreateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.create(createUserProfile);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.update(id, updateUserProfileDto);
  }

  @Get()
  findAll(): Promise<UserProfile[]> {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserProfile> {
    return this.userProfileService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userProfileService.delete(id);
  }
}
