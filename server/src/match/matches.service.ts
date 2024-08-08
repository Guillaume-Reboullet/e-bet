import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchesService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
    ) { }

    create(createMatchDto: CreateMatchDto) {
        const match = this.matchRepository.create(createMatchDto);
        return this.matchRepository.save(match);
    }

    findAll() {
        return this.matchRepository.find();
    }

    findOne(id: number) {
        return this.matchRepository.findOne({ where: { id } });
    }

    update(id: number, updateMatchDto: UpdateMatchDto) {
        return this.matchRepository.update(id, updateMatchDto);
    }

    remove(id: number) {
        return this.matchRepository.delete(id);
    }
}
