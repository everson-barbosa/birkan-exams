import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

interface ExamApplicationQuestionProps {
  readonly examApplicationId: UniqueEntityID;
  readonly questionId: UniqueEntityID;
  readonly position: number;
  readonly weight: number;
}

export class ExamApplicationQuestion extends Entity<ExamApplicationQuestionProps> {
  static create(props: ExamApplicationQuestionProps, id?: UniqueEntityID) {
    const examApplicationQuestion = new ExamApplicationQuestion(
      {
        ...props,
      },
      id,
    );

    return examApplicationQuestion;
  }
}
