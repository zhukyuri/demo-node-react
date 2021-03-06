import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './users.entity';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ResponseUsersDto } from './dto/response-users.dto';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
    //
  }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // create(@Body() createUserDto: CreateUsersDto): Promise<Users> {
  //   return this.userService.create(createUserDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUsersDto,
  ): Promise<Users> {
    return this.userService.update(id, updateUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<ResponseUsersDto[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseUsersDto> {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/profile')
  findOneProfile(@Param('id') id: number): Promise<ResponseUsersDto> {
    return this.userService.findOneProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
