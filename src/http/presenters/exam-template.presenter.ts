import { ExamTemplate } from 'src/entities/exam-template.entity';

export class ExamTemplatePresenter {
  static toHttp(examTemplate: ExamTemplate) {
    return {
      id: examTemplate.id.toString(),
      authorId: examTemplate.authorId.toString(),
      title: examTemplate.title,
      description: examTemplate.description,
    };
  }
}
