import { Injectable, ExecutionContext, UnauthorizedException, Logger, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const roleHierarchy = {
    user: 1,
    organizer: 2,
    admin: 3
};

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    private readonly logger = new Logger(LocalAuthGuard.name);
    private readonly requiredRole: string;

    constructor(requiredRole: string) {
        super();
        this.requiredRole = requiredRole;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const result = (await super.canActivate(context)) as boolean;
            const request = context.switchToHttp().getRequest();
            await super.logIn(request);
            return result;
        } catch (err) {
            this.handleActivationError(err);
        }
    }

    handleRequest(err, user, info, context: ExecutionContext) {
        if (err) {
            this.logger.error('Error during authentication', err.stack);
            throw err;
        }

        if (!user) {
            this.logger.warn('Authentication failed: No user found', info);
            throw new UnauthorizedException('Invalid credentials');
        }

        if (this.requiredRole && roleHierarchy[user.role] < roleHierarchy[this.requiredRole]) {
            this.logger.warn(`User ${user.username} does not have the necessary role: ${this.requiredRole}`);
            throw new ForbiddenException(`Forbidden access: Requires at least ${this.requiredRole} role`);
        }

        this.logger.log(`User ${user.username} authenticated successfully with role ${user.role}`);
        return user;
    }

    private handleActivationError(error: any) {
        if (error instanceof UnauthorizedException) {
            this.logger.warn('Unauthorized access attempt', error.stack);
            throw new UnauthorizedException('Unauthorized access');
        } else if (error instanceof ForbiddenException) {
            this.logger.warn('Forbidden access attempt', error.stack);
            throw new ForbiddenException('Forbidden access');
        } else {
            this.logger.error('Unexpected error during authentication', error.stack);
            throw new UnauthorizedException('Unexpected error during authentication');
        }
    }
}
