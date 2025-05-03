import { Question } from 'src/entities/question.entity';
import { QuestionAlternativePresenter } from './question-alternative.presenter';

export class QuestionPresenter {
  static toHttp(question: Question) {
    return {
      id: question.id.toString(),
      statement: question.statement,
      alternatives: question.alternatives
        .getItems()
        .map(QuestionAlternativePresenter.toHttp),
    };
  }
}
