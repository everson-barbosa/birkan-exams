import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ExamApplicationParticipantList } from './exam-application-participant.list';
import { ExamApplicationQuestionList } from './exam-application-question.list';
import { Optional } from 'src/core/types/Optional';

interface ExamApplicationProps {
  examinerId: UniqueEntityID;
  title: string;
  description: string;
  participants: ExamApplicationParticipantList;
  questions: ExamApplicationQuestionList;
  startAt: Date;
  endAt: Date;
  canceledAt: Date | null;
}

export class ExamApplication extends Entity<ExamApplicationProps> {
  get participants() {
    return this.props.participants;
  }

  set participants(participants: ExamApplicationParticipantList) {
    this.props.participants = participants;
  }

  get questions() {
    return this.props.questions;
  }

  set questions(questions: ExamApplicationQuestionList) {
    this.props.questions = questions;
  }

  static create(
    props: Optional<
      ExamApplicationProps,
      'participants' | 'questions' | 'canceledAt'
    >,
    id?: UniqueEntityID,
  ) {
    const examApplication = new ExamApplication(
      {
        ...props,
        participants:
          props?.participants ?? new ExamApplicationParticipantList([]),
        questions: props?.questions ?? new ExamApplicationQuestionList([]),
        canceledAt: props?.canceledAt ?? null,
      },
      id,
    );

    return examApplication;
  }
}
