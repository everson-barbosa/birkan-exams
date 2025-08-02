import { Injectable } from '@nestjs/common';
import { WrittenQuestion } from '../../../exam-templates/enterprise/entities/written-question.entity';

@Injectable()
export abstract class WrittenQuestionsRepository {
  abstract create(writtenQuestion: WrittenQuestion): Promise<void>;
}
