import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { UserRoles } from './user-roles.entity';
import { CreateUserRoleDto } from './dto/create-userRole.dto';
import { UserRolesController } from './user-roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoles])],
  providers: [UserRolesService],
  controllers: [UserRolesController],
})
export class UserRolesModule {
  constructor(
    @InjectRepository(UserRoles)
    private readonly userRolesRepository: Repository<UserRoles>,
  ) {
    //
  }

  async create(createUserRolesDto: CreateUserRoleDto): Promise<UserRoles> {
    const role = new CreateUserRoleDto(createUserRolesDto);

    return await this.userRolesRepository.save(role);
  }

  async findAll(userId: number | null | undefined): Promise<UserRoles[]> {
    const options: FindManyOptions<UserRoles> = {
      // relations: ['roles'],
    };
    if (userId) options.where = { userId };

    console.log(userId, options);

    return await this.userRolesRepository.find(options);
  }

  async findOne(id: number): Promise<UserRoles> {
    return await this.userRolesRepository.findOne(id, {
      // relations: ['roles'],
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRolesRepository.delete(id);
  }
}
