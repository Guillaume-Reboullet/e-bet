import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRegionDto {
    @ApiProperty({ description: 'The name of the region', example: 'Europe' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}
