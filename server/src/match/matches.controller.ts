import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './match.entity';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
    private readonly logger = new Logger(MatchesController.name);

    constructor(private readonly matchesService: MatchesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all matches' })
    @ApiResponse({ status: 200, description: 'Returns an array of matches.', type: [Match] })
    @ApiResponse({ status: 404, description: 'No matches found.' })
    async findAll(): Promise<Match[]> {
        try {
            const matches = await this.matchesService.findAll();
            if (!matches.length) {
                this.logger.warn('No matches found.');
                throw new NotFoundException('No matches found.');
            }
            return matches;
        } catch (error) {
            this.logger.error('Error retrieving matches', error.stack);
            throw new InternalServerErrorException('Error retrieving matches');
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get match by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Match ID' })
    @ApiResponse({ status: 200, description: 'Returns the match with the specified ID.', type: Match })
    @ApiResponse({ status: 404, description: 'Match not found.' })
    @ApiResponse({ status: 400, description: 'Invalid match ID format.' })
    async findOne(@Param('id') id: number): Promise<Match> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid match ID format: ${id}`);
            throw new BadRequestException(`Invalid match ID format: ${id}`);
        }
        try {
            const match = await this.matchesService.findOne(id);
            if (!match) {
                this.logger.warn(`Match with ID ${id} not found.`);
                throw new NotFoundException(`Match with ID ${id} not found.`);
            }
            return match;
        } catch (error) {
            this.logger.error(`Error retrieving match with ID ${id}`, error.stack);
            throw new InternalServerErrorException(`Error retrieving match with ID ${id}`);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new match' })
    @ApiBody({ type: CreateMatchDto })
    @ApiResponse({ status: 201, description: 'The match has been successfully created.', type: Match })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async create(@Body() createMatchDto: CreateMatchDto): Promise<Match> {
        try {
            if (!createMatchDto.name) {
                this.logger.warn('Invalid input: name is required.');
                throw new BadRequestException('Invalid input: name is required.');
            }
            if (!createMatchDto.date) {
                this.logger.warn('Invalid input: date is required.');
                throw new BadRequestException('Invalid input: date is required.');
            }
            if (createMatchDto.leagueId === undefined) {
                this.logger.warn('Invalid input: leagueId is required.');
                throw new BadRequestException('Invalid input: leagueId is required.');
            }
            return await this.matchesService.create(createMatchDto);
        } catch (error) {
            this.logger.error('Error creating match', error.stack);
            if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
                throw new BadRequestException('Invalid JSON format.');
            }
            throw new InternalServerErrorException('Error creating match');
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a match' })
    @ApiParam({ name: 'id', type: 'number', description: 'Match ID' })
    @ApiBody({ type: UpdateMatchDto })
    @ApiResponse({ status: 200, description: 'The match has been successfully updated.', type: Match })
    @ApiResponse({ status: 404, description: 'Match not found.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async update(@Param('id') id: number, @Body() updateMatchDto: UpdateMatchDto): Promise<Match> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid match ID format: ${id}`);
            throw new BadRequestException(`Invalid match ID format: ${id}`);
        }
        try {
            const match = await this.matchesService.findOne(id);
            if (!match) {
                this.logger.warn(`Match with ID ${id} not found.`);
                throw new NotFoundException(`Match with ID ${id} not found.`);
            }
            if (updateMatchDto.name === undefined && updateMatchDto.date === undefined && updateMatchDto.leagueId === undefined) {
                this.logger.warn('Invalid input: At least one field must be provided for update.');
                throw new BadRequestException('Invalid input: At least one field must be provided for update.');
            }
            await this.matchesService.update(id, updateMatchDto);
            return await this.matchesService.findOne(id);
        } catch (error) {
            this.logger.error(`Error updating match with ID ${id}`, error.stack);
            if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
                throw new BadRequestException('Invalid JSON format.');
            }
            throw new InternalServerErrorException(`Error updating match with ID ${id}`);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a match' })
    @ApiParam({ name: 'id', type: 'number', description: 'Match ID' })
    @ApiResponse({ status: 200, description: 'The match has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Match not found.' })
    @ApiResponse({ status: 400, description: 'Invalid match ID format.' })
    async remove(@Param('id') id: number): Promise<void> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid match ID format: ${id}`);
            throw new BadRequestException(`Invalid match ID format: ${id}`);
        }
        try {
            const match = await this.matchesService.findOne(id);
            if (!match) {
                this.logger.warn(`Match with ID ${id} not found.`);
                throw new NotFoundException(`Match with ID ${id} not found.`);
            }
            await this.matchesService.remove(id);
        } catch (error) {
            this.logger.error(`Error deleting match with ID ${id}`, error.stack);
            throw new InternalServerErrorException(`Error deleting match with ID ${id}`);
        }
    }
}
