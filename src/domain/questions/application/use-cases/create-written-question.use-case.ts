import { Either, right } from 'src/core/either';
import { WrittenQuestion } from '../../../exam-templates/enterprise/entities/written-question.entity';
import { WrittenQuestionsRepository } from '../repositories/written-questions.repository';

interface CreateWrittenQuestionUseCaseRequest {
  readonly enunciation: string;
}

type CreateWrittenQuestionUseCaseResponse = Either<
  null,
  {
    writtenQuestion: WrittenQuestion;
  }
>;

export class CreateWrittenQuestionUseCase {
  constructor(private writtenQuestionsRepository: WrittenQuestionsRepository) {}

  async execute({
    enunciation,
  }: CreateWrittenQuestionUseCaseRequest): Promise<CreateWrittenQuestionUseCaseResponse> {
    const writtenQuestion = WrittenQuestion.create({
      enunciation,
    });

    await this.writtenQuestionsRepository.create(writtenQuestion);

    return right({ writtenQuestion });
  }
}
