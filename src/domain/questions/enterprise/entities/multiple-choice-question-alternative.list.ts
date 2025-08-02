import { WatchedList } from 'src/core/entities/watched-list';
import { MultipleChoiceQuestionAlternative } from './multiple-choice-question-alternative.entity';

export class MultipleChoiceQuestionAlternativeList extends WatchedList<MultipleChoiceQuestionAlternative> {
  compareItems(
    a: MultipleChoiceQuestionAlternative,
    b: MultipleChoiceQuestionAlternative,
  ): boolean {
    return a.id.equals(b.id);
  }
}
