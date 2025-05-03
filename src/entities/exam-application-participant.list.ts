import { WatchedList } from 'src/core/entities/watched-list';
import { ExamApplicationParticipant } from './exam-application-participant.entity';

export class ExamApplicationParticipantList extends WatchedList<ExamApplicationParticipant> {
  compareItems(
    a: ExamApplicationParticipant,
    b: ExamApplicationParticipant,
  ): boolean {
    return a.id.equals(b.id);
  }
}
