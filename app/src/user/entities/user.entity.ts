import { Progress } from 'src/progress/entities/progress.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../constants';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({
    type: 'character varying',
    length: 32,
    default: 'test_user',
    nullable: false,
  })
  user_name: string;

  @Column({
    type: 'character varying',
    length: 32,
    unique: true,
    nullable: false,
  })
  user_email: string;

  @Exclude()
  @Column({
    type: 'character varying',
    length: 32,
    default: 'qwerty1234',
    nullable: false,
  })
  user_password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ADMIN })
  user_role: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  changed_at: Date;

  @OneToMany(() => Progress, (progress) => progress.user)
  progress: Progress[];
}
