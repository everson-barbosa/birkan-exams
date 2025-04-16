import { Either, right } from 'src/core/either';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ExamTemplatesRepository } from 'src/database/repositories/exam-templates.repository';
import { ExamTemplateQuestion } from 'src/entities/exam-template-question.entity';
import { ExamTemplateQuestionList } from 'src/entities/exam-template-question.list';
import { ExamTemplate } from 'src/entities/exam-template.entity';

interface CreateExamTemplateUseCaseRequest {
  authorId: string;
  title: string;
  description: string;
  questions: Array<{ questionId: string; position: number }>;
}

type CreateExamTemplateUseCaseResponse = Either<
  null,
  {
    examTemplate: ExamTemplate;
  }
>;

export class CreateExamTemplateUseCase {
  constructor(private examTemplatesRepository: ExamTemplatesRepository) {}

  async execute({
    authorId,
    title,
    description,
    questions,
  }: CreateExamTemplateUseCaseRequest): Promise<CreateExamTemplateUseCaseResponse> {
    const examTemplate = ExamTemplate.create({
      authorId: new UniqueEntityID(authorId),
      title,
      description,
    });

    const examTemplateQuestionList = questions.map((question) =>
      ExamTemplateQuestion.create({
        examTemplateId: examTemplate.id,
        questionId: new UniqueEntityID(question.questionId),
        position: question.position,
      }),
    );

    examTemplate.questions = new ExamTemplateQuestionList(
      examTemplateQuestionList,
    );

    await this.examTemplatesRepository.create(examTemplate);

    return right({ examTemplate });
  }
}
