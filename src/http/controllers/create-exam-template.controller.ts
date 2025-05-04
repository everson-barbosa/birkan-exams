import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';
import { CurrentUser } from 'src/security/auth/current-user.decorator';
import { UserPayload } from 'src/security/auth/jwt.strategy';
import { CreateExamTemplateUseCase } from 'src/use-cases/create-exam-template.use-case';
import { ExamTemplatePresenter } from '../presenters/exam-template.presenter';

const bodySchema = z.object({
  title: z.string(),
  description: z.string(),
  isPublished: z.boolean(),
  questions: z.array(
    z.object({
      questionId: z.string(),
      position: z.number().min(0),
    }),
  ),
});

type BodySchema = z.infer<typeof bodySchema>;

const bodyValidationPipe = new ZodValidationPipe(bodySchema);

@Controller('exam-templates')
export class CreateExamTemplateController {
  constructor(private createExamTemplateUseCase: CreateExamTemplateUseCase) {}

  @HttpCode(201)
  @Post()
  async handle(
    @Body(bodyValidationPipe) body: BodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, description, isPublished, questions } = body;

    const result = await this.createExamTemplateUseCase.execute({
      authorId: user.sub,
      title,
      description,
      isPublished,
      questions,
    });

    if (result.isLeft()) {
      return new BadRequestException();
    }

    return ExamTemplatePresenter.toHttp(result.value.examTemplate);
  }
}
