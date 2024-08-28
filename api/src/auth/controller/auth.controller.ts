import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CreateUserDto } from '../..//user/dto/create-user.dto';
import { User } from '../../user/user.entity';
import { Public } from '../decorator/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @UseGuards(new LocalAuthGuard('user'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    
    @Post('register')
    register(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.register(createUserDto);
    }
}