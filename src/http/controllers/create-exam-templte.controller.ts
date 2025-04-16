import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';
import { CurrentUser } from 'src/security/auth/current-user.decorator';
import { UserPayload } from 'src/security/auth/jwt.strategy';
import { CreateExamTemplateUseCase } from 'src/use-cases/create-exam-template.use-case';

const createExamTemplateBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  questions: z.array(
    z.object({
      questionId: z.string(),
      position: z.number().min(0),
    }),
  ),
});

type CreateExamTemplateBodySchema = z.infer<
  typeof createExamTemplateBodySchema
>;

@Controller()
export class CreateExamTemplateController {
  constructor(private createExamTemplateUseCase: CreateExamTemplateUseCase) {}

  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createExamTemplateBodySchema))
  @Post()
  async handle(
    @Body() body: CreateExamTemplateBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, description, questions } = body;

    const result = await this.createExamTemplateUseCase.execute({
      authorId: user.sub,
      title,
      description,
      questions,
    });

    if (result.isLeft()) {
      return new BadRequestException();
    }

    return result.value.examTemplate;
  }
}
