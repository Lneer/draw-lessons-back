import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Progress extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint', unsigned: true, default: 0 })
  homework_count: number;

  @Column({ type: 'smallint', unsigned: true, default: 0 })
  feedback_count: number;

  @Column({ type: 'boolean', default: false })
  is_complete: boolean;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @CreateDateColumn({ type: 'date' })
  changed_at: Date;

  @Column({ type: 'uuid' })
  task_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @OneToOne(() => Task)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => User, (user) => user.progress)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;
}
