import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsDateString } from 'class-validator';

export class UpdateMatchDto {
    @ApiPropertyOptional({ description: 'The name of the match', example: 'Final Match' })
    @IsString()
    @IsOptional()
    readonly name?: string;

    @ApiPropertyOptional({ description: 'The date of the match', example: '2024-08-15T18:00:00Z' })
    @IsDateString()
    @IsOptional()
    readonly date?: string;

    @ApiPropertyOptional({ description: 'The ID of the league the match belongs to', example: 1 })
    @IsInt()
    @IsOptional()
    readonly leagueId?: number;
}
