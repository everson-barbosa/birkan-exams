import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ExamApplication } from '../../enterprise/entities/exam-application.aggregate-root';
import { ExamApplicationQuestion } from '../../enterprise/entities/exam-application-question.entity';
import { ExamApplicationQuestionList } from '../../enterprise/entities/exam-application-question.list';
import { EmptyExamApplicationQuestionsError } from './errors/empty-exam-application-questions.error';
import { Either, right } from 'src/core/either';

interface CreateExamApplicationUseCaseRequest {
  readonly instructorId: string;
  readonly title: string;
  readonly description: string;
  readonly startAt: Date;
  readonly endAt: Date;
  readonly questions: Array<{
    readonly id: string;
    readonly position: number;
    readonly weight: number;
  }>;
  readonly participants: Array<{
    readonly id: string;
  }>;
}

type CreateExamApplicationUseCaseResponse = Either<
  EmptyExamApplicationQuestionsError,
  {
    examApplication: ExamApplication;
  }
>;

export class CreateExamApplicationUseCase {
  async execute({
    instructorId,
    title,
    description,
    startAt,
    endAt,
    questions,
  }: CreateExamApplicationUseCaseRequest): Promise<CreateExamApplicationUseCaseResponse> {
    const isEmptyQuestions = questions.length === 0;

    if (isEmptyQuestions) {
      throw new EmptyExamApplicationQuestionsError();
    }

    const examApplication = ExamApplication.create({
      instructorId: new UniqueEntityID(instructorId),
      title,
      description,
      startAt,
      endAt,
    });

    const examApplicationQuestions = questions.map((question) =>
      ExamApplicationQuestion.create({
        examApplicationId: examApplication.id,
        questionId: new UniqueEntityID(question.id),
        position: question.position,
        weight: question.weight,
      }),
    );

    examApplication.questions = new ExamApplicationQuestionList(
      examApplicationQuestions,
    );

    return right({ examApplication });
  }
}
