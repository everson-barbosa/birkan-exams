import { Injectable } from '@nestjs/common';
import {
  ExamTemplate,
  ExamTemplateStatus,
} from 'src/entities/exam-template.entity';

@Injectable()
export abstract class ExamTemplatesRepository {
  abstract create(examTemplate: ExamTemplate): Promise<void>;
  abstract findById(id: string): Promise<ExamTemplate | null>;
  abstract countByStatusAndAuthorId(
    status: ExamTemplateStatus,
    id: string,
  ): Promise<number>;
}
