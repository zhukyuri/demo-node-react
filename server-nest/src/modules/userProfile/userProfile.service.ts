import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-userProfile.dto';
import { UserProfile } from './userProfile.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile) private readonly userProfileRepository: Repository<UserProfile>,
  ) {
    //
  }

  async create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
    const userProfile = new UserProfile();
    userProfile.firstName = createUserProfileDto.firstName;
    userProfile.lastName = createUserProfileDto.lastName;

    return await this.userProfileRepository.save(userProfile);
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
