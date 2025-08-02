import { WatchedList } from 'src/core/entities/watched-list';
import { ExamApplicationQuestion } from './exam-application-question.entity';

export class ExamApplicationQuestionList extends WatchedList<ExamApplicationQuestion> {
  compareItems(
    a: ExamApplicationQuestion,
    b: ExamApplicationQuestion,
  ): boolean {
    return a.id.equals(b.id);
  }
}
