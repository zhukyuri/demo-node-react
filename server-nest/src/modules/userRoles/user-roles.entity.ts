import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DatesAt } from '../abstractEntities/datesAt.entity';
import { Roles } from '../roles/roles.entity';
import { User } from '../users/user.entity';

@Entity()
export class UserRoles extends DatesAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.userRole)
  user: User;

  @Column({ nullable: false })
  rolesId: number;

  @OneToOne(() => Roles)
  @JoinColumn()
  roles: Roles;
}
