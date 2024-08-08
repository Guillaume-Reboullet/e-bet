import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class CreateBetDto {
  @ApiProperty({ description: 'The amount of money placed on the bet', example: 100 })
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({ description: 'The odds associated with the bet', example: 1.5 })
  @IsNumber()
  @IsNotEmpty()
  readonly odds: number;

  @ApiProperty({ description: 'The ID of the user placing the bet', example: 1 })
  @IsInt()
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({ description: 'The ID of the match the bet is placed on', example: 2 })
  @IsInt()
  @IsNotEmpty()
  readonly matchId: number;
}
