import { PickType } from '@nestjs/mapped-types';
import { Progress } from '../entities/progress.entity';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateProgressDto extends PickType(Progress, [
  'task_id',
  'user_id',
] as const) {
  @IsNotEmpty({ message: 'task_id cannot be empty' })
  @IsUUID('4')
  task_id: string;

  @IsUUID('4')
  @IsOptional()
  user_id: string;
}
