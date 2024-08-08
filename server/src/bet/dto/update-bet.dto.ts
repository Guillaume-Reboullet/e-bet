import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsInt } from 'class-validator';

export class UpdateBetDto {
    @ApiPropertyOptional({ description: 'The amount of money placed on the bet', example: 100 })
    @IsNumber()
    @IsOptional()
    readonly amount?: number;

    @ApiPropertyOptional({ description: 'The odds associated with the bet', example: 1.5 })
    @IsNumber()
    @IsOptional()
    readonly odds?: number;

    @ApiPropertyOptional({ description: 'The ID of the user placing the bet', example: 1 })
    @IsInt()
    @IsOptional()
    readonly userId?: number;

    @ApiPropertyOptional({ description: 'The ID of the match the bet is placed on', example: 2 })
    @IsInt()
    @IsOptional()
    readonly matchId?: number;
}
