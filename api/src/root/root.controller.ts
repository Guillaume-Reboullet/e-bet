import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public.decorator';

@ApiTags('root')
@Controller('/')
export class RootController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Get root message' })
  @ApiResponse({ status: 200, description: 'Returns a welcome message.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  getRoot(): string {
    return 'Welcome to the API!';
  }
}
