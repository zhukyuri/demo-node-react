import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DatesAt {
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
