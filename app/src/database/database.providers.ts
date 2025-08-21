import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configServise: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configServise.get<string>('DB_HOST'),
        port: configServise.get<number>('DB_PORT'),
        username: configServise.get<string>('DB_USERNAME'),
        password: configServise.get<string>('DB_PASSWORD'),
        database: configServise.get<string>('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configServise.get<string>('ENV') === 'DEV',
      });
      return dataSource.initialize();
    },
  },
];
