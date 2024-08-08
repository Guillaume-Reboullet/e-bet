import { Controller, Get, Post, Body, Param, Delete, Patch, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './league.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@ApiTags('leagues')
@Controller('leagues')
export class LeaguesController {
    private readonly logger = new Logger(LeaguesController.name);

    constructor(private readonly leaguesService: LeaguesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all leagues' })
    @ApiResponse({ status: 200, description: 'Returns an array of leagues.', type: [League] })
    @ApiResponse({ status: 404, description: 'No leagues found.' })
    async findAll(): Promise<League[]> {
        try {
            const leagues = await this.leaguesService.findAll();
            if (!leagues.length) {
                this.logger.warn('No leagues found.');
                throw new NotFoundException('No leagues found.');
            }
            return leagues;
        } catch (error) {
            this.logger.error('Error retrieving leagues', error.stack);
            throw new InternalServerErrorException('Error retrieving leagues');
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get league by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'League ID' })
    @ApiResponse({ status: 200, description: 'Returns the league with the specified ID.', type: League })
    @ApiResponse({ status: 404, description: 'League not found.' })
    @ApiResponse({ status: 400, description: 'Invalid league ID format.' })
    async findOne(@Param('id') id: number): Promise<League> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid league ID format: ${id}`);
            throw new BadRequestException(`Invalid league ID format: ${id}`);
        }
        try {
            const league = await this.leaguesService.findOne(id);
            if (!league) {
                this.logger.warn(`League with ID ${id} not found.`);
                throw new NotFoundException(`League with ID ${id} not found.`);
            }
            return league;
        } catch (error) {
            this.logger.error(`Error retrieving league with ID ${id}`, error.stack);
            throw new InternalServerErrorException(`Error retrieving league with ID ${id}`);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new league' })
    @ApiBody({ type: CreateLeagueDto })
    @ApiResponse({ status: 201, description: 'The league has been successfully created.', type: League })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async create(@Body() createLeagueDto: CreateLeagueDto): Promise<League> {
        try {
            if (!createLeagueDto.name) {
                this.logger.warn('Invalid input: name is required.');
                throw new BadRequestException('Invalid input: name is required.');
            }
            if (createLeagueDto.regionId === undefined) {
                this.logger.warn('Invalid input: regionId is required.');
                throw new BadRequestException('Invalid input: regionId is required.');
            }
            return await this.leaguesService.create(createLeagueDto);
        } catch (error) {
            this.logger.error('Error creating league', error.stack);
            if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
                throw new BadRequestException('Invalid JSON format.');
            }
            throw new InternalServerErrorException('Error creating league');
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a league' })
    @ApiParam({ name: 'id', type: 'number', description: 'League ID' })
    @ApiBody({ type: UpdateLeagueDto })
    @ApiResponse({ status: 200, description: 'The league has been successfully updated.', type: League })
    @ApiResponse({ status: 404, description: 'League not found.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async update(@Param('id') id: number, @Body() updateLeagueDto: UpdateLeagueDto): Promise<League> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid league ID format: ${id}`);
            throw new BadRequestException(`Invalid league ID format: ${id}`);
        }
        try {
            const league = await this.leaguesService.findOne(id);
            if (!league) {
                this.logger.warn(`League with ID ${id} not found.`);
                throw new NotFoundException(`League with ID ${id} not found.`);
            }
            if (updateLeagueDto.name === undefined && updateLeagueDto.regionId === undefined) {
                this.logger.warn('Invalid input: At least one field must be provided for update.');
                throw new BadRequestException('Invalid input: At least one field must be provided for update.');
            }
            await this.leaguesService.update(id, updateLeagueDto);
            return await this.leaguesService.findOne(id);
        } catch (error) {
            this.logger.error(`Error updating league with ID ${id}`, error.stack);
            if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
                throw new BadRequestException('Invalid JSON format.');
            }
            throw new InternalServerErrorException(`Error updating league with ID ${id}`);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a league' })
    @ApiParam({ name: 'id', type: 'number', description: 'League ID' })
    @ApiResponse({ status: 200, description: 'The league has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'League not found.' })
    @ApiResponse({ status: 400, description: 'Invalid league ID format.' })
    async remove(@Param('id') id: number): Promise<void> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid league ID format: ${id}`);
            throw new BadRequestException(`Invalid league ID format: ${id}`);
        }
        try {
            const league = await this.leaguesService.findOne(id);
            if (!league) {
                this.logger.warn(`League with ID ${id} not found.`);
                throw new NotFoundException(`League with ID ${id} not found.`);
            }
            await this.leaguesService.remove(id);
        } catch (error) {
            this.logger.error(`Error deleting league with ID ${id}`, error.stack);
            throw new InternalServerErrorException(`Error deleting league with ID ${id}`);
        }
    }
}
