import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Region } from '../region/region.entity';
import { Match } from '../match/match.entity';

@Entity()
export class League {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Region, region => region.leagues)
    region: Region;

    @OneToMany(() => Match, match => match.league)
    matches: Match[];
}
