import { Injectable } from '@nestjs/common';
import { ExamApplication } from 'src/entities/exam-application.entity';

@Injectable()
export abstract class ExamApplicationsRepository {
  abstract create(examApplication: ExamApplication): Promise<void>;
  abstract findById(id: string): Promise<ExamApplication | null>;
}
