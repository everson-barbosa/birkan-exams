import { QuestionsRepository } from 'src/database/repositories/questions.repository';
import { Question } from 'src/entities/question.entity';
import { PrismaService } from '../prisma.service';
import { PrismaQuestionMapper } from '../mappers/prisma-question.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrismaWithAlternatives(question);

    await this.prismaService.question.create({
      data,
    });
  }
}
