import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bet } from '../bet/bet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'organizer', 'user'], default: 'user' })
  role: string;

  @OneToMany(() => Bet, bet => bet.user)
  bets: Bet[];
}
