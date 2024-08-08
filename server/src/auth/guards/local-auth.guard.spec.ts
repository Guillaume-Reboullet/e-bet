import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthGuard } from './local-auth.guard';

describe('LocalAuthGuard', () => {
    let guard: LocalAuthGuard;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LocalAuthGuard],
        }).compile();

        guard = module.get<LocalAuthGuard>(LocalAuthGuard);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });

    it('should throw UnauthorizedException if no user', () => {
        const mockContext = createMockExecutionContext(null);

        expect(() => guard.handleRequest(null, null, null, mockContext))
            .toThrow(UnauthorizedException);
    });

    it('should return user if exists', () => {
        const user = { id: 1, username: 'testuser' };
        const mockContext = createMockExecutionContext(user);

        expect(guard.handleRequest(null, user, null, mockContext))
            .toEqual(user);
    });

    function createMockExecutionContext(user: any): ExecutionContext {
        return {
            switchToHttp: () => ({
                getRequest: () => ({
                    user,
                }),
            }),
        } as ExecutionContext;
    }
});
