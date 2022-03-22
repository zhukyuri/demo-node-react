import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-userProfile.dto';
import { UserProfile } from './userProfile.entity';
import { UpdateUserProfileDto } from './dto/update-userProfile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {
    //
  }

  async create(
    createUserProfile: CreateUserProfileDto,
  ): Promise<UserProfile> {
    const userProfile = new CreateUserProfileDto(createUserProfile);

    return await this.userProfileRepository.save(userProfile);
  }

  async update(
    id: number,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    const userProfile = new UpdateUserProfileDto(updateUserProfileDto);

    await this.userProfileRepository.update(id, userProfile);

    return await this.userProfileRepository.findOne(id);
  }

  async findAll(): Promise<UserProfile[]> {
    return await this.userProfileRepository.find();
  }

  async findOne(id: number): Promise<UserProfile> {
    return await this.userProfileRepository.findOne(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userProfileRepository.delete(id);
  }
}
