import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

interface ExamTemplateQuestionProps {
  questionId: UniqueEntityID;
  examTemplateId: UniqueEntityID;
  position: number;
}

export class ExamTemplateQuestion extends Entity<ExamTemplateQuestionProps> {
  get questionId() {
    return this.props.questionId;
  }

  set questionId(questionId: UniqueEntityID) {
    this.props.questionId = questionId;
  }

  get examTemplateId() {
    return this.props.examTemplateId;
  }

  set examTemplateId(examTemplateId: UniqueEntityID) {
    this.props.examTemplateId = examTemplateId;
  }

  get position() {
    return this.props.position;
  }

  set position(position: number) {
    this.props.position = position;
  }

  static create(props: ExamTemplateQuestionProps, id?: UniqueEntityID) {
    const examTemplateQuestion = new ExamTemplateQuestion(
      {
        ...props,
      },
      id,
    );

    return examTemplateQuestion;
  }
}
