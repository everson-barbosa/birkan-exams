import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

interface MultipleChoiceQuestionAlternativeProps {
  text: string;
  isCorrect: boolean;
  questionId: UniqueEntityID;
}

export class MultipleChoiceQuestionAlternative extends Entity<MultipleChoiceQuestionAlternativeProps> {
  static create(
    props: MultipleChoiceQuestionAlternativeProps,
    id?: UniqueEntityID,
  ) {
    const multipleChoiceQuestionAlternative =
      new MultipleChoiceQuestionAlternative(
        {
          ...props,
        },
        id,
      );

    return multipleChoiceQuestionAlternative;
  }
}
