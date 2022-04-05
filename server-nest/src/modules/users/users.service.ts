import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { ResponseUsersDto } from './dto/response-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ValidateUsersDto } from './dto/validate-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    //
  }

  async create(dataUsersDto: CreateUsersDto): Promise<Users> {
    return await this.usersRepository.save(dataUsersDto);
  }

  async update(id: number, dataUserDto: UpdateUsersDto): Promise<Users> {
    await this.usersRepository.update(id, dataUserDto);

    return await this.usersRepository.findOne(id);
  }

  async findAll(): Promise<ResponseUsersDto[]> {
    const res = await this.usersRepository.find();

    return res.map((i) => new ResponseUsersDto(i));
  }

  // TODO add <ResponseUsersDto | null> to type
  async findOne(id: number): Promise<ResponseUsersDto> {
    const res = await this.usersRepository.findOne(id);

    return new ResponseUsersDto(res);
  }

  // TODO add <ResponseUsersDto | null> to type
  async findOneByEmail(email: string): Promise<ResponseUsersDto | null> {
    const res = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    return !res ? null : new ResponseUsersDto(res);
  }

  // TODO add <ResponseUsersDto | null> to type
  async findOneValidateUser(email: string): Promise<ValidateUsersDto> {
    const res = await this.usersRepository.findOne({
      select: ['id', 'name', 'password', 'email'],
      where: {
        email,
      },
    });

    return !res ? null : new ValidateUsersDto(res);
  }

  // TODO add <ResponseUsersDto | null> to type
  async findOneProfile(id: number): Promise<ResponseUsersDto> {
    return await this.usersRepository.findOne(id, {
      relations: ['profile'],
      select: ['id', 'name', 'email', 'isActivate', 'createAt', 'updateAt'],
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
