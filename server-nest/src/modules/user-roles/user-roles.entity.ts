import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DatesAt } from '../abstractEntities/datesAt.entity';
import { Roles } from '../roles/roles.entity';
import { Users } from '../users/users.entity';

@Entity()
export class UserRoles extends DatesAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => Users, (user) => user.userRole)
  user: Users;

  @Column({ nullable: false })
  rolesId: number;

  @OneToOne(() => Roles)
  roles: Roles;
}
