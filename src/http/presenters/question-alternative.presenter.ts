import { QuestionAlternative } from 'src/entities/question-alternative.entity';

export class QuestionAlternativePresenter {
  static toHttp(raw: QuestionAlternative) {
    return {
      id: raw.id.toString(),
      text: raw.text,
      isCorrect: raw.isCorrect,
    };
  }
}
