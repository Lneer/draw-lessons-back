import { Progress } from 'src/progress/entities/progress.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'character', length: 64 })
  user_name: string;

  @Column({ type: 'character', length: 64 })
  user_email: string;

  @Column({ type: 'character', length: 128 })
  user_password: string;

  @Column({ type: 'character', length: 32 })
  user_role: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @CreateDateColumn({ type: 'date' })
  changed_at: Date;

  @OneToMany(() => Progress, (progress) => progress.user)
  progress: Progress[];
}
