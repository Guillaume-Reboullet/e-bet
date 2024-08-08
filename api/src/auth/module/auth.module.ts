import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from '../service/auth.service'
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UsersModule } from '../../user/users.module';  
import { AuthController } from '../controller/auth.controller';
import { SessionSerializer } from '../serialization/session.serializer';
import * as dotenv from 'dotenv'

dotenv.config();

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, LocalAuthGuard, SessionSerializer],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
