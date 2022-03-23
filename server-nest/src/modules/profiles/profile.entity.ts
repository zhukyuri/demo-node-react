import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DatesAt } from '../abstractEntities/datesAt.entity';
import { UserRoles } from '../userRoles/user-roles.entity';

export enum SystemRole {
  GHOST = 'ghost',
  ADMIN = 'admin',
  EDITOR = 'editor',
}

@Entity()
export class Profile extends DatesAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  firstName: string;

  @Column('varchar', { length: 100 })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 15,
    enum: SystemRole,
    default: SystemRole.GHOST,
  })
  systemRole: SystemRole;

  @OneToMany(() => UserRoles, (userRoles) => userRoles.id)
  @JoinColumn()
  userRoles: UserRoles[];
}
