import { Injectable } from '@nestjs/common';
import { ExamTemplatesRepository } from 'src/infra/database/repositories/exam-templates.repository';
import { ExamTemplate } from '../../enterprise/entities/exam-template.aggregate-root';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ExamTemplateQuestion } from '../../enterprise/entities/exam-template-question.entity';
import { ExamTemplateQuestionList } from '../../enterprise/entities/exam-template-question.list';

interface CreateExamTemplateUseCaseRequest {
  readonly authorId: string;
  readonly title: string;
  readonly description: string;
  readonly questions: Array<{
    readonly id: string;
    readonly position: number;
  }>;
}

@Injectable()
export class CreateExamTemplateUseCase {
  constructor(private examTemplatesRepository: ExamTemplatesRepository) {}

  async execute({
    authorId,
    title,
    description,
    questions,
  }: CreateExamTemplateUseCaseRequest) {
    const examTemplate = ExamTemplate.create({
      authorId: new UniqueEntityID(authorId),
      title,
      description,
    });

    const examTemplateQuestions = questions.map((question) =>
      ExamTemplateQuestion.create({
        examTemplateId: examTemplate.id,
        questionId: new UniqueEntityID(question.id),
        position: question.position,
      }),
    );

    examTemplate.questions = new ExamTemplateQuestionList(
      examTemplateQuestions,
    );

    await this.examTemplatesRepository.create(examTemplate);
  }
}
