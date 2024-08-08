import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Match } from '../match/match.entity';

@Entity()
export class Bet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    odds: number;

    @ManyToOne(() => User, user => user.bets)
    user: User;

    @ManyToOne(() => Match, match => match.bets)
    match: Match;
}
