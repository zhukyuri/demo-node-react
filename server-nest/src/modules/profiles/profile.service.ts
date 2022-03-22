import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly userProfileRepository: Repository<Profile>,
  ) {
    //
  }

  async create(
    createProfile: CreateProfileDto,
  ): Promise<Profile> {
    const userProfile = new CreateProfileDto(createProfile);

    return await this.userProfileRepository.save(userProfile);
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const userProfile = new UpdateProfileDto(updateProfileDto);

    await this.userProfileRepository.update(id, userProfile);

    return await this.userProfileRepository.findOne(id);
  }

  async findAll(): Promise<Profile[]> {
    return await this.userProfileRepository.find();
  }

  async findOne(id: number): Promise<Profile> {
    return await this.userProfileRepository.findOne(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userProfileRepository.delete(id);
  }
}
