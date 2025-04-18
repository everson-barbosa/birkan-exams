import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

interface QuestionAlternativeProps {
  questionId: UniqueEntityID;
  text: string;
  isCorrect: boolean;
}

export class QuestionAlternative extends Entity<QuestionAlternativeProps> {
  get questionId() {
    return this.props.questionId;
  }

  set questionId(questionId: UniqueEntityID) {
    this.props.questionId = questionId;
  }

  get text() {
    return this.props.text;
  }

  set text(text: string) {
    this.props.text = text;
  }

  get isCorrect() {
    return this.props.isCorrect;
  }

  set isCorrect(isCorrect: boolean) {
    this.props.isCorrect = isCorrect;
  }

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
