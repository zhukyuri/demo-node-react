import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {
    //
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Roles> {
    return this.roleService.create(createRoleDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Roles> {
    return this.roleService.update(id, updateRoleDto);
  }

  @Get()
  findAll(): Promise<Roles[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Roles> {
    return this.roleService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.roleService.delete(id);
  }
}
