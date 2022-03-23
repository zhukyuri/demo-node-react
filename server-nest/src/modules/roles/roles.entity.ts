import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['key'])
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, type: 'varchar' })
  name: string;

  @Column({ length: 100, type: 'varchar', unique: true })
  key: string;
}
