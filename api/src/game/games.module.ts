import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game } from './game.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    controllers: [GamesController],
    providers: [GamesService],
})
export class GamesModule {}