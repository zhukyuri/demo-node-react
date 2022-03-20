import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { UserProfileModule } from './userProfile/userProfile.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, UserProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {
    //
  }
}
