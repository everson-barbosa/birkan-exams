import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

interface ExamApplicationQuestionProps {
  questionId: UniqueEntityID;
  examApplicationId: UniqueEntityID;
  position: number;
}

export class ExamApplicationQuestion extends Entity<ExamApplicationQuestionProps> {
  static create(props: ExamApplicationQuestionProps, id?: UniqueEntityID) {
    const examApplicationQuestion = new ExamApplicationQuestion(props, id);

    return examApplicationQuestion;
  }
}
