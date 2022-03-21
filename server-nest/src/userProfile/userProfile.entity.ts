import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DatesAt } from '../abstracts/datesAt.entity';
import { UserRoles } from '../userRoles/user-roles.entity';

export enum SystemRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GHOST = 'ghost',
}

@Entity()
export class UserProfile extends DatesAt {
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
