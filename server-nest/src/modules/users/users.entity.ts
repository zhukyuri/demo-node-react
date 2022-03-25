import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DatesAt } from '../abstractEntities/datesAt.entity';
import { Profile } from '../profile/profile.entity';

@Entity()
export class Users extends DatesAt {
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
  profile: Profile;

  // @OneToMany(() => Users, (users) => users.userRole)
  // userRole: UserRoles;
}
