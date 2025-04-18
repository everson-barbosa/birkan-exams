import { Question } from 'src/entities/question.entity';
import { Question as PrismaQuestion, Prisma } from '@prisma/client';

type QuestionCreateInputWithAlternatives = Prisma.QuestionCreateInput & {
  alternatives: {
    createMany: {
      data: Prisma.QuestionAlternativeCreateManyQuestionInput[];
    };
  };
};

export class PrismaQuestionMapper {
  static toPrisma(raw: Question): PrismaQuestion {
    return {
      id: raw.id.toString(),
      statement: raw.statement,
      authorId: raw.authorId.toString(),
    };
  }

  static toPrismaWithAlternatives(
    raw: Question,
  ): QuestionCreateInputWithAlternatives {
    return {
      id: raw.id.toString(),
      statement: raw.statement,
      author: {
        connect: {
          id: raw.authorId.toString(),
        },
      },
      alternatives: {
        createMany: {
          data: raw.alternatives.getItems().map((alternative) => ({
            id: alternative.id.toString(),
            text: alternative.text,
            isCorrect: alternative.isCorrect,
          })),
        },
      },
    };
  }
}
