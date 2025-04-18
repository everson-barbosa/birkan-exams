import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { PrismaService } from './prisma/prisma.service';
import { QuestionsRepository } from './repositories/questions.repository';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions.repository';

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
  ],
  exports: [UsersRepository, QuestionsRepository],
})
export class DatabaseModule {}
