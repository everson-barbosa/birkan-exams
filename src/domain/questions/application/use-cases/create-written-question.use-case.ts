import { WrittenQuestion } from '../../../exam-templates/enterprise/entities/written-question.entity';
import { WrittenQuestionsRepository } from '../repositories/written-questions.repository';

interface CreateWrittenQuestionUseCaseRequest {
  readonly enunciation: string;
}

export class CreateWrittenQuestionUseCase {
  constructor(private writtenQuestionsRepository: WrittenQuestionsRepository) {}

  async execute({ enunciation }: CreateWrittenQuestionUseCaseRequest) {
    const writtenQuestion = WrittenQuestion.create({
      enunciation,
    });

    await this.writtenQuestionsRepository.create(writtenQuestion);
  }
}
