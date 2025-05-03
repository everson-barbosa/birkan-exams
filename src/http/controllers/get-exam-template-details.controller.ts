import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { GetExamTemplateDetailsUseCase } from 'src/use-cases/get-exam-template-details.use-case';
import { ExamTemplatePresenter } from '../presenters/exam-template.presenter';

@Controller('exam-templates')
export class GetExamTemplateDetailsController {
  constructor(
    private getExamTemplateDetailsUseCase: GetExamTemplateDetailsUseCase,
  ) {}

  @Get('details/:id')
  async handle(@Param('id') id: string) {
    const result = await this.getExamTemplateDetailsUseCase.execute({ id });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return ExamTemplatePresenter.toHttp(result.value.examTemplate);
  }
}
