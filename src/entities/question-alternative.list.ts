import { WatchedList } from 'src/core/entities/watched-list';
import { QuestionAlternative } from './question-alternative.entity';

export class QuestionAlternativeList extends WatchedList<QuestionAlternative> {
  compareItems(a: QuestionAlternative, b: QuestionAlternative): boolean {
    return a.id.equals(b.id);
  }
}
