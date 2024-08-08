import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { Bet } from './bet.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@ApiTags('bets')
@Controller('bets')
export class BetsController {
    private readonly logger = new Logger(BetsController.name);

    constructor(private readonly betsService: BetsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all bets' })
    @ApiResponse({ status: 200, description: 'Returns an array of bets.', type: [Bet] })
    @ApiResponse({ status: 404, description: 'No bets found.' })
    async findAll(): Promise<Bet[]> {
        try {
            const bets = await this.betsService.findAll();
            if (!bets.length) {
                this.logger.warn('No bets found.');
                throw new NotFoundException('No bets found.');
            }
            return bets;
        } catch (error) {
            this.logger.error('Error retrieving bets', error.stack);
            throw new InternalServerErrorException('Error retrieving bets');
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get bet by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Bet ID' })
    @ApiResponse({ status: 200, description: 'Returns the bet with the specified ID.', type: Bet })
    @ApiResponse({ status: 404, description: 'Bet not found.' })
    @ApiResponse({ status: 400, description: 'Invalid bet ID format.' })
    async findOne(@Param('id') id: number): Promise<Bet> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid bet ID format: ${id}`);
            throw new BadRequestException(`Invalid bet ID format: ${id}`);
        }
        try {
            const bet = await this.betsService.findOne(id);
            if (!bet) {
                this.logger.warn(`Bet with ID ${id} not found.`);
                throw new NotFoundException(`Bet with ID ${id} not found.`);
            }
            return bet;
        } catch (error) {
            this.logger.error(`Error retrieving bet with ID ${id}`, error.stack);
            throw new InternalServerErrorException(`Error retrieving bet with ID ${id}`);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new bet' })
    @ApiBody({ type: CreateBetDto })
    @ApiResponse({ status: 201, description: 'The bet has been successfully created.', type: Bet })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async create(@Body() createBetDto: CreateBetDto): Promise<Bet> {
        try {
            if (createBetDto.amount === undefined) {
                this.logger.warn('Invalid input: amount is required.');
                throw new BadRequestException('Invalid input: amount is required.');
            }
            if (createBetDto.odds === undefined) {
                this.logger.warn('Invalid input: odds are required.');
                throw new BadRequestException('Invalid input: odds are required.');
            }
            if (createBetDto.userId === undefined) {
                this.logger.warn('Invalid input: userId is required.');
                throw new BadRequestException('Invalid input: userId is required.');
            }
            if (createBetDto.matchId === undefined) {
                this.logger.warn('Invalid input: matchId is required.');
                throw new BadRequestException('Invalid input: matchId is required.');
            }
            return await this.betsService.create(createBetDto);
        } catch (error) {
            this.logger.error('Error creating bet', error.stack);
            if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
                throw new BadRequestException('Invalid JSON format.');
            }
            throw new InternalServerErrorException('Error creating bet');
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a bet' })
    @ApiParam({ name: 'id', type: 'number', description: 'Bet ID' })
    @ApiBody({ type: UpdateBetDto })
    @ApiResponse({ status: 200, description: 'The bet has been successfully updated.', type: Bet })
    @ApiResponse({ status: 404, description: 'Bet not found.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async update(@Param('id') id: number, @Body() updateBetDto: UpdateBetDto): Promise<Bet> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid bet ID format: ${id}`);
            throw new BadRequestException(`Invalid bet ID format: ${id}`);
        }
        try {
            const bet = await this.betsService.findOne(id);
            if (!bet) {
                this.logger.warn(`Bet with ID ${id} not found.`);
                throw new NotFoundException(`Bet with ID ${id} not found.`);
            }
            if (updateBetDto.amount === undefined && updateBetDto.odds === undefined && updateBetDto.userId === undefined && updateBetDto.matchId === undefined) {
                this.logger.warn('Invalid input: At least one field must be provided for update.');
                throw new BadRequestException('Invalid input: At least one field must be provided for update.');
            }
            await this.betsService.update(id, updateBetDto);
            return await this.betsService.findOne(id);
        } catch (error) {
            this.logger.error(`Error updating bet with ID ${id}`, error.stack);
            if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
                throw new BadRequestException('Invalid JSON format.');
            }
            throw new InternalServerErrorException(`Error updating bet with ID ${id}`);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a bet' })
    @ApiParam({ name: 'id', type: 'number', description: 'Bet ID' })
    @ApiResponse({ status: 200, description: 'The bet has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Bet not found.' })
    @ApiResponse({ status: 400, description: 'Invalid bet ID format.' })
    async remove(@Param('id') id: number): Promise<void> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid bet ID format: ${id}`);
            throw new BadRequestException(`Invalid bet ID format: ${id}`);
        }
        try {
            const bet = await this.betsService.findOne(id);
            if (!bet) {
                this.logger.warn(`Bet with ID ${id} not found.`);
                throw new NotFoundException(`Bet with ID ${id} not found.`);
            }
            await this.betsService.remove(id);
        } catch (error) {
            this.logger.error(`Error deleting bet with ID ${id}`, error.stack);
            throw new InternalServerErrorException(`Error deleting bet with ID ${id}`);
        }
    }
}
