import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { taskRepository } from './constants';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Term } from 'src/terms/entities/term.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject(taskRepository)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { term_id, ...taskData } = createTaskDto;
    
    // Проверяем существование термина
    const term = await this.taskRepository.manager.findOne(Term, {
      where: { id: term_id, is_active: true }
    });
    
    if (!term) {
      throw new BadRequestException(`Term with id ${term_id} not found or inactive`);
    }

    // Проверяем уникальность task_num
    const existingTask = await this.taskRepository.findOne({
      where: { task_num: taskData.task_num }
    });
    
    if (existingTask) {
      throw new BadRequestException(`Task with number ${taskData.task_num} already exists`);
    }

    const task = this.taskRepository.create({
      ...taskData,
      term: { id: term_id } as Term
    });

    return await this.taskRepository.save(task);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, is_active: true },
      relations: ['term']
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // Проверяем существование задачи
    const existingTask = await this.taskRepository.findOne({
      where: { id, is_active: true }
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    // Проверяем существование термина, если он указан
    if (updateTaskDto.term_id) {
      const term = await this.taskRepository.manager.findOne(Term, {
        where: { id: updateTaskDto.term_id, is_active: true }
      });
      
      if (!term) {
        throw new BadRequestException(`Term with id ${updateTaskDto.term_id} not found or inactive`);
      }
    }

    // Проверяем уникальность task_num, если он изменяется
    if (updateTaskDto.task_num && updateTaskDto.task_num !== existingTask.task_num) {
      const taskWithSameNum = await this.taskRepository.findOne({
        where: { task_num: updateTaskDto.task_num }
      });
      
      if (taskWithSameNum) {
        throw new BadRequestException(`Task with number ${updateTaskDto.task_num} already exists`);
      }
    }

    // Подготавливаем данные для обновления
    const updatePayload: Partial<Task> = {};

    // Копируем только определенные поля
    if (updateTaskDto.task_name !== undefined) updatePayload.task_name = updateTaskDto.task_name;
    if (updateTaskDto.task_guide !== undefined) updatePayload.task_guide = updateTaskDto.task_guide;
    if (updateTaskDto.task_additional !== undefined) updatePayload.task_additional = updateTaskDto.task_additional;
    if (updateTaskDto.task_control_number !== undefined) updatePayload.task_control_number = updateTaskDto.task_control_number;
    if (updateTaskDto.is_task_necessarily !== undefined) updatePayload.is_task_necessarily = updateTaskDto.is_task_necessarily;
    if (updateTaskDto.is_active !== undefined) updatePayload.is_active = updateTaskDto.is_active;
    if (updateTaskDto.task_num !== undefined) updatePayload.task_num = updateTaskDto.task_num;

    if (updateTaskDto.term_id) {
      updatePayload.term = { id: updateTaskDto.term_id } as Term;
    }

    await this.taskRepository.update(id, updatePayload);

    return await this.findOne(id);
  }

  async isTaskExist(id: Task['id']): Promise<boolean> {
    const taskCount = await this.taskRepository.count({
      where: {
        id,
        is_active: true,
      },
    });
    return !!taskCount;
  }
}
