import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DatesAt } from '../../abstractEntities/datesAt.entity';
import { Roles } from '../roles/roles.entity';

@Entity()
export class UserRoles extends DatesAt {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Roles)
  @JoinColumn()
  roles: number;
}
