import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { Bet } from '../bet/bet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bet])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], 
})
export class UsersModule {}
