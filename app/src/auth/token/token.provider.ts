import { DataSource } from 'typeorm';
import { tokenRepository } from './constants';
import { Token } from './entities/token.entity';

export const tokenProviders = [
  {
    provide: tokenRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Token),
    inject: ['DATA_SOURCE'],
  },
];
