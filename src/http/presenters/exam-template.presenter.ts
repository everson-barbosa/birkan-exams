import { ExamTemplate } from 'src/entities/exam-template.entity';
import { ExamTemplateQuestionPresenter } from './exam-template-question.presenter';

export class ExamTemplatePresenter {
  static toHttp(examTemplate: ExamTemplate) {
    return {
      id: examTemplate.id.toString(),
      authorId: examTemplate.authorId.toString(),
      title: examTemplate.title,
      description: examTemplate.description,
      questions: examTemplate.questions
        .getItems()
        .map(ExamTemplateQuestionPresenter.toHttp),
    };
  }
}
