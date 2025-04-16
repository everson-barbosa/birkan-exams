import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/types/Optional';
import { ExamTemplateQuestionList } from './exam-template-question.list';

interface ExamTemplateProps {
  authorId: UniqueEntityID;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | null;
  questions: ExamTemplateQuestionList;
}

export class ExamTemplate extends Entity<ExamTemplateProps> {
  get authorId() {
    return this.props.authorId;
  }

  set authorId(authorId: UniqueEntityID) {
    this.props.authorId = authorId;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get questions() {
    return this.props.questions;
  }

  set questions(questions: ExamTemplateQuestionList) {
    this.props.questions = questions;
  }

  static create(
    props: Optional<ExamTemplateProps, 'questions' | 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const examTemplate = new ExamTemplate(
      {
        ...props,
        createdAt: props?.createdAt ?? new Date(),
        updatedAt: props?.updatedAt ?? null,
        questions: props?.questions ?? new ExamTemplateQuestionList([]),
      },
      id,
    );

    return examTemplate;
  }
}
