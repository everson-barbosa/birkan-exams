import { Injectable } from '@nestjs/common';
import { ExamTemplate } from 'src/entities/exam-template.entity';

@Injectable()
export abstract class ExamTemplatesRepository {
  abstract create(examTemplate: ExamTemplate): Promise<void>;
}
