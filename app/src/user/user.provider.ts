import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { userRepository } from './constants';

export const userProviders = [
  {
    provide: userRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
