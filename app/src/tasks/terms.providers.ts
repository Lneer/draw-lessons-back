import { DataSource } from 'typeorm';
import { taskRepository } from './constants';
import { Task } from './entities/task.entity';

export const taskProviders = [
  {
    provide: taskRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
];
