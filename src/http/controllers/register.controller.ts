import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { RegisterUseCase } from 'src/use-cases/register.use-case';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { UserPresenter } from '../presenters/user.presenter';
import { Public } from 'src/security/auth/public';
import { EmailAlreadyRegisteredError } from 'src/use-cases/errors/email-already-registered.error';

const registerBodySchema = z.object({
  name: z.string().min(8),
  email: z.string().email(),
  password: z.string().min(8),
});

type RegisterBodySchema = z.infer<typeof registerBodySchema>;

@Controller()
@Public()
export class RegisterController {
  constructor(private registerUseCase: RegisterUseCase) {}

  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerBodySchema))
  @Post('/register')
  async handle(@Body() body: RegisterBodySchema) {
    const result = await this.registerUseCase.execute(body);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case EmailAlreadyRegisteredError:
          throw new ConflictException();
        default:
          throw new BadRequestException();
      }
    }

    return UserPresenter.toHttp(result.value.user);
  }
}
