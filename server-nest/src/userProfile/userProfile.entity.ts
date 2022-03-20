import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DatesAt } from '../abstracts/datesAt.entity';

export enum UserRole {
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
    enum: UserRole,
    default: UserRole.GHOST,
  })
  roles: UserRole;
}
