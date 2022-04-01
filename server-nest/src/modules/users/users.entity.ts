import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DatesAt } from '../abstractEntities/datesAt.entity';
import { Profile } from '../profile/profile.entity';
import { UserRoles } from '../user-roles/user-roles.entity';

@Entity()
export class Users extends DatesAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActivate: boolean;

  @OneToOne(() => Profile)
  profile: Profile;

  @OneToMany(() => Users, (users) => users.userRole)
  userRole: UserRoles;
}
