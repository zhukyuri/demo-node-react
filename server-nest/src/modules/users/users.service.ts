import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { ResponseUsersDto } from './dto/response-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    //
  }

  async create(dataUsersDto: CreateUsersDto): Promise<Users> {
    const user = new CreateUsersDto(dataUsersDto);

    return await this.usersRepository.save(user);
  }

  async update(id: number, dataUserDto: UpdateUsersDto): Promise<Users> {
    const user = new UpdateUsersDto(dataUserDto);
    await this.usersRepository.update(id, user);

    return await this.usersRepository.findOne(id);
  }

  async findAll(): Promise<ResponseUsersDto[]> {
    const res = await this.usersRepository.find();

    return res.map((i) => new ResponseUsersDto(i));
  }

  async findOne(id: number): Promise<ResponseUsersDto> {
    const res = await this.usersRepository.findOne(id);

    return new ResponseUsersDto(res);
  }

  async findOneProfile(id: number): Promise<ResponseUsersDto> {
    return await this.usersRepository.findOne(id, {
      relations: ['profile'],
      select: ['id', 'username', 'email', 'isActivate', 'createAt', 'updateAt'],
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

}
