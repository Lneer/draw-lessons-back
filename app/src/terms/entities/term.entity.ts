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

  @Column({ length: 128 })
  name: string;

  @Column('text')
  info: string;

  @Column()
  term_control_number: number;

  @Column('boolean')
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  changed_at: Date;

  @OneToMany(() => Task, (task) => task.term)
  tasks: Task[];
}
