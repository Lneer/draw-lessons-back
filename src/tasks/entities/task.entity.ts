import { Term } from 'src/terms/entities/term.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128 })
  title: string;

  @Column('text')
  description: string;

  @Column('boolean')
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  changed_at: Date;

  @ManyToOne(() => Term, (term) => term.tasks)
  term: Term;
}
