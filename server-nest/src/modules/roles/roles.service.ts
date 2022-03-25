import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Roles } from './roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {
    //
  }

  async create(createRoleDto: CreateRoleDto): Promise<Roles> {
    const role = new Roles();
    role.key = createRoleDto.key;
    role.name = createRoleDto.name;

    return await this.rolesRepository.save(role);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Roles> {
    const role = new Roles();
    if (updateRoleDto.key) role.key = updateRoleDto.key;
    if (updateRoleDto.name) role.name = updateRoleDto.name;

    await this.rolesRepository.update(id, role);

    return await this.rolesRepository.findOne(id);
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
