import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './bet.entity';
import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Bet])],
    providers: [BetsService],
    controllers: [BetsController],
})
export class BetsModule { }
