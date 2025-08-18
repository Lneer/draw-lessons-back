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

  @Column({ type: 'character', length: 64 })
  access_token: string;

  @Column({ type: 'character', length: 64 })
  refresh_token: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @CreateDateColumn({ type: 'date' })
  changed_at: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
