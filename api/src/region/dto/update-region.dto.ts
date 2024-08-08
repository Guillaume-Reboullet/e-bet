import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateRegionDto {
    @ApiPropertyOptional({ description: 'The name of the region', example: 'Europe' })
    @IsString()
    @IsOptional()
    readonly name?: string;
}
