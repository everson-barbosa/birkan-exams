import { MultipleChoiceQuestionAlternative } from '../../enterprise/entities/multiple-choice-question-alternative.entity';
import { MultipleChoiceQuestionAlternativeList } from '../../../exam-templates/enterprise/entities/multiple-choice-question-alternative.list';
import { MultipleChoiceQuestion } from '../../../exam-templates/enterprise/entities/multiple-choice-question.entity';
import { MultipleChoiceQuestionsRepository } from '../repositories/multiple-choice-questions.repository';
import { Either, left, right } from 'src/core/either';
import { EmptyQuestionAlternativesError } from './errors/empty-question-alternatives.error';

interface CreateMultipleChoiceQuestionUseCaseRequest {
  readonly enunciation: string;
  readonly alternatives: Array<{
    readonly text: string;
    readonly isCorrect: boolean;
  }>;
}

type CreateMultipleChoiceQuestionUseCaseResponse = Either<
  EmptyQuestionAlternativesError,
  {
    multipleChoiceQuestion: MultipleChoiceQuestion;
  }
>;

export class CreateMultipleChoiceQuestionUseCase {
  constructor(
    private multipleChoiceQuestionsRepository: MultipleChoiceQuestionsRepository,
  ) {}

  async execute({
    enunciation,
    alternatives,
  }: CreateMultipleChoiceQuestionUseCaseRequest): Promise<CreateMultipleChoiceQuestionUseCaseResponse> {
    const isEmptyAlternatives = alternatives.length === 0;

    if (isEmptyAlternatives) {
      return left(new EmptyQuestionAlternativesError());
    }

    const multipleChoiceQuestion = MultipleChoiceQuestion.create({
      enunciation,
    });

    const multipleChoiceQuestionAlternatives = alternatives.map((alternative) =>
      MultipleChoiceQuestionAlternative.create({
        isCorrect: alternative.isCorrect,
        text: alternative.text,
        questionId: multipleChoiceQuestion.id,
      }),
    );

    multipleChoiceQuestion.alternatives =
      new MultipleChoiceQuestionAlternativeList(
        multipleChoiceQuestionAlternatives,
      );

    await this.multipleChoiceQuestionsRepository.create(multipleChoiceQuestion);

    return right({ multipleChoiceQuestion });
  }
}
