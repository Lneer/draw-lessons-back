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

  @OneToMany(() => Task, (task) => task.term)
  tasks: Task[];
}
