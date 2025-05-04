import { Injectable } from '@nestjs/common';
import { ExamTemplatesRepository } from 'src/database/repositories/exam-templates.repository';
import {
  ExamTemplate,
  ExamTemplateStatus,
} from 'src/entities/exam-template.entity';
import { PrismaExamTemplateMapper } from '../mappers/prisma-exam-template.mapper';
import { PrismaService } from '../prisma.service';
import { ExamTemplateCreatedSerializer } from 'src/database/prisma/serializers/exam-template-created.serializer';

@Injectable()
export class PrismaExamTemplatesRepository implements ExamTemplatesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(examTemplate: ExamTemplate): Promise<void> {
    const data = PrismaExamTemplateMapper.toPrisma(examTemplate);

    await this.prismaService.$transaction(async (transaction) => {
      await transaction.examTemplate.create({
        data,
      });

      await transaction.outBoxEvent.create({
        data: {
          event: 'examTemplate.created',
          payload: ExamTemplateCreatedSerializer.serialize(examTemplate),
        },
      });
    });
  }

  async findById(id: string): Promise<ExamTemplate | null> {
    const examTemplate = await this.prismaService.examTemplate.findUnique({
      where: {
        id,
      },
    });

    if (!examTemplate) return null;

    return PrismaExamTemplateMapper.toDomain(examTemplate);
  }

  async countByStatusAndAuthorId(
    status: ExamTemplateStatus,
    authorId: string,
  ): Promise<number> {
    const count = await this.prismaService.examTemplate.count({
      where: {
        status,
        authorId,
      },
    });

    return count;
  }
}
