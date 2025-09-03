import { IsString, IsNumber, IsBoolean, IsOptional, IsUUID, Min, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  @Min(1)
  task_num: number;

  @IsString()
  @MaxLength(128)
  task_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  task_guide?: string;

  @IsOptional()
  @IsString({ each: true })
  task_additional?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  task_control_number?: number;

  @IsOptional()
  @IsBoolean()
  is_task_necessarily?: boolean;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsUUID()
  term_id: string;
}
