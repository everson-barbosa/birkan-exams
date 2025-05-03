import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { ExamTemplatesRepository } from 'src/database/repositories/exam-templates.repository';
import { ExamTemplateStatus } from 'src/entities/exam-template.entity';

interface GetExamTemplatesCountByStatusAndAuthorUseCaseRequest {
  status: 'SKETCH' | 'PUBLISHED' | 'CANCELED';
  authorId: string;
}

type GetExamTemplatesCountByStatusAndAuthorUseCaseResponse = Either<
  null,
  {
    count: number;
  }
>;

@Injectable()
export class GetExamTemplatesCountByStatusAndAuthorUseCase {
  constructor(private examTemplatesRepository: ExamTemplatesRepository) {}

  async execute({
    status,
    authorId,
  }: GetExamTemplatesCountByStatusAndAuthorUseCaseRequest): Promise<GetExamTemplatesCountByStatusAndAuthorUseCaseResponse> {
    const count = await this.examTemplatesRepository.countByStatusAndAuthorId(
      ExamTemplateStatus[status],
      authorId,
    );

    return right({
      count,
    });
  }
}
