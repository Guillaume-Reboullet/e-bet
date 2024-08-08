import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
    ) { }

    async findAll(): Promise<Game[]> {
        return await this.gamesRepository.find();
    }

    async findOne(id: number): Promise<Game> {
        return await this.gamesRepository.findOneBy({ id });
    }

    async create(CreateGameDto: CreateGameDto): Promise<Game> {
        const Game = this.gamesRepository.create(CreateGameDto);
        return await this.gamesRepository.save(Game);
    }

    async update(id: number, UpdateGameDto: UpdateGameDto): Promise<Game> {
        await this.gamesRepository.update(id, UpdateGameDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.gamesRepository.delete(id);
    }
}
