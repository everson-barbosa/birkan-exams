import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ExamApplicationsRepository } from 'src/database/repositories/exam-applications.repository';
import { ExamTemplatesRepository } from 'src/database/repositories/exam-templates.repository';
import { ExamApplicationParticipant } from 'src/entities/exam-application-participant.entity';
import { ExamApplicationParticipantList } from 'src/entities/exam-application-participant.list';
import { ExamApplicationQuestion } from 'src/entities/exam-application-question.entity';
import { ExamApplicationQuestionList } from 'src/entities/exam-application-question.list';
import { ExamApplication } from 'src/entities/exam-application.entity';

interface Participant {
  id: string;
}

interface CreateExamApplicationUseCaseRequest {
  examinerId: string;
  examTemplateId: string;
  startAt: Date;
  endAt: Date;
  participants: Participant[];
}

type CreateExamApplicationUseCaseResponse = Either<
  Error,
  { examApplication: ExamApplication }
>;

@Injectable()
export class CreateExamApplicationUseCase {
  constructor(
    private examTemplatesRepository: ExamTemplatesRepository,
    private examApplicationsRepository: ExamApplicationsRepository,
  ) {}

  async execute({
    examinerId,
    examTemplateId,
    startAt,
    endAt,
    participants,
  }: CreateExamApplicationUseCaseRequest): Promise<CreateExamApplicationUseCaseResponse> {
    const examTemplate =
      await this.examTemplatesRepository.findById(examTemplateId);

    if (!examTemplate) {
      return left(new Error());
    }

    const thereAreNoQuestions = examTemplate.questions.getItems().length === 0;

    if (thereAreNoQuestions) {
      return left(new Error());
    }

    const examApplication = ExamApplication.create({
      examinerId: new UniqueEntityID(examinerId),
      title: examTemplate.title,
      description: examTemplate.description,
      startAt,
      endAt,
    });

    const participantList = participants.map((participant) =>
      ExamApplicationParticipant.create({
        examApplicationId: examApplication.id,
        participantId: new UniqueEntityID(participant.id),
      }),
    );

    examApplication.participants = new ExamApplicationParticipantList(
      participantList,
    );

    const questionList = examTemplate.questions.getItems().map((question) =>
      ExamApplicationQuestion.create({
        examApplicationId: examApplication.id,
        position: question.position,
        questionId: question.questionId,
      }),
    );

    examApplication.questions = new ExamApplicationQuestionList(questionList);

    await this.examApplicationsRepository.create(examApplication);

    return right({ examApplication });
  }
}
