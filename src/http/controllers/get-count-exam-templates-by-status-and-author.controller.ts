import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { CurrentUser } from 'src/security/auth/current-user.decorator';
import { UserPayload } from 'src/security/auth/jwt.strategy';
import { GetExamTemplatesCountByStatusAndAuthorUseCase } from 'src/use-cases/get-exam-templates-count-by-status-and-author.use-case';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

const getCountExamTemplatesByStatusAndAuthorParamSchema = z.object({
  status: z.coerce
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(['SKETCH', 'PUBLISHED', 'CANCELED'])),
});

type GetCountExamTemplatesByStatusAndAuthorParamSchema = z.infer<
  typeof getCountExamTemplatesByStatusAndAuthorParamSchema
>;

const paramValidationPipe = new ZodValidationPipe(
  getCountExamTemplatesByStatusAndAuthorParamSchema,
);

@Controller('exam-templates')
export class GetCountExamTemplatesByStatusAndAuthorController {
  constructor(
    private getExamTemplatesCountByStatusAndAuthorUseCase: GetExamTemplatesCountByStatusAndAuthorUseCase,
  ) {}

  @Get('count/:status')
  async handle(
    @Param(paramValidationPipe)
    params: GetCountExamTemplatesByStatusAndAuthorParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { status } = params;

    const result =
      await this.getExamTemplatesCountByStatusAndAuthorUseCase.execute({
        status,
        authorId: user.sub,
      });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const count = result.value.count;

    return { count };
  }
}
