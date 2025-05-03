import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/types/Optional';
import { ExamTemplateQuestionList } from './exam-template-question.list';

export enum ExamTemplateStatus {
  SKETCH = 'SKETCH',
  PUBLISHED = 'PUBLISHED',
  CANCELED = 'CANCELED',
}

interface ExamTemplateProps {
  authorId: UniqueEntityID;
  title: string;
  description: string;
  status: ExamTemplateStatus;
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
    this.touch();

    this.props.title = title;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.touch();

    this.props.description = description;
  }

  get status() {
    return this.props.status;
  }

  set status(status: ExamTemplateStatus) {
    this.touch();

    this.props.status = status;
  }

  get questions() {
    return this.props.questions;
  }

  set questions(questions: ExamTemplateQuestionList) {
    this.props.questions = questions;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<
      ExamTemplateProps,
      'status' | 'questions' | 'createdAt' | 'updatedAt'
    >,
    id?: UniqueEntityID,
  ) {
    const examTemplate = new ExamTemplate(
      {
        ...props,
        status: props?.status ?? ExamTemplateStatus.SKETCH,
        createdAt: props?.createdAt ?? new Date(),
        updatedAt: props?.updatedAt ?? null,
        questions: props?.questions ?? new ExamTemplateQuestionList([]),
      },
      id,
    );

    return examTemplate;
  }
}
