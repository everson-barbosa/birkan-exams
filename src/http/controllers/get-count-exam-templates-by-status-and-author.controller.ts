import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { CurrentUser } from 'src/security/auth/current-user.decorator';
import { UserPayload } from 'src/security/auth/jwt.strategy';
import { GetExamTemplatesCountByStatusAndAuthorUseCase } from 'src/use-cases/get-exam-templates-count-by-status-and-author.use-case';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

const paramSchema = z.object({
  status: z.coerce
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(['SKETCH', 'PUBLISHED', 'CANCELED'])),
});

type ParamSchema = z.infer<typeof paramSchema>;

const paramValidationPipe = new ZodValidationPipe(paramSchema);

@Controller('exam-templates')
export class GetCountExamTemplatesByStatusAndAuthorController {
  constructor(
    private getExamTemplatesCountByStatusAndAuthorUseCase: GetExamTemplatesCountByStatusAndAuthorUseCase,
  ) {}

  @Get('count/:status')
  async handle(
    @Param(paramValidationPipe)
    params: ParamSchema,
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
