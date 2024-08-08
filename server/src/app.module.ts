import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { GamesModule } from './game/games.module';
import { RootController } from './root/root.controller';
import { User } from './user/user.entity';
import { Game } from './game/game.entity';
import { Region } from './region/region.entity';
import { League } from './league/league.entity';
import { Match } from './match/match.entity';
import { Bet } from './bet/bet.entity';
import * as dotenv from 'dotenv';
import { RegionsModule } from './region/regions.module';
import { LeaguesModule } from './league/leagues.module';
import { MatchesModule } from './match/matches.module';
import { BetsModule } from './bet/bets.module';
import { AuthModule } from './auth/module/auth.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Game, Region, League, Match, Bet],
      synchronize: true,
    }),
    UsersModule,
    GamesModule,
    RegionsModule,
    LeaguesModule,
    MatchesModule,
    BetsModule,
    AuthModule,
  ],
  controllers: [RootController],
})
export class AppModule {}
