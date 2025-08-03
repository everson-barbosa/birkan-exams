import { Either, left, right } from 'src/core/either';
import { EmptyQuestionEnunciationError } from './errors/empty-question-enunciation.error';
import { EmptyQuestionAlternativesError } from './errors/empty-question-alternatives.error';
import { Question } from '../../enterprise/entities/question.entity';
import { CreateMultipleChoiceQuestionUseCase } from './create-multiple-choice-question.use-case';
import { CreateWrittenQuestionUseCase } from './create-written-question.use-case';
import { MultipleChoiceQuestion } from '../../enterprise/entities/multiple-choice-question.entity';
import { WrittenQuestion } from '../../enterprise/entities/written-question.entity';

export type QuestionKind = 'written' | 'multiple-choice';

const QUESTION_KIND_MAPPER: Record<
  QuestionKind,
  'writtenQuestion' | 'multipleChoiceQuestion'
> = {
  written: 'writtenQuestion',
  'multiple-choice': 'multipleChoiceQuestion',
};

interface MultipleChoiceQuestionResult {
  readonly multipleChoiceQuestion: MultipleChoiceQuestion;
}

interface WrittenQuestionResult {
  readonly writtenQuestion: WrittenQuestion;
}

export interface CreateQuestionUseCaseRequest {
  readonly kind: QuestionKind;
  readonly enunciation: string;
  readonly alternatives: Array<{
    readonly text: string;
    readonly isCorrect: boolean;
  }>;
}

type CreateQuestionUseCaseResponse = Either<
  EmptyQuestionEnunciationError | EmptyQuestionAlternativesError | null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(
    private writtenQuestionUseCase: CreateWrittenQuestionUseCase,
    private multipleChoiceQuestionUseCase: CreateMultipleChoiceQuestionUseCase,
  ) {}

  async execute({
    kind,
    enunciation,
    alternatives,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const isEmptyEnunciation = enunciation.trim().length === 0;

    if (isEmptyEnunciation) {
      return left(new EmptyQuestionEnunciationError());
    }

    const createQuestionStrategy = this.getCreateQuestionStrategy({
      kind,
      enunciation,
      alternatives,
    });

    const result = await createQuestionStrategy();

    if (result.isLeft()) {
      return left(result.value);
    }

    const question = this.extractQuestionFromResult(kind, result.value);

    return right({ question });
  }

  private getCreateQuestionStrategy({
    alternatives,
    enunciation,
    kind,
  }: CreateQuestionUseCaseRequest) {
    switch (kind) {
      case 'written':
        return () => this.writtenQuestionUseCase.execute({ enunciation });
      case 'multiple-choice':
        return () =>
          this.multipleChoiceQuestionUseCase.execute({
            alternatives,
            enunciation,
          });
    }
  }

  private extractQuestionFromResult(
    kind: QuestionKind,
    result: MultipleChoiceQuestionResult | WrittenQuestionResult,
  ) {
    const questionResultKind = QUESTION_KIND_MAPPER[kind];

    const question = result[questionResultKind];

    return question;
  }
}
