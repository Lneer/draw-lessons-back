import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { DatabaseModule } from 'src/database/database.module';
import { progressProviders } from './progress.providers';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [DatabaseModule, TasksModule],
  controllers: [ProgressController],
  providers: [...progressProviders, ProgressService],
})
export class ProgressModule {}
