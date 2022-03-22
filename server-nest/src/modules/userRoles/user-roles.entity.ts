import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DatesAt } from '../../abstractEntities/datesAt.entity';
import { Roles } from '../roles/roles.entity';
import { UserProfile } from '../userProfile/userProfile.entity';

@Entity()
export class UserRoles extends DatesAt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserProfile)
  profile: number;

  @OneToOne(() => Roles)
  @JoinColumn()
  roles: number;
}
