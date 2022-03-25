import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './users.entity';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ResponseUsersDto } from './dto/response-users.dto';
import { DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
    //
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUsersDto): Promise<Users> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUsersDto,
  ): Promise<Users> {
    return this.userService.update(id, updateUserDto);
  }

  @Get()
  findAll(): Promise<ResponseUsersDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseUsersDto> {
    return this.userService.findOne(id);
  }

  @Get(':id/profile')
  findOneProfile(@Param('id') id: number): Promise<ResponseUsersDto> {
    return this.userService.findOneProfile(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
