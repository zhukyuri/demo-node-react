import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-userRole.dto';
import { UserRoles } from './user-roles.entity';

@Controller('user-roles')
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
    return this.userRolesService.findAll(null);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<UserRoles[]> {
    return this.userRolesService.findAll(id);
  }

  @Get(':id/one')
  findOne(@Param('id') id: number): Promise<UserRoles> {
    return this.userRolesService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userRolesService.delete(id);
  }
}
