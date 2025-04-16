import { Question } from 'src/entities/question.entity';

export class QuestionPresenter {
  static toHttp(question: Question) {
    return {
      id: question.id,
      statement: question.statement,
      alternatives: question.alternatives,
    };
  }
}
