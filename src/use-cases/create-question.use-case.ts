import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { QuestionsRepository } from 'src/database/repositories/questions.repository';
import { QuestionAlternative } from 'src/entities/question-alternative.entity';
import { QuestionAlternativeList } from 'src/entities/question-alternative.list';
import { Question } from 'src/entities/question.entity';

interface Alternative {
  text: string;
  isCorrect: boolean;
}

interface CreateQuestionUseCaseRequest {
  authorId: string;
  statement: string;
  alternatives: Alternative[];
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;

@Injectable()
export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    statement,
    alternatives,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      statement,
    });

    const alternativeList = alternatives.map(({ text, isCorrect }) =>
      QuestionAlternative.create({
        text,
        isCorrect,
        questionId: question.id,
      }),
    );

    question.alternatives = new QuestionAlternativeList(alternativeList);

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
