import { AggregateRoot } from 'src/core/entities/aggregate-root';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ExamTemplateQuestionList } from './exam-template-question.list';
import { Optional } from 'src/core/types/Optional';

interface ExamTemplateProps {
  authorId: UniqueEntityID;
  title: string;
  description: string;
  questions: ExamTemplateQuestionList;
  createdAt: Date;
  updatedAt: Date | null;
}

export class ExamTemplate extends AggregateRoot<ExamTemplateProps> {
  get questions() {
    return this.props.questions;
  }

  set questions(questions: ExamTemplateQuestionList) {
    this.props.questions = questions;
  }

  static create(
    props: Optional<ExamTemplateProps, 'createdAt' | 'updatedAt' | 'questions'>,
    id?: UniqueEntityID,
  ) {
    const examTemplate = new ExamTemplate(
      {
        ...props,
        questions: props?.questions ?? new ExamTemplateQuestionList([]),
        createdAt: props?.createdAt ?? new Date(),
        updatedAt: props?.updatedAt ?? null,
      },
      id,
    );

    return examTemplate;
  }
}
