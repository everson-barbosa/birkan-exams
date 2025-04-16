import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

interface QuestionAlternativeProps {
  questionId: UniqueEntityID;
  text: string;
  isCorrect: boolean;
}

export class QuestionAlternative extends Entity<QuestionAlternativeProps> {
  static create(props: QuestionAlternativeProps, id?: UniqueEntityID) {
    const questionAlternative = new QuestionAlternative(
      {
        ...props,
      },
      id,
    );

    return questionAlternative;
  }
}
