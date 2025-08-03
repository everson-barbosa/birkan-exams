import { UseCaseError } from 'src/core/errors/use-case-error';

export class EmptyQuestionAlternativesError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Empty question alternatives');
  }
}
