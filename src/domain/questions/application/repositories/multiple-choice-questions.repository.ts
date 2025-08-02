import { Injectable } from '@nestjs/common';
import { MultipleChoiceQuestion } from '../../../exam-templates/enterprise/entities/multiple-choice-question.entity';

@Injectable()
export abstract class MultipleChoiceQuestionsRepository {
  abstract create(
    multipleChoiceQuestion: MultipleChoiceQuestion,
  ): Promise<void>;
}
