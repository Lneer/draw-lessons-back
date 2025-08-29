import { DataSource } from 'typeorm';
import { progressRepository } from './constants';
import { Progress } from './entities/progress.entity';

export const progressProviders = [
  {
    provide: progressRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Progress),
    inject: ['DATA_SOURCE'],
  },
];
