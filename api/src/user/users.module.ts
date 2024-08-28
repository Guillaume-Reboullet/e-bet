import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { Bet } from '../bet/bet.entity';
import { APP_GUARD } from '@nestjs/core';
import { JWTGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bet])],
  providers: [UsersService,  {
    provide: APP_GUARD,
    useClass: JWTGuard,
  }, JwtService],
  controllers: [UsersController],
  exports: [UsersService], 
})
export class UsersModule {}
