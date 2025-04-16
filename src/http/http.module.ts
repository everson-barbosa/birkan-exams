import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RegisterController } from './controllers/register.controller';
import { AuthenticateWithEmailController } from './controllers/authenticate-with-email.controller';
import { RegisterUseCase } from 'src/use-cases/register.use-case';
import { AuthenticateWithEmailUseCase } from 'src/use-cases/authenticate-with-email.use-case';
import { SecurityModule } from 'src/security/security.module';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [RegisterController, AuthenticateWithEmailController],
  providers: [RegisterUseCase, AuthenticateWithEmailUseCase],
})
export class HttpModule {}
