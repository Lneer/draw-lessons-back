import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Post,
  Body,
  BadRequestException,
  // Patch, Param, Delete
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from 'src/auth/auth/guards/jwt-auth.guard';
import type { JwtAuthRequest } from 'src/auth/auth/constants';
import { CreateProgressDto } from './dto/create-progress.dto';
import { TasksService } from 'src/tasks/tasks.service';
// import { UpdateProgressDto } from './dto/update-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(
    private readonly progressService: ProgressService,
    private readonly taskService: TasksService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createProgressDto: CreateProgressDto,
    @Request() req: JwtAuthRequest,
  ) {
    const { sub } = req.user;
    const { task_id } = createProgressDto;
    const isTaskExist = await this.taskService.isTaskExist(task_id);
    // Add isUserExist
    const isRecordExist = !!(await this.progressService.countBy({
      user_id: sub,
      task_id,
    }));
    if (!isTaskExist) {
      throw new BadRequestException('Task doesnt exist');
    }
    if (isRecordExist) {
      throw new BadRequestException('Task already started');
    }
    return this.progressService.create({ ...createProgressDto, user_id: sub });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findOwn(@Request() req: JwtAuthRequest) {
    const { sub } = req.user;
    return this.progressService.findByUserId(sub);
  }

  // @Get(':id')
  // findOwne(@Param('id') id: string) {
  //   return this.progressService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto) {
  //   return this.progressService.update(+id, updateProgressDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.progressService.remove(+id);
  // }
}
