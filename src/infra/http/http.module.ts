import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../security/auth/auth.module';
import { CryptographyModule } from '../security/cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, AuthModule, CryptographyModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
