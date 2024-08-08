import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from './league.entity';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';

@Injectable()
export class LeaguesService {
    constructor(
        @InjectRepository(League)
        private readonly leagueRepository: Repository<League>,
    ) { }

    create(createLeagueDto: CreateLeagueDto) {
        const league = this.leagueRepository.create(createLeagueDto);
        return this.leagueRepository.save(league);
    }

    findAll() {
        return this.leagueRepository.find();
    }

    findOne(id: number) {
        return this.leagueRepository.findOne({ where: { id } });
    }

    update(id: number, updateLeagueDto: UpdateLeagueDto) {
        return this.leagueRepository.update(id, updateLeagueDto);
    }

    remove(id: number) {
        return this.leagueRepository.delete(id);
    }
}
