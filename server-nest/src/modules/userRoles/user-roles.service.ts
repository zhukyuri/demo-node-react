import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserRoles } from './user-roles.entity';
import { CreateUserRoleDto } from './dto/create-userRole.dto';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRoles) private readonly userRolesRepository: Repository<UserRoles>,
  ) {
    //
  }

  async create(createUserRolesDto: CreateUserRoleDto): Promise<UserRoles> {
    const role = new UserRoles();
    role.roles = createUserRolesDto.rolesId;

    return await this.userRolesRepository.save(role);
  }

  async findAll(): Promise<UserRoles[]> {
    return await this.userRolesRepository.find();
  }

  async findOne(id: number): Promise<UserRoles> {
    return await this.userRolesRepository.findOne(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRolesRepository.delete(id);
  }
}
