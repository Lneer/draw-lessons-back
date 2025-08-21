import { Task } from 'src/tasks/entities/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Term extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unsigned: true, type: 'int8', unique: true })
  order: number;

  @Column({ type: 'character varying', length: 16, nullable: false })
  name: string;

  @Column({ type: 'character varying', length: 128, default: '' })
  info: string;

  @Column({ unsigned: true, type: 'int8', default: 0 })
  term_control_number: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  changed_at: Date;

  @OneToMany(() => Task, (task) => task.term)
  tasks: Task[];
}
