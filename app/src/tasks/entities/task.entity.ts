import { Term } from 'src/terms/entities/term.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  // JoinColumn,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int8', unique: true, unsigned: true })
  task_num: number;

  @Column({ length: 128 })
  task_name: string;

  @Column('text')
  task_guide: string;

  @Column('text')
  task_additional: string;

  @Column({ type: 'int8', unsigned: true })
  task_control_number: boolean;

  @Column({ type: 'boolean', default: true })
  is_task_necessarily: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @CreateDateColumn({ type: 'date' })
  changed_at: Date;

  @ManyToOne(() => Term, (term) => term.tasks)
  // @JoinColumn({ name: 'term_id', referencedColumnName: 'id' })
  term: Term;
}
