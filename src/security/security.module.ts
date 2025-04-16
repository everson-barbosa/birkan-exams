import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { JwtConfigModule } from './jwt/jwt-config.module';

@Module({
  imports: [AuthModule, CryptographyModule, JwtConfigModule],
  exports: [AuthModule, CryptographyModule],
})
export class SecurityModule {}
