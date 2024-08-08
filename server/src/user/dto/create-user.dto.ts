import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Unique username of the user', example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john_doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Password for the user account', example: 'strongPassword123' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: 'Role of the user', enum: ['admin', 'organizer', 'user'], example: 'user' })
  @IsEnum(['admin', 'organizer', 'user'])
  @IsOptional()
  readonly role: 'admin' | 'organizer' | 'user';
}
