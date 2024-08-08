import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from '../service/auth.service';

describe('JwtStrategy', () => {
    let strategy: JwtStrategy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                {
                    provide: AuthService,
                    useValue: {
                        validateUserByUsername: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' }),
                    },
                },
            ],
        }).compile();

        strategy = module.get<JwtStrategy>(JwtStrategy);
    });

    it('should be defined', () => {
        expect(strategy).toBeDefined();
    });

    it('should validate user', async () => {
        const payload = { username: 'testuser' };
        const result = await strategy.validate(payload);
        expect(result).toEqual({ id: 1, username: 'testuser' });
    });

    it('should throw an error if user is not found', async () => {
        jest.spyOn(strategy['authService'], 'validateUserByUsername').mockResolvedValue(null);
        await expect(strategy.validate({ username: 'nonexistentuser' })).rejects.toThrow();
    });
});
