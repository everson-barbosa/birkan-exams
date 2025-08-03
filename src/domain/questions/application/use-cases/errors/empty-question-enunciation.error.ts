import { UseCaseError } from 'src/core/errors/use-case-error';

export class EmptyQuestionEnunciationError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Empty Question Enunciation');
  }
}
