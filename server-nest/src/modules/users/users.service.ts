import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    //
  }

  async create(dataUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = dataUserDto.username;
    user.email = dataUserDto.email;
    user.password = dataUserDto.password;

    return await this.userRepository.save(user);
  }

  async update(id: number, dataUserDto: UpdateUserDto): Promise<User> {
    const user = new User();
    if (dataUserDto.username) user.username = dataUserDto.username;
    if (dataUserDto.email) user.email = dataUserDto.email;
    if (dataUserDto.password) user.password = dataUserDto.password;

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

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
