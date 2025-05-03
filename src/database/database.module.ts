import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { PrismaService } from './prisma/prisma.service';
import { QuestionsRepository } from './repositories/questions.repository';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions.repository';
import { ExamTemplatesRepository } from './repositories/exam-templates.repository';
import { PrismaExamTemplatesRepository } from './prisma/repositories/prisma-exam-templates.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: ExamTemplatesRepository,
      useClass: PrismaExamTemplatesRepository,
    },
  ],
  exports: [UsersRepository, QuestionsRepository, ExamTemplatesRepository],
})
export class DatabaseModule {}
