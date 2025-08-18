import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TermsModule } from './terms/terms.module';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { ProgressModule } from './progress/progress.module';
import { TokenModule } from './auth/token/token.module';

@Module({
  imports: [
    DatabaseModule,
    TermsModule,
    TasksModule,
    UserModule,
    ProgressModule,
    TokenModule,
  ],
})
export class AppModule {}
