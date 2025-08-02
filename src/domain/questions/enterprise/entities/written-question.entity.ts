import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '../../../questions/enterprise/entities/question.entity';

export class WrittenQuestion extends Question {
  static create(props: QuestionProps, id?: UniqueEntityID) {
    const writtenQuestion = new WrittenQuestion(
      {
        ...props,
      },
      id,
    );

    return writtenQuestion;
  }
}
