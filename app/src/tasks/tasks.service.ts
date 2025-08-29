import { Inject, Injectable } from '@nestjs/common';
import { taskRepository } from './constants';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject(taskRepository)
    private taskRepository: Repository<Task>,
  ) {}

  // create(createTaskDto: CreateTaskDto) {
  //   return 'This action adds a new task';
  // }
  // findAll() {
  //   return `This action returns all tasks`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} task`;
  // }
  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} task`;
  // }
  async isTaskExist(id: Task['id']) {
    const taskCount = await this.taskRepository.count({
      where: {
        id,
        is_active: true,
      },
    });
    return !!taskCount;
  }
}
