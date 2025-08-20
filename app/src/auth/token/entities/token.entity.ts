import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  token_id: string;

  @Column({ type: 'character varying', length: 128 })
  access_token: string;

  @Column({ type: 'character varying', length: 128 })
  refresh_token: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  changed_at: Date;

  @Column({ type: 'uuid', unique: true })
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
