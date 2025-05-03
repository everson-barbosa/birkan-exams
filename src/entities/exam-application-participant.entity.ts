import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

interface ExamApplicationParticipantProps {
  participantId: UniqueEntityID;
  examApplicationId: UniqueEntityID;
}

export class ExamApplicationParticipant extends Entity<ExamApplicationParticipantProps> {
  static create(props: ExamApplicationParticipantProps, id?: UniqueEntityID) {
    const examApplicationParticipant = new ExamApplicationParticipant(
      props,
      id,
    );

    return examApplicationParticipant;
  }
}
