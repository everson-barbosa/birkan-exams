import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { AuthenticateWithEmailUseCase } from '../../use-cases/authenticate-with-email.use-case';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { Public } from 'src/security/auth/public';
import { WrongCredentialsError } from 'src/use-cases/errors/wrong-credentails.error';

const authenticateWithEmailBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type AuthenticateWithEmailBodySchema = z.infer<
  typeof authenticateWithEmailBodySchema
>;

@Controller()
@Public()
export class AuthenticateWithEmailController {
  constructor(
    private authenticateWithEmailUseCase: AuthenticateWithEmailUseCase,
  ) {}

  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateWithEmailBodySchema))
  @Post('/authenticate/with-email')
  async handle(@Body() body: AuthenticateWithEmailBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateWithEmailUseCase.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return result.value;
  }
}
