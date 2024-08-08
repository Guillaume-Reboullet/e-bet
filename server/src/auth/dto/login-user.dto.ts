import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({ description: 'The username of the user' })
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
