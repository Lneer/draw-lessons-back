import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { DatabaseModule } from 'src/database/database.module';
import { tokenProviders } from './token.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...tokenProviders, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
