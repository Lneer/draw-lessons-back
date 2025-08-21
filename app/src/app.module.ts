import { Module } from '@nestjs/common';
import { TermsModule } from './terms/terms.module';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { ProgressModule } from './progress/progress.module';
import { TokenModule } from './auth/token/token.module';
import { AuthModule } from './auth/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TermsModule,
    TasksModule,
    UserModule,
    ProgressModule,
    TokenModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
