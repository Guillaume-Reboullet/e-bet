import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './region.entity';

@ApiTags('regions')
@Controller('regions')
export class RegionsController {
    private readonly logger = new Logger(RegionsController.name);

    constructor(private readonly regionsService: RegionsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all regions' })
    @ApiResponse({ status: 200, description: 'Returns an array of regions.', type: [Region] })
    @ApiResponse({ status: 404, description: 'No regions found.' })
    async findAll(): Promise<Region[]> {
        try {
            const regions = await this.regionsService.findAll();
            if (!regions.length) {
                this.logger.warn('No regions found.');
                throw new NotFoundException('No regions found.');
            }
            return regions;
        } catch (error) {
            this.logger.error('Error retrieving regions', error.stack);
            throw new InternalServerErrorException('Error retrieving regions');
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get region by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Region ID' })
    @ApiResponse({ status: 200, description: 'Returns the region with the specified ID.', type: Region })
    @ApiResponse({ status: 404, description: 'Region not found.' })
    @ApiResponse({ status: 400, description: 'Invalid region ID format.' })
    async findOne(@Param('id') id: number): Promise<Region> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid region ID format: ${id}`);
            throw new BadRequestException(`Invalid region ID format: ${id}`);
        }
        try {
            const region = await this.regionsService.findOne(id);
            if (!region) {
                this.logger.warn(`Region with ID ${id} not found.`);
                throw new NotFoundException(`Region with ID ${id} not found.`);
            }
            return region;
        } catch (error) {
            this.logger.error(`Error retrieving region with ID ${id}`, error.stack);
            throw new InternalServerErrorException(`Error retrieving region with ID ${id}`);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new region' })
    @ApiBody({ type: CreateRegionDto })
    @ApiResponse({ status: 201, description: 'The region has been successfully created.', type: Region })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async create(@Body() createRegionDto: CreateRegionDto): Promise<Region> {
        try {
            if (!createRegionDto.name) {
                this.logger.warn('Invalid input: name is required.');
                throw new BadRequestException('Invalid input: name is required.');
            }
            return await this.regionsService.create(createRegionDto);
        } catch (error) {
            this.logger.error('Error creating region', error.stack);
            if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
                throw new BadRequestException('Invalid JSON format.');
            }
            throw new InternalServerErrorException('Error creating region');
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a region' })
    @ApiParam({ name: 'id', type: 'number', description: 'Region ID' })
    @ApiBody({ type: UpdateRegionDto })
    @ApiResponse({ status: 200, description: 'The region has been successfully updated.', type: Region })
    @ApiResponse({ status: 404, description: 'Region not found.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async update(@Param('id') id: number, @Body() updateRegionDto: UpdateRegionDto): Promise<Region> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid region ID format: ${id}`);
            throw new BadRequestException(`Invalid region ID format: ${id}`);
        }
        try {
            const region = await this.regionsService.findOne(id);
            if (!region) {
                this.logger.warn(`Region with ID ${id} not found.`);
                throw new NotFoundException(`Region with ID ${id} not found.`);
            }
            if (updateRegionDto.name === undefined) {
                this.logger.warn('Invalid input: At least one field must be provided for update.');
                throw new BadRequestException('Invalid input: At least one field must be provided for update.');
            }
            await this.regionsService.update(id, updateRegionDto);
            return await this.regionsService.findOne(id);
        } catch (error) {
            this.logger.error(`Error updating region with ID ${id}`, error.stack);
            if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
                throw new BadRequestException('Invalid JSON format.');
            }
            throw new InternalServerErrorException(`Error updating region with ID ${id}`);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a region' })
    @ApiParam({ name: 'id', type: 'number', description: 'Region ID' })
    @ApiResponse({ status: 200, description: 'The region has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Region not found.' })
    @ApiResponse({ status: 400, description: 'Invalid region ID format.' })
    async remove(@Param('id') id: number): Promise<void> {
        if (isNaN(id)) {
            this.logger.warn(`Invalid region ID format: ${id}`);
            throw new BadRequestException(`Invalid region ID format: ${id}`);
        }
        try {
            const region = await this.regionsService.findOne(id);
            if (!region) {
                this.logger.warn(`Region with ID ${id} not found.`);
                throw new NotFoundException(`Region with ID ${id} not found.`);
            }
            await this.regionsService.remove(id);
        } catch (error) {
            this.logger.error(`Error deleting region with ID ${id}`, error.stack);
            throw new InternalServerErrorException(`Error deleting region with ID ${id}`);
        }
    }
}
