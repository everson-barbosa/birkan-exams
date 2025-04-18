import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateQuestionUseCase } from 'src/use-cases/create-question.use-case';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { QuestionPresenter } from '../presenters/question.presenter';
import { CurrentUser } from 'src/security/auth/current-user.decorator';
import { UserPayload } from 'src/security/auth/jwt.strategy';

const createQuestionBodySchema = z.object({
  statement: z.string(),
  alternatives: z.array(
    z.object({
      text: z.string(),
      isCorrect: z.boolean(),
    }),
  ),
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller()
export class CreateQuestionController {
  constructor(private createQuestionUseCase: CreateQuestionUseCase) {}

  @HttpCode(201)
  @Post('/questions/create')
  async handle(
    @Body() body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { statement, alternatives } = body;

    const result = await this.createQuestionUseCase.execute({
      authorId: user.sub,
      statement,
      alternatives,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return QuestionPresenter.toHttp(result.value.question);
  }
}
