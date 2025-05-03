import { $Enums, ExamTemplate as PrismaExamTemplate } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import {
  ExamTemplate,
  ExamTemplateStatus,
} from 'src/entities/exam-template.entity';

export class PrismaExamTemplateMapper {
  static toPrisma(raw: ExamTemplate): PrismaExamTemplate {
    return {
      id: raw.id.toString(),
      authorId: raw.authorId.toString(),
      title: raw.title,
      description: raw.description,
      status: $Enums.ExamTemplateStatus[raw.status],
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomain(raw: PrismaExamTemplate): ExamTemplate {
    return ExamTemplate.create(
      {
        authorId: new UniqueEntityID(raw.authorId),
        title: raw.title,
        description: raw.description,
        status: ExamTemplateStatus[raw.status],
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }
}
