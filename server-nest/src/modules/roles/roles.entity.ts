import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DatesAt } from '../../abstractEntities/datesAt.entity';

@Entity()
@Unique(['key'])
export class Roles extends DatesAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, type: 'varchar' })
  name: string;

  @Column({ length: 100, type: 'varchar', unique: true })
  key: string;
}
