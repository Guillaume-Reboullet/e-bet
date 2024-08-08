import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateLeagueDto {
    @ApiPropertyOptional({ description: 'The name of the league', example: 'Champions League' })
    @IsString()
    @IsOptional()
    readonly name?: string;

    @ApiPropertyOptional({ description: 'The ID of the region the league belongs to', example: 1 })
    @IsInt()
    @IsOptional()
    readonly regionId?: number;
}
