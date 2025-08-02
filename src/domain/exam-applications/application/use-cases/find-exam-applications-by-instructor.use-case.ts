import { Either, right } from 'src/core/either';
import {
  ExamApplication,
  ExamApplicationOrderByFields,
} from '../../enterprise/entities/exam-application.aggregate-root';
import { ExamApplicationsRepository } from '../repositories/exam-applications.repository';
import { Order, PaginationMetadata } from 'src/core/repositories/Pagination';

interface FindExamApplicationsByInstructorRequest {
  readonly instructorId: string;
  readonly page: number;
  readonly perPage: number;
  readonly order: Order;
  readonly orderBy: ExamApplicationOrderByFields;
}

type FindExamApplicationsByInstructorResponse = Either<
  null,
  {
    examApplications: ExamApplication[];
    metadata: PaginationMetadata;
  }
>;

export class FindExamApplicationsByInstructor {
  constructor(private examApplicationsRepository: ExamApplicationsRepository) {}

  async execute({
    instructorId,
    page,
    perPage,
    order,
    orderBy,
  }: FindExamApplicationsByInstructorRequest): Promise<FindExamApplicationsByInstructorResponse> {
    const { data, metadata } =
      await this.examApplicationsRepository.findManyByInstructorId(
        instructorId,
        {
          page,
          perPage,
          order,
          orderBy,
        },
      );

    return right({
      examApplications: data,
      metadata,
    });
  }
}
