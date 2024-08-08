import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { AuthService } from '../service/auth.service';

describe('LocalStrategy', () => {
    let strategy: LocalStrategy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LocalStrategy,
                {
                    provide: AuthService,
                    useValue: {
                        validateUser: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' }),
                    },
                },
            ],
        }).compile();

        strategy = module.get<LocalStrategy>(LocalStrategy);
    });

    it('should be defined', () => {
        expect(strategy).toBeDefined();
    });

    it('should validate user', async () => {
        const result = await strategy.validate('testuser', 'testpassword');
        expect(result).toEqual({ id: 1, username: 'testuser' });
    });

    it('should throw an error if user is not found', async () => {
        jest.spyOn(strategy['authService'], 'validateUser').mockResolvedValue(null);
        await expect(strategy.validate('nonexistentuser', 'wrongpassword')).rejects.toThrow();
    });
});