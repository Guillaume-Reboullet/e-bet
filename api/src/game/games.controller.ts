import { Controller, Get, Post, Body, Param, Delete, Patch, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './game.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('games')
@Controller('games')
export class GamesController {
  private readonly logger = new Logger(GamesController.name);

  constructor(private readonly gamesService: GamesService) { }

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, description: 'Returns an array of games.', type: [Game] })
  @ApiResponse({ status: 404, description: 'No games found.' })
  async findAll(): Promise<Game[]> {
    try {
      const games = await this.gamesService.findAll();
      if (!games.length) {
        this.logger.warn('No games found.');
        throw new NotFoundException('No games found.');
      }
      return games;
    } catch (error) {
      this.logger.error('Error retrieving games', error.stack);
      throw new InternalServerErrorException('Error retrieving games');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get game by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Game ID' })
  @ApiResponse({ status: 200, description: 'Returns the game with the specified ID.', type: Game })
  @ApiResponse({ status: 404, description: 'Game not found.' })
  @ApiResponse({ status: 400, description: 'Invalid game ID format.' })
  async findOne(@Param('id') id: number): Promise<Game> {
    if (isNaN(id)) {
      this.logger.warn(`Invalid game ID format: ${id}`);
      throw new BadRequestException(`Invalid game ID format: ${id}`);
    }
    try {
      const game = await this.gamesService.findOne(id);
      if (!game) {
        this.logger.warn(`Game with ID ${id} not found.`);
        throw new NotFoundException(`Game with ID ${id} not found.`);
      }
      return game;
    } catch (error) {
      this.logger.error(`Error retrieving game with ID ${id}`, error.stack);
      throw new InternalServerErrorException(`Error retrieving game with ID ${id}`);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  @ApiBody({ type: CreateGameDto })
  @ApiResponse({ status: 201, description: 'The game has been successfully created.', type: Game })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    try {
      if (!createGameDto.name) {
        this.logger.warn('Invalid input: name is required.');
        throw new BadRequestException('Invalid input: name is required.');
      }
      if (!createGameDto.lastUpdate) {
        this.logger.warn('Invalid input: lastUpdate is required.');
        throw new BadRequestException('Invalid input: lastUpdate is required.');
      }
      if (!createGameDto.description) {
        this.logger.warn('Invalid input: description is required.');
        throw new BadRequestException('Invalid input: description is required.');
      }
      return await this.gamesService.create(createGameDto);
    } catch (error) {
      this.logger.error('Error creating game', error.stack);
      if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
        throw new BadRequestException('Invalid JSON format.');
      }
      throw new InternalServerErrorException('Error creating game');
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a game' })
  @ApiParam({ name: 'id', type: 'number', description: 'Game ID' })
  @ApiBody({ type: UpdateGameDto })
  @ApiResponse({ status: 200, description: 'The game has been successfully updated.', type: Game })
  @ApiResponse({ status: 404, description: 'Game not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async update(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto): Promise<Game> {
    if (isNaN(id)) {
      this.logger.warn(`Invalid game ID format: ${id}`);
      throw new BadRequestException(`Invalid game ID format: ${id}`);
    }
    try {
      const game = await this.gamesService.findOne(id);
      if (!game) {
        this.logger.warn(`Game with ID ${id} not found.`);
        throw new NotFoundException(`Game with ID ${id} not found.`);
      }
      if (updateGameDto.name === undefined && updateGameDto.lastUpdate === undefined && updateGameDto.description === undefined) {
        this.logger.warn('Invalid input: At least one field must be provided for update.');
        throw new BadRequestException('Invalid input: At least one field must be provided for update.');
      }
      await this.gamesService.update(id, updateGameDto);
      return await this.gamesService.findOne(id);
    } catch (error) {
      this.logger.error(`Error updating game with ID ${id}`, error.stack);
      if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
        throw new BadRequestException('Invalid JSON format.');
      }
      throw new InternalServerErrorException(`Error updating game with ID ${id}`);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a game' })
  @ApiParam({ name: 'id', type: 'number', description: 'Game ID' })
  @ApiResponse({ status: 200, description: 'The game has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Game not found.' })
  @ApiResponse({ status: 400, description: 'Invalid game ID format.' })
  async remove(@Param('id') id: number): Promise<void> {
    if (isNaN(id)) {
      this.logger.warn(`Invalid game ID format: ${id}`);
      throw new BadRequestException(`Invalid game ID format: ${id}`);
    }
    try {
      const game = await this.gamesService.findOne(id);
      if (!game) {
        this.logger.warn(`Game with ID ${id} not found.`);
        throw new NotFoundException(`Game with ID ${id} not found.`);
      }
      await this.gamesService.remove(id);
    } catch (error) {
      this.logger.error(`Error deleting game with ID ${id}`, error.stack);
      throw new InternalServerErrorException(`Error deleting game with ID ${id}`);
    }
  }
}