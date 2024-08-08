import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateLeagueDto {
    @ApiProperty({ description: 'The name of the league', example: 'Champions League' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ description: 'The ID of the region the league belongs to', example: 1 })
    @IsInt()
    @IsNotEmpty()
    readonly regionId: number;
}
