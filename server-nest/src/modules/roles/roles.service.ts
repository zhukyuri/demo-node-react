import { Injectable } from '@nestjs/common';
import { Roles } from './roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) private readonly rolesRepository: Repository<Roles>) {
    //
  }

  async create(createRoleDto: CreateRoleDto): Promise<Roles> {
    const role = new Roles();
    role.key = createRoleDto.key;
    role.name = createRoleDto.name;

    return await this.rolesRepository.save(role);
  }

  async findAll(): Promise<Roles[]> {
    return await this.rolesRepository.find();
  }

  async findOne(id: number): Promise<Roles> {
    return await this.rolesRepository.findOne(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.rolesRepository.delete(id);
  }
}
