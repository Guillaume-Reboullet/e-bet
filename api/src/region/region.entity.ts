import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { League } from '../league/league.entity';

@Entity()
export class Region {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => League, league => league.region)
    leagues: League[];
}
