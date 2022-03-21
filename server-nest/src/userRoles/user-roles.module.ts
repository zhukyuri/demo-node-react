import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';

@Module({
  providers: [UserRolesService],
  controllers: [UserRolesController],
})
export class UserRolesModule {
  //
}
