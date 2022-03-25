import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// @Unique(['key']) TODO
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, type: 'varchar' })
  name: string;

  @Column({ length: 100, type: 'varchar', unique: true })
  key: string;
}
