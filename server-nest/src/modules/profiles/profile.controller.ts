import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userProfileService: ProfileService) {
    //
  }

  @Post()
  create(
    @Body() createProfile: CreateProfileDto,
  ): Promise<Profile> {
    return this.userProfileService.create(createProfile);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.userProfileService.update(id, updateProfileDto);
  }

  @Get()
  findAll(): Promise<Profile[]> {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Profile> {
    return this.userProfileService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userProfileService.delete(id);
  }
}
