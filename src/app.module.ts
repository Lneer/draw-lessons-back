import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TermsModule } from './terms/terms.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [DatabaseModule, TermsModule, TasksModule],
})
export class AppModule {}
