import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ProfileModule } from '../profile/profile.module';
import { Roles } from '../roles/roles.entity';
import { UserRoles } from '../user-roles/user-roles.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    UsersModule,
    ProfileModule,
    Roles,
    UserRoles,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //
}
