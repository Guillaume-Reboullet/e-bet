import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './league.entity';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';

@Module({
  imports: [TypeOrmModule.forFeature([League])],
  providers: [LeaguesService],
  controllers: [LeaguesController],
})
export class LeaguesModule { }
