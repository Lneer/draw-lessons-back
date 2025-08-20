import { DataSource } from 'typeorm';
import { termRepository } from './constants';
import { Term } from './entities/term.entity';

export const termProviders = [
  {
    provide: termRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Term),
    inject: ['DATA_SOURCE'],
  },
];
