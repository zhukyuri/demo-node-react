import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { Connection } from 'typeorm';
import { ProfileModule } from '../profiles/profile.module';
import { UserRolesModule } from '../userRoles/user-roles.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, ProfileModule, UserRolesModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {
    //
  }
}
