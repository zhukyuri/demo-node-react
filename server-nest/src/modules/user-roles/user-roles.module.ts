import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';

@Module({
  providers: [UserRolesService],
})
export class UserRolesModule {
}
