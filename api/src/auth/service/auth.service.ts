import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../user/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<Omit<CreateUserDto, 'password'>> {
        const user = await this.usersService.findOneByUsername(username);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatches = await bcrypt.compare(pass, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password, ...result } = user;
        return result as Omit<CreateUserDto, 'password'>;
    }

    async validateUserByUsername(username: string): Promise<Omit<CreateUserDto, 'password'>> {
        const user = await this.usersService.findOneByUsername(username);
        if (user) {
            const { password, ...result } = user;
            return result as Omit<CreateUserDto, 'password'>;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.usersService.create(createUserDto);

        return user;
    }
}
