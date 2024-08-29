import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { Public } from 'src/auth/decorator/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of users.',
    type: [User],
  })
  @ApiResponse({ status: 404, description: 'No users found.' })
  async findAll(): Promise<User[]> {
    try {
      const users = await this.usersService.findAll();
      if (!users.length) {
        this.logger.warn('No users found.');
        throw new NotFoundException('No users found.');
      }
      return users;
    } catch (error) {
      this.logger.error('Error retrieving users', error.stack);
      throw new InternalServerErrorException('Error retrieving users');
    }
  }

  //REPLACE THIS ROUTE BY A @GET(password/:id)

  // @Get(':id')
  // @ApiOperation({ summary: 'Get user by ID' })
  // @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  // @ApiResponse({ status: 200, description: 'Returns the user with the specified ID.', type: User })
  // @ApiResponse({ status: 404, description: 'User not found.' })
  // @ApiResponse({ status: 400, description: 'Invalid user ID format.' })
  // async findOne(@Param('id') id: number): Promise<User> {
  //   if (isNaN(id)) {
  //     this.logger.warn(`Invalid user ID format: ${id}`);
  //     throw new BadRequestException(`Invalid user ID format: ${id}`);
  //   }
  //   try {
  //     const user = await this.usersService.findOne(id);
  //     if (!user) {
  //       this.logger.warn(`User with ID ${id} not found.`);
  //       throw new NotFoundException(`User with ID ${id} not found.`);
  //     }
  //     return user;
  //   } catch (error) {
  //     this.logger.error(`Error retrieving user with ID ${id}`, error.stack);
  //     throw new InternalServerErrorException(`Error retrieving user with ID ${id}`);
  //   }
  // }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<CreateUserDto, 'password'>> {
    if (isNaN(id)) {
      this.logger.warn(`Invalid user ID format: ${id}`);
      throw new BadRequestException(`Invalid user ID format: ${id}`);
    }
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        this.logger.warn(`User with ID ${id} not found.`);
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
      if (
        updateUserDto.username === undefined &&
        updateUserDto.email === undefined &&
        updateUserDto.password === undefined &&
        updateUserDto.role === undefined
      ) {
        this.logger.warn(
          'Invalid input: At least one field must be provided for update.',
        );
        throw new BadRequestException(
          'Invalid input: At least one field must be provided for update.',
        );
      }
      if (
        updateUserDto.role &&
        !['admin', 'organizer', 'user'].includes(updateUserDto.role)
      ) {
        this.logger.warn(
          `Invalid input: role must be one of 'admin', 'organizer', 'user'. Provided: ${updateUserDto.role}`,
        );
        throw new BadRequestException(
          `Invalid input: role must be one of 'admin', 'organizer', 'user'. Provided: ${updateUserDto.role}`,
        );
      }
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      this.logger.error(`Error updating user with ID ${id}`, error.stack);
      if (
        error instanceof SyntaxError &&
        error.message.includes('Unexpected token')
      ) {
        throw new BadRequestException('Invalid JSON format.');
      }
      throw new InternalServerErrorException(
        `Error updating user with ID ${id}`,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Invalid user ID format.' })
  async remove(@Param('id') id: number): Promise<void> {
    if (isNaN(id)) {
      this.logger.warn(`Invalid user ID format: ${id}`);
      throw new BadRequestException(`Invalid user ID format: ${id}`);
    }
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        this.logger.warn(`User with ID ${id} not found.`);
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
      return await this.usersService.remove(id);
    } catch (error) {
      this.logger.error(`Error deleting user with ID ${id}`, error.stack);
      throw new InternalServerErrorException(
        `Error deleting user with ID ${id}`,
      );
    }
  }
}
