import { Module } from '@nestjs/common';
import { TermsModule } from './terms/terms.module';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { ProgressModule } from './progress/progress.module';
import { TokenModule } from './auth/token/token.module';
import { AuthModule } from './auth/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'template1',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TermsModule,
    TasksModule,
    UserModule,
    ProgressModule,
    TokenModule,
    AuthModule,
  ],
})
export class AppModule {}
