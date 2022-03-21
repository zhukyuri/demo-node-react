import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './roles.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {
    //
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Roles> {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(): Promise<Roles[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(id): Promise<Roles> {
    return this.roleService.findOne(id);
  }

  @Delete(':id')
  delete(id): Promise<DeleteResult> {
    return this.roleService.delete(id);
  }
}
