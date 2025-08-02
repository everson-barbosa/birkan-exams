import { Injectable } from '@nestjs/common';
import { Question } from 'src/entities/question.entity';

@Injectable()
export abstract class QuestionsRepository {
  abstract create(question: Question): Promise<void>;
}
