import { UseCaseError } from 'src/core/errors/use-case-error';

export class EmptyExamApplicationQuestionsError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('The exam application must have at least one question');
  }
}
