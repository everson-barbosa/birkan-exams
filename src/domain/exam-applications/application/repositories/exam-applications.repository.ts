import {
  PaginationParams,
  PaginationResponse,
} from 'src/core/repositories/Pagination';
import {
  ExamApplication,
  ExamApplicationOrderByFields,
} from '../../enterprise/entities/exam-application.aggregate-root';

export abstract class ExamApplicationsRepository {
  abstract create(examApplication: ExamApplication): Promise<void>;
  abstract findById(id: string): Promise<ExamApplication | null>;
  abstract findManyByInstructorId(
    id: string,
    params: PaginationParams<ExamApplicationOrderByFields>,
  ): Promise<PaginationResponse<ExamApplication>>;
}
