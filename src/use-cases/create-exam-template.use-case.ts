import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ExamTemplatesRepository } from 'src/database/repositories/exam-templates.repository';
import { ExamTemplateQuestion } from 'src/entities/exam-template-question.entity';
import { ExamTemplateQuestionList } from 'src/entities/exam-template-question.list';
import {
  ExamTemplate,
  ExamTemplateStatus,
} from 'src/entities/exam-template.entity';

interface CreateExamTemplateUseCaseRequest {
  authorId: string;
  title: string;
  description: string;
  isPublished: boolean;
  questions: Array<{ questionId: string; position: number }>;
}

type CreateExamTemplateUseCaseResponse = Either<
  null,
  {
    examTemplate: ExamTemplate;
  }
>;

@Injectable()
export class CreateExamTemplateUseCase {
  constructor(private examTemplatesRepository: ExamTemplatesRepository) {}

  async execute({
    authorId,
    title,
    description,
    isPublished,
    questions,
  }: CreateExamTemplateUseCaseRequest): Promise<CreateExamTemplateUseCaseResponse> {
    const status = isPublished
      ? ExamTemplateStatus.PUBLISHED
      : ExamTemplateStatus.SKETCH;

    const examTemplate = ExamTemplate.create({
      authorId: new UniqueEntityID(authorId),
      title,
      description,
      status,
    });

    const questionList = questions.map((question) =>
      ExamTemplateQuestion.create({
        examTemplateId: examTemplate.id,
        questionId: new UniqueEntityID(question.questionId),
        position: question.position,
      }),
    );

    examTemplate.questions = new ExamTemplateQuestionList(questionList);

    await this.examTemplatesRepository.create(examTemplate);

    return right({ examTemplate });
  }
}
