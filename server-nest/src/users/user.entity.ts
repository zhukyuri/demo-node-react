import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DatesAt } from '../abstracts/datesAt.entity';
import { UserProfile } from '../userProfile/userProfile.entity';

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

  @OneToOne(() => UserProfile)
  @JoinColumn()
  profile: UserProfile;
}
