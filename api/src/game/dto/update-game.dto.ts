import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateGameDto {
    @ApiPropertyOptional({ description: 'The name of the game' })
    @IsString()
    @IsOptional()
    readonly name?: string;

    @ApiPropertyOptional({ description: 'Your current timestamps' })
    @IsEmail()
    @IsOptional()
    readonly lastUpdate?: string;

    @ApiPropertyOptional({ description: 'The description of the game' })
    @IsString()
    @IsOptional()
    readonly description?: string;
}