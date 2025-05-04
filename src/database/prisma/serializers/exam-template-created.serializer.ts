import { ExamTemplate } from 'src/entities/exam-template.entity';

export class ExamTemplateCreatedSerializer {
  static serialize(examTemplate: ExamTemplate): string {
    const payload = {
      id: examTemplate.id.toString(),
      authorId: examTemplate.authorId.toString(),
      title: examTemplate.title,
      description: examTemplate.description,
      createdAt: examTemplate.createdAt.toISOString(),
      status: examTemplate.status,
      questions: examTemplate.questions.getItems().map((question) => ({
        id: question.id.toString(),
        questionId: question.questionId.toString(),
        position: question.position,
      })),
    };

    return JSON.stringify(payload);
  }
}
