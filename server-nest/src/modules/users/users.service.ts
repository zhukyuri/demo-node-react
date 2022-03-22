import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserRoles } from '../userRoles/user-roles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    //
  }

  async create(dataUserDto: CreateUserDto): Promise<User> {
    const user = new CreateUserDto(dataUserDto);

    return await this.userRepository.save(user);
  }

  async update(id: number, dataUserDto: UpdateUserDto): Promise<User> {
    const user = new UpdateUserDto(dataUserDto);
    await this.userRepository.update(id, user);

    return await this.userRepository.findOne(id);
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const res = await this.userRepository.find();

    return res.map((i) => new ResponseUserDto(i));
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    const res = await this.userRepository.findOne(id);

    return new ResponseUserDto(res);
  }

  async findOneProfile(id: number): Promise<ResponseUserDto> {
    return await this.userRepository.findOne(
      id,
      {
        relations: ['profile'],
        select: ['id', 'username', 'email', 'isActivate', 'createAt', 'updateAt'],
      });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
