import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

interface ExamTemplateQuestionProps {
  examTemplateId: UniqueEntityID;
  questionId: UniqueEntityID;
  position: number;
}

export class ExamTemplateQuestion extends Entity<ExamTemplateQuestionProps> {
  static create(props: ExamTemplateQuestionProps, id?: UniqueEntityID) {
    const examTemplateQuestion = new ExamTemplateQuestion(props, id);

    return examTemplateQuestion;
  }
}
