import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { ITerm } from '../terms.type';

export class CreateTermDto implements ITerm {
  @Length(3, 16, { message: `Min ${3} Max ${16}` })
  @IsString()
  name: string;

  @IsInt()
  @Min(1, { message: 'order integer min value 1' })
  @Max(64, { message: 'order integer max value 64' })
  order: number;

  @Length(3, 128, { message: `Info Min ${3} Max ${128}` })
  @IsString()
  @IsOptional()
  info?: string;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'term_control_number integer min value 0' })
  @Max(64, { message: 'term_control_number integer max value 64' })
  term_control_number?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
