import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';

@Injectable()
export class BetsService {
    constructor(
        @InjectRepository(Bet)
        private readonly betRepository: Repository<Bet>,
    ) { }

    create(createBetDto: CreateBetDto) {
        const bet = this.betRepository.create(createBetDto);
        return this.betRepository.save(bet);
    }

    findAll() {
        return this.betRepository.find();
    }

    findOne(id: number) {
        return this.betRepository.findOne({ where: { id } });
    }

    update(id: number, updateBetDto: UpdateBetDto) {
        return this.betRepository.update(id, updateBetDto);
    }

    remove(id: number) {
        return this.betRepository.delete(id);
    }
}
