import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { League } from '../league/league.entity';
import { Bet } from '../bet/bet.entity';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: Date;

    @ManyToOne(() => League, league => league.matches)
    league: League;

    @OneToMany(() => Bet, bet => bet.match)
    bets: Bet[];
}
