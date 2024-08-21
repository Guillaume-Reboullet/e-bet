import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { Game } from '../../game/game.entity';
import { Region } from '../../region/region.entity';
import { League } from '../../league/league.entity';
import { Match } from '../../match/match.entity';
import { Bet } from '../../bet/bet.entity';
import * as dotenv from 'dotenv'

dotenv.config();
describe('AuthService', () => {
    let service: AuthService;
    let usersService: Partial<UsersService>;

    beforeEach(async () => {
        usersService = {
            findOneByUsername: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
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
                TypeOrmModule.forFeature([User]),
            ],
            providers: [
                AuthService,
                { provide: UsersService, useValue: usersService },
                JwtService,
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
