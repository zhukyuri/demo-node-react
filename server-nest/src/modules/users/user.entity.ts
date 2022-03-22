import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DatesAt } from '../../abstractEntities/datesAt.entity';
import { Profile } from '../profiles/profile.entity';

@Entity()
export class User extends DatesAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActivate: boolean;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
