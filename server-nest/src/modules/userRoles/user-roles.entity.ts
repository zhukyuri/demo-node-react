import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DatesAt } from '../../abstractEntities/datesAt.entity';
import { Roles } from '../roles/roles.entity';
import { Profile } from '../profiles/profile.entity';

@Entity()
export class UserRoles extends DatesAt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile)
  profile: number;

  @OneToOne(() => Roles)
  @JoinColumn()
  roles: number;
}
