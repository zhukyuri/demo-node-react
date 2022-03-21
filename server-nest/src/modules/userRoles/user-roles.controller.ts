import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-userRole.dto';
import { UserRoles } from './user-roles.entity';

@Controller('roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {
    //
  }

  @Post()
  create(@Body() createUserRolesDto: CreateUserRoleDto): Promise<UserRoles> {
    return this.userRolesService.create(createUserRolesDto);
  }

  @Get()
  findAll(): Promise<UserRoles[]> {
    return this.userRolesService.findAll();
  }

  @Get(':id')
  findOne(id): Promise<UserRoles> {
    return this.userRolesService.findOne(id);
  }

  @Delete(':id')
  delete(id): Promise<DeleteResult> {
    return this.userRolesService.delete(id);
  }
}
