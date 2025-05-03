import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { ResourceNotFoundError } from 'src/core/errors/use-cases/resource-not-found.error';
import { ExamTemplatesRepository } from 'src/database/repositories/exam-templates.repository';
import { ExamTemplate } from 'src/entities/exam-template.entity';

interface GetExamTemplateDetailsUseCaseRequest {
  id: string;
}

type GetExamTemplateDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    examTemplate: ExamTemplate;
  }
>;

@Injectable()
export class GetExamTemplateDetailsUseCase {
  constructor(private examTemplatesRepository: ExamTemplatesRepository) {}

  async execute({
    id,
  }: GetExamTemplateDetailsUseCaseRequest): Promise<GetExamTemplateDetailsUseCaseResponse> {
    const examTemplate = await this.examTemplatesRepository.findById(id);

    if (!examTemplate) return left(new ResourceNotFoundError());

    return right({ examTemplate });
  }
}
