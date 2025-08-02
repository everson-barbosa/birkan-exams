import { AggregateRoot } from 'src/core/entities/aggregate-root';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ExamApplicationQuestionList } from './exam-application-question.list';
import { Optional } from 'src/core/types/Optional';
import { InvalidExamApplicationPeriodError } from './errors/invalid-exam-application-period.error';

interface ExamApplicationProps {
  instructorId: UniqueEntityID;
  title: string;
  description: string;
  questions: ExamApplicationQuestionList;
  createdAt: Date;
  startAt: Date;
  endAt: Date;
}

export type ExamApplicationOrderByFields = keyof Pick<
  ExamApplication,
  'createdAt' | 'startAt' | 'endAt'
>;

export class ExamApplication extends AggregateRoot<ExamApplicationProps> {
  get questions() {
    return this.props.questions;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get startAt() {
    return this.props.startAt;
  }

  get endAt() {
    return this.props.endAt;
  }

  set questions(questions: ExamApplicationQuestionList) {
    this.props.questions = questions;
  }

  static create(
    props: Optional<ExamApplicationProps, 'createdAt' | 'questions'>,
    id?: UniqueEntityID,
  ) {
    if (props.startAt > props.endAt) {
      throw new InvalidExamApplicationPeriodError(props.startAt, props.endAt);
    }

    const examApplication = new ExamApplication(
      {
        ...props,
        createdAt: props?.createdAt ?? new Date(),
        questions: props?.questions ?? new ExamApplicationQuestionList([]),
      },
      id,
    );

    return examApplication;
  }
}
