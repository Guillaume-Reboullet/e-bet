import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { User } from '../../user/user.entity'; 
import { Region } from '../../region/region.entity';
import { League } from '../../league/league.entity';
import { Match } from '../../match/match.entity';
import { Game } from '../../game/game.entity';
import { Bet } from '../../bet/bet.entity';
import * as dotenv from 'dotenv';

dotenv.config();

describe('AuthModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: process.env.HOST,
                    port: parseInt(process.env.DB_PORT, 10),
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                    entities: [User, Region, League, Match, Game, Bet], 
                    synchronize: true,
                }),
                AuthModule,
            ],
        }).compile();
    });

    it('should compile the module', () => {
        expect(module).toBeDefined();
    });
});
