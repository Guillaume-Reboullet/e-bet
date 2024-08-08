import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Unique username of the user', example: 'john_doe' })
  @IsString()
  @IsOptional()
  readonly username?: string;

  @ApiPropertyOptional({ description: 'Email address of the user', example: 'john_doe@example.com' })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiPropertyOptional({ description: 'Password for the user account', example: 'strongPassword123' })
  @IsString()
  @IsOptional()
  readonly password?: string;

  @ApiPropertyOptional({ description: 'Role of the user', enum: ['admin', 'organizer', 'user'], example: 'user' })
  @IsEnum(['admin', 'organizer', 'user'])
  @IsOptional()
  readonly role?: 'admin' | 'organizer' | 'user';
}
