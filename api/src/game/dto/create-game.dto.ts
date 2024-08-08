import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateGameDto {
    @ApiProperty({ description: 'The name of the game' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ description: 'Your current timestamps' })
    @IsDateString()
    @IsNotEmpty()
    readonly lastUpdate: Date;

    @ApiProperty({ description: 'The description of the game' })
    @IsString()
    @IsNotEmpty()
    readonly description: string;
}
