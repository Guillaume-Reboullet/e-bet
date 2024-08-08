import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateMatchDto {
    @ApiProperty({ description: 'The name of the match', example: 'Final Match' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ description: 'The date of the match', example: '2024-08-15T18:00:00Z' })
    @IsDateString()
    @IsNotEmpty()
    readonly date: string;

    @ApiProperty({ description: 'The ID of the league the match belongs to', example: 1 })
    @IsInt()
    @IsNotEmpty()
    readonly leagueId: number;
}
